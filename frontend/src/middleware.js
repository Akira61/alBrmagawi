import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import {
  getDataFromToken,
  verifyJwtToken,
} from "./app/helpers/getDataFromToken";
import axios from "axios";
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  //   return NextResponse.redirect(new URL('/home', request.url))
  // const token = request.cookies.get("token")?.value || "";
  const token = await request.cookies.get("token")?.value;
  const loggedIn =
    (await token) &&
    (await verifyJwtToken(request).catch((err) => {
      console.log("error from verifyJwtToken: ", err);
    }));
  // if(!token){
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
  // let currentDate = new Date();
  // const tokenExpired = jwt_decode(token).exp * 1000 < currentDate.getTime();
  // console.log("token expired: ",tokenExpired)

  // const response = await fetch(process.env.domain+"/api/tokenData", {method: "GET"});
  // const body = await response.json();
  // const loggedIn = await body.data
  // let loggedIn
  // try {
  //   loggedIn = await jwt.verify(token, process.env.JWT_SECRET);
  // } catch (error) {
  //   loggedIn = false;
  //   console.log("Error: ",error)
  // }
  console.log("loggedin: ", loggedIn);
  const visitWithoutToken =
    path === "/login" || path === "/register" || path === "/verifyemail";
  
  if(path=== "/ctfs"){
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  //don't allow visit these pages
  const forbiddenPages =
    path === "/dashboard/:path*" || path === "/courses/:path*";
  if (forbiddenPages) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (visitWithoutToken && loggedIn) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  // if (visitWithoutToken && !loggedIn) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }

  if (!visitWithoutToken && !loggedIn) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // // don't allow those who're not logged in to visit /ctfs
  // if(path=== "/ctfs" )
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/login",
    // "/register",
    // "/courses/createCourse/:path*",
    // "/ctfs",
    // "/dashboard/:path*",
    // "/courses",
    // "/team/:path*"
  ],
};
