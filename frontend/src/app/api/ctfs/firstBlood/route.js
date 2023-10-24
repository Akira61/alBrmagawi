import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import excuteQuery from "@/app/lib/db";
const prisma = new PrismaClient();
 
export async function GET(req) {
  // const token = req.cookies.get("token")?.value || "";
  //get fist bloods
  const firstBlod = await excuteQuery({
    query: `SELECT ctfs.id,ctfs.title,ctfs.thumbnail,ctfs.first_blood, users.first_name, users.last_name 
    FROM ctfs 
    INNER JOIN users ON ctfs.first_blood=users.id`,
  }); 
  console.log(firstBlod)
//   const allBlood = await prisma.ctfs.findMany({
//     select: {
//       id: true,
//       title: true,
//       thumbnail: true,
//       first_blood: true,
//     },
//     includes: {
//       first_name: true,
//       last_name: true,
//     },
//   });

  return NextResponse.json({ data: firstBlod });
}
