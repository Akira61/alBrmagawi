import { NextResponse } from "next/server";
import userExists from "../signup/user/route";
import excuteQuery from "@/app/lib/db";
import { PrismaClient } from "@prisma/client";
import { env } from "process";
const prisma = new PrismaClient();


export async function POST(req) {
  try {
    console.log('verify email post api')
    const body = await req.json();
    const { token } = body;
    console.log(token);
    const user = await userExists(token, "verifyToken");
    console.log(user)
    // check if user exits or verify expire is invalid
    if (user.length ==0 || user[0].verifyTokenExpire < Date.now()) {
      return NextResponse.json({
        err_message: "Invalid token",
        success: false,
        stauts: 400,
      });
    }
    // set verified to true
    if(user[0].role === 'student'){
      const updateUser = await prisma.users.update({
        where: {id: user[0].id},
        data: {
          verified: 1,
          verifyToken: 'undefined',
          verifyTokenExpire: 'undefined',
        }
      })
    }else if(user[0].role === 'teacher'){
      const updateUser = await prisma.teachers.update({
        where: {id: user[0].id},
        data: {
          verified: 1,
          verifyToken: "undefined",
          verifyTokenExpire: "undefined",
        }
      })
    }else{
      const updateUser = await prisma.staff.update({
        where: {id: user[0].id},
        data: {
          verified: 1,
          verifyToken: "undefined",
          verifyTokenExpire: "undefined",
        }
      })
    }
    // await excuteQuery({
    //   query: `UPDATE ${
    //     user[0].role === "student"
    //       ? "users"
    //       : user[0].role === "teacher"
    //       ? "teacher"
    //       : "staff"
    //   } SET verifyToken=?, verifyTokenExpire=?,verified=1 WHERE email=? AND id=?`,
    //   values: [undefined, undefined, user[0].email, user[0].id],
    // });

    return NextResponse.json({
      message: "Email verified successfully✅",
      success: true,
    });
    
  } catch (error) {
    return NextResponse.json({ message: error.message, stauts: 500 });
  }
}
