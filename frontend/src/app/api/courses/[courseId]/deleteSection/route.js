import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { sectionId, courseId } = body;
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

  const updateSection = await prisma.course_sections.delete({
    where: { id: sectionId },
  });
  return NextResponse.json({ success: true, message: "section deleted" });
  console.log(section);
}
