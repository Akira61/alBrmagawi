import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyJwtToken } from "../../../helpers/getDataFromToken";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const { ctfId, flag } = await body;
    const { id: userId } = await verifyJwtToken(req);
    console.log("userId : ", userId);
    // get user
    const user = await prisma.users.findFirst({
      where: { id: parseInt(userId) },
    });

    const validFlag = await prisma.ctfs.findFirst({
      where: {
        AND: [{ id: parseInt(ctfId) }, { flag: flag }],
      },
    });
    console.log(validFlag);
    // not valid flag
    if (!validFlag) {
      return NextResponse.json({ success: false, err_message: "Invalid Flag" });
    }

    //check if not first blood then the update the first blood to the user
    
    if (!validFlag.first_blood) {
      const firstBlood = await prisma.ctfs.update({
        where: { id: parseInt(ctfId) },
        data: {
          first_blood: parseInt(userId),
          team: user.team,
        },
      });
      // first blood message
      if (firstBlood)
        return NextResponse.json({
          success: true,
          firstBlood: true,
          message: "First blood",
        });
    }
    // if valid flag but not first blood
    if (validFlag) {
      return NextResponse.json({ success: true, message: "Correct Flag" });
    }
  } catch (error) {
    console.log("/api/ctfs/submitFlag Error: ", error.message);
    return NextResponse.json({ success: false, err_message: error.message });
  }
}
