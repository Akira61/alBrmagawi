import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const students = await prisma.users.findMany({
    select: {
        id:true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
      joining_date: true,
      verified: true,  
    },
  });
  if (students.length > 0) {
    return NextResponse.json({ data: students, success: true });
  }
  return NextResponse.json({
    success: false,
    err_message: "no teachers found",
  });
}
