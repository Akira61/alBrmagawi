import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const teachers = await prisma.teachers.findMany({
    select: {
        id:true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
      department: true,
      gender: true,
      education: true,
      joining_date: true
    },
  });
  if (teachers.length > 0) {
    return NextResponse.json({ data: teachers, success: true });
  }
  return NextResponse.json({
    success: false,
    err_message: "no teachers found",
  });
}
