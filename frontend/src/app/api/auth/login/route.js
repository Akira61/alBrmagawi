import excuteQuery, { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import userExists from "../signup/user/route";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    //check if all values sent
    console.log("login post api: ", reqBody);
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        err_message: "the form is not complited",
        status: 500,
      });
    }

    //check if user already exists
    const user = await userExists(email, "email");
    console.log(user);
    if (user.length <= 0) {
      return NextResponse.json({
        success: false,
        err_message: "user not found. please try to signup",
        status: 500,
      });
    }

    // check if password match
    const comparePassword = await bcrypt.compare(password, user[0].password);
    if (!comparePassword) {
      return NextResponse.json({
        success: false,
        err_message: "invalid password",
        status: 500,
      });
    }

    //check if user verified 
    if(!user[0].verified){
        const verificationEmail = await verifyEmail(email,user[0].id,user[0].role)
        return NextResponse.json({
            success: false,
            err_message: "your email is not verified",
            status: 500,
          });
    }

    // set up session
    const tokenData = {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;

    // redirect
    //return NextResponse.json({ success: true, role: user[0].role });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
