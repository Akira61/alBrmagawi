import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req,{params}){
    console.log(params)
    const {userId} = params

    const member = await prisma.staff.delete({
        where : {id: parseInt(userId)},
    })
    if (member) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({
        success: false,
        err_message: "no teachers found",
      });

}