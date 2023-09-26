import excuteQuery, { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import userExists from "@/app/api/auth/signup/user/route";
import sendEmail, { verifyEmail } from "@/app/helpers/mailer";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// POST new user
export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    //check if all values sent
    console.log("from api: ", reqBody);
    if (
      !reqBody.first_name ||
      !reqBody.last_name ||
      !reqBody.email ||
      !reqBody.password ||
      !reqBody.phone_number ||
      !reqBody.role
    ) {
      return NextResponse.json({
        success: false,
        err_message: "the form is not complited",
        status: 500,
      });
    }
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      role,
    } = await reqBody;

    //phone number onely numbers
    const numberRegx =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!numberRegx.test(phone_number)) {
      return NextResponse.json({
        success: false,
        err_message: "unvalid phone number. Please Type yours correctly",
      });
    }
    // check if phone number already exists in teachers DB
    const phoneExists = await userExists(phone_number, "phone_number");
    if (phoneExists.length > 0) {
      return NextResponse.json({
        success: false,
        err_message: "Phone Number Already taking",
      });
    }

    // check if email is valid
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegx.test(email)) {
      return res.json({
        err_message: "Email is unvalid. Please Write your Email correctly",
        success: false,
      });
    }

    //check if password is valid
    if (password.length < 5) {
      return res.json({
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
    //insert new teacher
    const createMember = await prisma.staff.create({
        data: {
            user_id: v4(),
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            password: hashedPass,
            role: role,
            joining_date: Date(),
        }
    })
    console.log(createMember);
    
    //send verification code
    // const verificationEmail = await verifyEmail(
    //   email,
    //   createMember.id,
    //   createMember.role
    // );

    return NextResponse.json({
      success: true,
      message: "user created successfully✅",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}