import excuteQuery, { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { verifyEmail } from "@/app/helpers/mailer";
const prisma = new PrismaClient();

// POST new user
export async function POST(req) {
  try {
    const reqBody = await req.json();
    //check if all values sent
    console.log("from api: ", reqBody);
    if (
      !reqBody.firstName ||
      !reqBody.lastName ||
      !reqBody.email ||
      !reqBody.password
    ) {
      return NextResponse.json({
        success: false,
        err_message: "the form is not complited",
        status: 500,
      });
    }
    const { firstName, lastName, email, password } = reqBody;
    // check if email is valid
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegx.test(email)) {
      return NextResponse.json({
        err_message: "Email is unvalid. Please Write your Email correctly",
        success: false,
      });
    }

    //check if password is valid
    if (password.length < 5) {
      return NextResponse.json({
        err_message: "Password Must Be 6 Characters Or Longer",
        success: false,
      });
    }
    //check if user already exists
    const user = await userExists(email, "email");
    if (user.length > 0) {
      return NextResponse.json({
        success: false,
        err_message: "user already exists",
        status: 500,
      });
    }
    //Hash user's password
    const hashedPass = await bcrypt.hash(password, 10);
    //insert new user
    const createUser = await prisma.users.create({
      data: {
        user_id: v4(),
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPass,
        joining_date: Date(),
      },
    });
    console.log(createUser);

    //send verification code
    const verificationEmail = await verifyEmail(
      email,
      createUser.id,
      createUser.role
    );
    

    return NextResponse.json({
      success: true,
      message: "user created successfully✅",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export default async function userExists(value, column) {
  // check if user exists
  let user = [];
  const query = await excuteQuery({
    query: `
    SELECT * FROM teachers WHERE ${column} = ?;
    SELECT * FROM staff WHERE ${column} = ?;
    SELECT * FROM users WHERE ${column} = ?; 
    `,
    values: [value, value, value],
  });
  query.map((e) => {
    if (e.length > 0) {
      user = e;
    }
  });

  return user;
}
