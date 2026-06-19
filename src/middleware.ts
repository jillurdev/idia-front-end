import { NextRequest, NextResponse } from "next/server";

export const runtime = "experimental-edge";

const publicRoutes = [
	"/",
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password",
];

const protectedRoutes: Record<string, string[]> = {
	"/dashboard": ["USER", "ADMIN", "OWNER"],
	"/profile": ["USER", "ADMIN", "OWNER"],
	"/orders": ["USER", "ADMIN", "OWNER"],
	"/admin": ["ADMIN", "OWNER"],
	"/owner": ["OWNER"],
};

function decodeJwtPayload(token: string) {
	try {
		const payload = token.split(".")[1];
		if (!payload) return null;
		return JSON.parse(atob(payload));
	} catch {
		return null;
	}
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("token")?.value;

	// Public routes
	if (
		publicRoutes.some(
			route => pathname === route || pathname.startsWith(route + "/"),
		)
	) {
		if (
			token &&
			["/login", "/register", "/forgot-password", "/reset-password"].some(
				route => pathname.startsWith(route),
			)
		) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}

		return NextResponse.next();
	}

	const matchedProtectedRoute = Object.entries(protectedRoutes).find(
		([route]) => pathname === route || pathname.startsWith(route + "/"),
	);

	if (!matchedProtectedRoute) {
		return NextResponse.next();
	}

	if (!token) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("next", pathname);
		return NextResponse.redirect(loginUrl);
	}

	const payload = decodeJwtPayload(token);

	if (!payload?.role) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("next", pathname);
		return NextResponse.redirect(loginUrl);
	}

	const role = payload.role;
	const [, allowedRoles] = matchedProtectedRoute;

	if (!allowedRoles.includes(role)) {
		return NextResponse.redirect(new URL("/unauthorized", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
