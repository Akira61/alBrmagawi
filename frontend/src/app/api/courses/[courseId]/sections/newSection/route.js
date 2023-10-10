import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { courseId, sectionName } = body;
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
  console.log(course);
  if (course.length == 0) {
    return NextResponse.json({
      success: false,
      err_message: "Course doesn't exists",
    });
  }
  //get course sections
  const sectionExists = await prisma.course_sections.findMany({
    where: {
      AND: [
        {
          course_id: parseInt(courseId),
        },
        {
          section: sectionName,
        },
      ],
    },
  });

  // check if section name already exists
  if (sectionExists.length >0) {
    return NextResponse.json({
      success: false,
      err_message: "Section name already exists",
    });
  }
  const insertSection = await prisma.course_sections.create({
    data: {
      section_id: Date.now().toString(),
      course_id: parseInt(courseId),
      section: sectionName,
    },
  });
  return NextResponse.json({
    success: true,
    message: "New section added",
  });
}
