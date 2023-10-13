import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import jwt from "jsonwebtoken";
import { unlink, unlinkSync } from "fs";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.formData();
  console.log(body);
  const file = body.get("file");
  const title = body.get("title");
  const desc = body.get("desc");
  const viewable = body.get("viewable");
  const section = body.get("section");
  const courseId = body.get("courseId");
  const lessonId = body.get("lessonId");

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
  // get lesson
  const lesson = await prisma.lessons.findFirst({
    where: { id: parseInt(lessonId) },
  });
  console.log("lesson : ", lesson);
  // the file name is the current lesson but if there is an update for the file, the file name will change to the new file contet
  let fileName = lesson.content;
  if (file !== "undefined") {
    // remove exsisting file
    const currentFileName = join(
      __dirname,
      `../../../../../../../../../public/courses/lessons/${lesson.content}`
    );
    const deleteFile = await unlinkSync(currentFileName);
    //check extension
    const fileExtension = extname(file.name);
    const extRegx = /\.(mp4||mp3)$/i;
    if (!extRegx.test(file.name)) {
      return NextResponse.json({
        success: false,
        err_message: "only video files allowed .mp4",
      });
    }
    //save lesson to public directory
    const bytes = await file.arrayBuffer();
    const video = Buffer.from(bytes);
    fileName = Date.now() + fileExtension;
    const filePath = "public/courses/lessons/" + fileName;
    //save file
    const saveFile = await writeFile(filePath, video);
  }

  //update data
  const updateLesson = await prisma.lessons.update({
    where: { id: parseInt(lessonId) },
    data: {
      title: title,
      content: fileName,
      content_type: "url",
      description: desc === "undefined" ? undefined : desc,
      public: viewable === "false" ? 0 : 1,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Lesson updated",
  });
}
