import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  //get ctfs
  const allCTFs = await prisma.ctfs.findMany({
    select: {
      id: true,
      description : true,
      title: true,
      thumbnail: true,
      level: true,
      userOwns: true,
      systemOwns: true,
      rating: true,
      matchineType: true,
      joining_date: true,
    },
  });
  console.log(allCTFs);
  NextResponse.json({ data: allCTFs });
}
