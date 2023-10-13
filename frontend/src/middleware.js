import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
export function middleware(request) {
  const path = request.nextUrl.pathname;
  //   return NextResponse.redirect(new URL('/home', request.url))
  const token = request.cookies.get("token")?.value || "";
  let currentDate = new Date();
  const tokenExpired = jwt_decode(token).exp * 1000 < currentDate.getTime();
  console.log("token expired: ",tokenExpired)
  const visitWithoutToken =
    path === "/login" || path === "/register" || path === "/verifyemail";

  if (visitWithoutToken && !tokenExpired) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!visitWithoutToken && tokenExpired) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/verifyemail","/courses/createCourse/:path*"],
};
