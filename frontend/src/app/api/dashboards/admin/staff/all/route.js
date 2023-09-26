import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const member = await prisma.staff.findMany({
    select: {
        id:true,
      first_name: true,
      last_name: true,
      email: true,
      phone_number: true,
      role:true,
      joining_date: true
    },
  });
  if (member.length > 0) {
    return NextResponse.json({ data: member, success: true });
  }
  return NextResponse.json({
    success: false,
    err_message: "no teachers found",
  });
}
