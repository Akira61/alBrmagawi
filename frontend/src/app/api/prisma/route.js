import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const allusers = await prisma.users.findMany();
    return NextResponse.json({ data: allusers });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
