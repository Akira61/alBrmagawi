import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req,{params}){
    console.log(params)
    const {userId} = params

    const accept = await prisma.teachers.update({
        where : {id: parseInt(userId)},
        data: {
            accepted:1
        }
    })
    if (accept) {
        return NextResponse.json({ data: accept, success: true });
      }
      return NextResponse.json({
        success: false,
        err_message: "no teachers found",
      });

}