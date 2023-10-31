import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyJwtToken } from "@/app/helpers/getDataFromToken";
const prisma = new PrismaClient();

export async function GET(req) {
    const user =await verifyJwtToken(req);
    if(user.role !== "admin"){
        return NextResponse.json({success: false, err_message: "You don't have permetion" });
    }
  const allMachine = await prisma.machines.findMany({});
  if (allMachine.length > 0) {
    return NextResponse.json({ data: allMachine, success: true });
  }
  return NextResponse.json({
    success: false,
    err_message: "no teachers found",
  });
}
