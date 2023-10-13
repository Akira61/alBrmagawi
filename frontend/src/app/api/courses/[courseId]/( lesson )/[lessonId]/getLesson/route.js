import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join,extname } from "path";
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();


export async function GET(req,{params}){
    const {lessonId,courseId} = params;
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

  // get course lessons
  const lessons = await prisma.lessons.findMany({
    where: {
      id: parseInt(lessonId)
    }
  })
  return NextResponse.json({
    success: true,
    lessons: lessons
  })
}