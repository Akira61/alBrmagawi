import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import excuteQuery from "../../../lib/db";
import { verifyJwtToken } from "@/app/helpers/getDataFromToken";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { password, teamName } = await body;
    const loggedIn = await verifyJwtToken(req).catch((err) => {
      console.log("error from verifyJwtToken: ", err);
    });

    if (!loggedIn) {
      return NextResponse.json({
        success: false,
        err_message: "You're not logged in",
      });
    }

    //check if team name already exists
    const teamNameExists = await prisma.teams.findFirst({
      where: { name: teamName },
    });
    if (teamNameExists) {
      //name exists
      return NextResponse.json({
        success: false,
        err_message: "team name already taken",
      });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // insert team
    const newTeam = await prisma.teams.create({
      data: {
        name: teamName,
        password: hashedPassword,
        leader: parseInt(loggedIn.id),
      },
    });
    // check if leader already joined one of teams and overwire that team
    if (loggedIn.team) {
      // update user's team
      const user = await prisma.users.update({
        where: { id: loggedIn.id },
        data: {
          team: parseInt(newTeam.id),
        },
      });
    }
    if (newTeam) {
      return NextResponse.json({ success: true, message: "Team created" });
    }
  } catch (error) {
    console.log("/api/teams/createTeam error: ", error.message);
    NextResponse.json({ success: false, err_message: error.message });
  }
}
