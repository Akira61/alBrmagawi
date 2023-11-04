import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import excuteQuery from "../../../lib/db";
const prisma = new PrismaClient();
 
export async function GET(req) {
  //get fist bloods
  const score = await excuteQuery({
    query:  `SELECT ctfs.rating CASE(WHEN ctfs.team=null THEN ctfs.team=users.first_name+" "+users.last_name) ctfs.team, teams.name
    FROM ctfs 
    INNER JOIN users ON ctfs.first_blood=users.id
    LEFT JOIN teams ON ctfs.team=teams.id;
    `
  })
  return NextResponse.json({ data: score });
}

