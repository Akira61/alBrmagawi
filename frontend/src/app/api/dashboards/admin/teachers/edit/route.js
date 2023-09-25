import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { userId } = body;
  const {
    first_name,
    last_name,
    phone_number,
    email,
    designation,
    department,
    education,
  } = await body;

  const accept = await prisma.teachers.update({
    where: { id: parseInt(userId) },
    data: {
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email: email,
      designation: designation,
      department: department,
      education: education
    },
  });
  if (accept) {
    return NextResponse.json({ data: accept, success: true });
  }
  return NextResponse.json({
    success: false,
    err_message: "no teachers found",
  });
}
