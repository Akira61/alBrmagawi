import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req,{params}){
    console.log(params)
    const {userId} = params

    const teacher = await prisma.teachers.findFirst({
        where : {id: parseInt(userId)},
    })
    if (teacher) {
        return NextResponse.json({ data: teacher, success: true });
      }
      return NextResponse.json({
        success: false,
        err_message: "no teachers found",
      });

}