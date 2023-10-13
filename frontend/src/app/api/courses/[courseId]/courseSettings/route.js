import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import jwt from "jsonwebtoken";
import { unlink, unlinkSync } from "fs";
const prisma = new PrismaClient();

export async function POST(req, { params }) {
  const body = await req.formData();
  console.log(body);
  const file = body.get("file");
  const title = body.get("title");
  const price = body.get("price");
  const desc = body.get("desc");
  const { courseId } = params;

  const token = await req.cookies.get("token");
  // Verify the token using jwt.verify method
  const user = await jwt.verify(token.value, process.env.JWT_SECRET);
  console.log(user);
  // check if course exists and teacher won this course
  const course = await prisma.courses.findFirst({
    where: {
      AND: [
        {
          id: parseInt(courseId),
        },
        {
          teacher: user.id,
        },
      ],
    },
  });
  if (course.length == 0) {
    return NextResponse.json({
      success: false,
      err_message: "Course doesn't exists",
    });
  }

  let fileName = course.thumbnail;
  if (file !== "undefined") {
    // remove exsisting file
    const currentFileName = join(
      __dirname,
      `../../../../../../../public/courses/thumbnails/${course.thumbnail}`
    );
    const deleteFile = await unlinkSync(currentFileName);
    //check extension
    const fileExtension = extname(file.name);
    const bytes = await file.arrayBuffer();
    const img = Buffer.from(bytes);
    fileName = Date.now() + fileExtension;
    const filePath = "public/courses/thumbnails/" + fileName;
    //check extension
    const extRegx = /\.(jpe?g|png|gif|avif|webp)$/i;
    if (!extRegx.test(file.name)) {
      return NextResponse.json({
        success: false,
        err_message: "only images files allowed jpeg,png,gif,avif,webp.",
      });
    }
    //save file
    const saveFile = await writeFile(filePath, img);
  }

  //update data
  const updateCourse = await prisma.courses.update({
    where: { id: parseInt(courseId) },
    data: {
      title: title,
      price: parseInt(price),
      thumbnail: fileName,
      description: desc === "undefined" ? undefined : desc,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Course updated",
  });
}
