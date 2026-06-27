import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const PUBLIC_ROUTES = [
	"/",
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password",
	"/verify-email",
	"/products",
	"/categories",
	"/about",
	"/contact",
];

// Login করা থাকলে এই routes এ ঢুকতে দেবে না
const AUTH_ROUTES = [
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password",
	"/verify-email",
];

const PROTECTED_ROUTES: Record<string, string[]> = {
	"/dashboard": ["USER", "ADMIN", ],
	"/saved": ["USER", "ADMIN", "OWNER"],
	"/purchases": ["USER", "ADMIN", "OWNER"],
	"/profile": ["USER", "ADMIN", "OWNER"],
	"/admin": ["ADMIN", "OWNER"],
	"/owner": ["OWNER"],
};

const ROLE_HOME: Record<string, string> = {
	OWNER: "/owner",
	ADMIN: "/admin",
	USER: "/dashboard",
};

interface JwtPayload {
	sub: string;
	email: string;
	role: string;
	exp: number;
}

function decodeJwtPayload(token: string): JwtPayload | null {
	try {
		const payload = token.split(".")[1];
		if (!payload) return null;
		return JSON.parse(atob(payload)) as JwtPayload;
	} catch {
		return null;
	}
}

function isTokenExpired(payload: JwtPayload): boolean {
	return Date.now() >= payload.exp * 1000;
}

function isPublicRoute(pathname: string): boolean {
	return PUBLIC_ROUTES.some(route => {
		if (route === "/") return pathname === "/"; // exact match শুধু
		return pathname === route || pathname.startsWith(route + "/");
	});
}

function isAuthRoute(pathname: string): boolean {
	return AUTH_ROUTES.some(
		route => pathname === route || pathname.startsWith(route + "/"),
	);
}

function matchProtectedRoute(pathname: string): string[] | null {
	const match = Object.entries(PROTECTED_ROUTES).find(
		([route]) => pathname === route || pathname.startsWith(route + "/"),
	);
	return match ? match[1] : null;
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("token")?.value;

	const payload = token ? decodeJwtPayload(token) : null;
	// Token আছে কিন্তু expired — invalid হিসেবে treat করো
	const validPayload = payload && !isTokenExpired(payload) ? payload : null;

	// Auth routes এ already logged in থাকলে redirect করো
	if (isAuthRoute(pathname)) {
		if (validPayload) {
			const homePath = ROLE_HOME[validPayload.role] ?? "/dashboard";
			return NextResponse.redirect(new URL(homePath, request.url));
		}
		return NextResponse.next();
	}

	// Public routes — সবাই ঢুকতে পারবে
	if (isPublicRoute(pathname)) {
		return NextResponse.next();
	}

	// Protected routes check
	const allowedRoles = matchProtectedRoute(pathname);

	if (!allowedRoles) {
		// না public না protected — allow করো
		return NextResponse.next();
	}

	// Login নেই
	if (!validPayload) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("next", pathname);
		return NextResponse.redirect(loginUrl);
	}

	// Role check
	if (!allowedRoles.includes(validPayload.role)) {
		// নিজের home এ পাঠাও
		const homePath = ROLE_HOME[validPayload.role] ?? "/";
		return NextResponse.redirect(new URL(homePath, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
