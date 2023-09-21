import { NextResponse } from "next/server";
import userExists from "../signup/user/route";
import excuteQuery from "@/app/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { token } = body;
    console.log(token);
    const user = await userExists(token, "verifyToken");
    // check if user exits or verify expire is invalid
    if (user.length < 1 || user[0].verifyTokenExpire < Date.now()) {
      return NextResponse.json({
        err_message: "Invalid token",
        success: false,
        stauts: 400,
      });
    }
    // set verified to true
    await excuteQuery({
      query: `UPDATE ${
        user[0].role === "student"
          ? "users"
          : user[0].role === "teacher"
          ? "teacher"
          : "staff"
      } SET verifyToken=?, verifyTokenExpire=?,verified=1 WHERE email=? AND id=?`,
      values: [undefined, undefined, user[0].email, user[0].id],
    });

    return NextResponse.json({
      message: "Email verified successfully✅",
      success: true,
    });
    
  } catch (error) {
    return NextResponse.json({ message: error.message, stauts: 500 });
  }
}
