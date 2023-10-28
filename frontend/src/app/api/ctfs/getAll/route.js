import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import excuteQuery from "@/app/lib/db";
const prisma = new PrismaClient();

export async function GET(req) {
  //get ctfs
  let allCTFs = await excuteQuery({
    query: `SELECT ctfs.id,ctfs.title,ctfs.thumbnail,
    ctfs.catigory,ctfs.description,ctfs.level,
    ctfs.userOwns,ctfs.systemOwns,ctfs.rating,
    ctfs.links,ctfs.matchineType,ctfs.joining_date,
    ctfs.first_blood,ctfs.team, teams.name AS teamName,users.first_name, users.last_name 
    FROM ctfs 
    INNER JOIN users ON ctfs.first_blood=users.id
    LEFT JOIN teams ON ctfs.team=teams.id;`,
  });
  // let allCTFs = await prisma.ctfs.findMany({
  //   select: {
  //     id: true,
  //     catigory: true,
  //     description: true,
  //     title: true,
  //     thumbnail: true,
  //     level: true,
  //     userOwns: true,
  //     systemOwns: true,
  //     rating: true,
  //     first_blood: true,
  //     links: true,
  //     matchineType: true,
  //     joining_date: true,
  //   },
  // });

  //get all users solved ctfs
  const userOwns = await excuteQuery({
    query: `SELECT
    ctfs.id,
    ctfs.title,
    COUNT(CASE WHEN ctf_solved.ctf_id = ctfs.id THEN ctf_solved.user_id END) AS usersSolvedCount
  FROM
    ctfs
  LEFT JOIN
    ctf_solved ON ctfs.id = ctf_solved.ctf_id
  GROUP BY
    ctfs.id, ctfs.title;`,
  });
  for (let i = 0; i < allCTFs.length; i++) {
    allCTFs[i].userOwns = userOwns[i].usersSolvedCount;
  }

  console.log(allCTFs);
  return NextResponse.json({ data: allCTFs });
}
