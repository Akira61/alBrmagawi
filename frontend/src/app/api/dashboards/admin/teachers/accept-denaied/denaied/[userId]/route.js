import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  console.log(params);
  const { userId } = params;

  //get teacher data
  const teacher = await prisma.teachers.findFirst({
    where: { id: parseInt(userId) },
  });

  // move teacher to users table
  const newUser = await prisma.users.create({
    data: {
      user_id: teacher.user_id,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      phone_number: teacher.phone_number,
      email: teacher.email,
      password: teacher.password,
      verified: teacher.verified,
      joining_date: teacher.joining_date,
      verifyToken: teacher.verifyToken,
      verifyTokenExpire: teacher.verifyTokenExpire,
      forgotPasswordToken: teacher.forgotPasswordToken,
      forgotPasswordTokenExpire: teacher.forgotPasswordTokenExpire,
    },
  });

  //remove teacher from teachers table
  const removeTeacher = await prisma.teachers.delete({
    where: { id: parseInt(userId) },
  });

  if (removeTeacher) {
    return NextResponse.json({ data: newUser, success: true });
  }
  return NextResponse.json({
    success: false,
    err_message: "no teachers found",
  });
}
