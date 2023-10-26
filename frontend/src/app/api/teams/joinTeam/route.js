import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import excuteQuery from "../../../lib/db";
import { verifyJwtToken } from "@/app/helpers/getDataFromToken";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { password, teamName } = await body;

  const loggedIn = await verifyJwtToken(req).catch((err) => {
    console.log("error from verifyJwtToken: ", err);
  });

  // check if team correct
  const team = await prisma.teams.findFirst({
    where: { name: teamName },
  });
  if(!team){
    return NextResponse.json({success:false, err_message: "team dosn't exists"})
  }
  const correctPassword = await bcrypt.compare(password, team.password);

  if(correctPassword){
    // update user's team
    const user = await prisma.users.update({
        where: {id: loggedIn.id},
        data: {
            team: parseInt(team.id),
        }
    });
    if(user){
        return NextResponse.json({ success: true, message: "user Joined the Team" });
    }
    return NextResponse.json({ success: false, err_message: "something went wrong. try again later" });
  }

  //password not correct 
  return NextResponse.json({ success: false, err_message: "password uncorrect" });
}
