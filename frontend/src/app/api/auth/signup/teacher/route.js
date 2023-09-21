import excuteQuery, { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import userExists from "../user/route";
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
      !reqBody.firstName ||
      !reqBody.lastName ||
      !reqBody.email ||
      !reqBody.password ||
      !reqBody.number ||
      !reqBody.department ||
      !reqBody.education ||
      !reqBody.Designation ||
      !reqBody.birth ||
      !reqBody.gender
    ) {
      return NextResponse.json({
        success: false,
        err_message: "the form is not complited",
        status: 500,
      });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      number,
      education,
      department,
      Designation,
      gender,
      birth,
    } = reqBody;

    //phone number onely numbers
    const numberRegx =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!numberRegx.test(number)) {
      return NextResponse.json({
        success: false,
        err_message: "unvalid phone number. Please Type yours correctly",
      });
    }
    // check if phone number already exists in teachers DB
    const phoneExists = await userExists(number, "phone_number");
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
    const createTeacher = await prisma.teachers.create({
        data: {
            user_id: v4(),
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: number,
            password: hashedPass,
            gender: gender,
            designation: Designation,
            department: department,
            education: education,
            birth_day: birth,
            joining_date: Date(),
        }
    })
    console.log(createTeacher);
    
    return NextResponse.json({
      success: true,
      message: "user created successfully✅",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}


