import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import jwt from "jsonwebtoken";
import { unlink, unlinkSync } from "fs";
import { verifyJwtToken } from "@/app/helpers/getDataFromToken";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.formData();
  console.log(body);
  const file = body.get("file");
  const title = body.get("title");
  const points = body.get("points");
  const level = body.get("level");
  const machineType = body.get("machineType");
  const userFlag = body.get("userFlag");
  const rootFlag = body.get("rootFlag");
  const links = body.get("links");
  const desc = body.get("desc");

  // Verify the token using jwt.verify method
  const user =await verifyJwtToken(req);
  console.log(user);
  if(user.role !== "admin"){
    return NextResponse.json({success: false, err_message: "You don't have permetion" });
}
  let fileName;
  if(file !== 'undefined'){

      //check extension
      const fileExtension = extname(file.name);
      const extRegx = /\.(jpe?g|png|gif|avif|webp)$/i;
      if(!extRegx.test(file.name)){
        return NextResponse.json({
          success: false,
          err_message: "only jpeg,jpg,png,gif,avif,webp files allowed",
        });
      } 
      //save lesson to public directory
      const bytes = await file.arrayBuffer();
      const thumbnail = Buffer.from(bytes);
        fileName = Date.now()+fileExtension;
        const filePath = 'public/machines/'+fileName;
      //save file
      const saveFile = await writeFile(filePath, thumbnail);
  }
  
   // save data
   const saveData = await prisma.machines.create({
    data: {
        machine_id: Date.now().toString(),
        title: title,
        links: JSON.stringify({"data": links}),
        points: parseInt(points),
        thumbnail: fileName?fileName:"undefined",
        machineType: machineType,
        level: level,
        user_flag: userFlag,
        root_flag: rootFlag,
        description: desc,
    }
   })
  return NextResponse.json({
    success: true,
    message: "machine created",
  });
}
