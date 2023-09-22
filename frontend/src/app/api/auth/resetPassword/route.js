import { NextResponse } from "next/server";
import userExists from "../signup/user/route";
import excuteQuery from "@/app/lib/db";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { env } from "process";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log("reset password api:");

    const body = await req.json();
    const { token, password, confirmPassword } = await body;
    console.log(token,body)
    const user = await userExists(token, "forgotPasswordToken");
    console.log(user);

    // check if user exits or reset password expire is invalid
    if (user.length == 0 || user[0].forgotPasswordTokenExpire < Date.now()) {
      return NextResponse.json({
        err_message: "Token expired",
        success: false,
        stauts: 400,
      });
    }
    //check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json({
        err_message: "Passwords doesn't match",
        success: false,
        stauts: 400,
      });
    }
    //hash new password
    const newPassword = await bcrypt.hash(password, 10);

    // set verified to true
    if (user[0].role === "student") {
      const updateUser = await prisma.users.update({
        where: { id: user[0].id },
        data: {
          password: newPassword,
          forgotPasswordToken: "undefined",
          forgotPasswordTokenExpire: "undefined",
        },
      });
    } else if (user[0].role === "teacher") {
      const updateUser = await prisma.teachers.update({
        where: { id: user[0].id },
        data: {
          password: newPassword,
          forgotPasswordToken: "undefined",
          forgotPasswordTokenExpire: "undefined",
        },
      });
    } else {
      const updateUser = await prisma.staff.update({
        where: { id: user[0].id },
        data: {
          password: newPassword,
          forgotPasswordToken: "undefined",
          forgotPasswordTokenExpire: "undefined",
        },
      });
    }

    return NextResponse.json({
      message: "rest password successfully, you can close this page✅",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, stauts: 500 });
  }
}
