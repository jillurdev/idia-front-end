import { NextRequest, NextResponse } from "next/server";

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

const AUTH_ROUTES = [
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password",
	"/verify-email",
];

const PROTECTED_ROUTES: Record<string, string[]> = {
	"/dashboard": ["USER", "ADMIN"],
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
		if (route === "/") return pathname === "/";
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

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("token")?.value;

	const payload = token ? decodeJwtPayload(token) : null;
	const validPayload = payload && !isTokenExpired(payload) ? payload : null;

	if (isAuthRoute(pathname)) {
		if (validPayload) {
			const homePath = ROLE_HOME[validPayload.role] ?? "/dashboard";
			return NextResponse.redirect(new URL(homePath, request.url));
		}
		return NextResponse.next();
	}

	if (isPublicRoute(pathname)) {
		return NextResponse.next();
	}

	const allowedRoles = matchProtectedRoute(pathname);

	if (!allowedRoles) {
		return NextResponse.next();
	}

	if (!validPayload) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("next", pathname);
		return NextResponse.redirect(loginUrl);
	}

	if (!allowedRoles.includes(validPayload.role)) {
		const homePath = ROLE_HOME[validPayload.role] ?? "/";
		return NextResponse.redirect(new URL(homePath, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
