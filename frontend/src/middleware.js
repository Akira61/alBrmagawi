import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  //   return NextResponse.redirect(new URL('/home', request.url))
  const visitWithoutToken =
    path === "/login" || path === "/register" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";
  if (visitWithoutToken && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!visitWithoutToken && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/verifyemail"],
};
