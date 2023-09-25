import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
    
  const teachers = await prisma.teachers.findMany({
    where: { accepted: { equals: 0 } },
  });
  if (teachers.length > 0) {
    return NextResponse.json({ data: teachers, success: true });
  }
  return NextResponse.json({
    success: false,
    err_message: "no teachers found",
  });
}
