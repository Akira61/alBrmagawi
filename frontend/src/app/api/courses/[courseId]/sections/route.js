import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { join, extname } from "path";
import jwtDecode from "jwt-decode";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { courseId } = params;
  const token = await req.cookies.get("token");
  console.log("token: ",token.value);
  // Verify the token using jwt.verify method
  const user = await jwt.verify(token.value, process.env.JWT_SECRET);
  console.log("user: ",user);
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
  console.log(course);
  if (course.length == 0) {
    return NextResponse.json({
      success: false,
      err_message: "Course doesn't exists",
    });
  }

  //get course sections
  const sections = await prisma.course_sections.findMany({
    where: {
      course_id: parseInt(courseId),
    },
  });
  // get course lessons
  const lessons = await prisma.lessons.findMany({
    where: {
      course_id: parseInt(courseId)
    }
  })

  return NextResponse.json({
    success: true,
    message: "found course sections",
    sections: sections,
    lessons: lessons
  });
}
