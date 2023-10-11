import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join,extname } from "path";
import jwt from "jsonwebtoken"
const prisma = new PrismaClient();

export async function POST(req){
    const body = await req.formData();
  console.log(body)
  const file = body.get('file');
  const title = body.get('title');
  const desc = body.get('desc');
  const viewable = body.get('viewable');
  const section = body.get('section');
  const courseId = body.get('courseId');

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

  //get course sections
  const sectionExists = await prisma.course_sections.findFirst({
    where: {
      AND: [
        {
          course_id: parseInt(courseId),
        },
        {
          section: section,
        },
      ],
    },
  });
  console.log(sectionExists)
  // check if section exists
  if (sectionExists.length == 0) {
    return NextResponse.json({
      success: false,
      err_message: "Section NOT found",
    });
  }

  //check extension
  const fileExtension = extname(file.name);
  const extRegx = /\.(mp4||mp3)$/i
  if(!extRegx.test(file.name)){
    return NextResponse.json({
      success: false,
      err_message: "only video files allowed .mp4",
    });
  }
  //save lesson to public directory
  const bytes = await file.arrayBuffer();
  const video = Buffer.from(bytes);
  const fileName = Date.now()+fileExtension;
  const filePath = 'public/courses/lessons/'+fileName;
  //save file
  const saveFile = await writeFile(filePath, video);

  //save data
  const insertLesson = await prisma.lessons.create({
    data: {
        lesson_id: Date.now().toString(),
        course_id: parseInt(courseId),
        section: parseInt(sectionExists.id),
        title: title,
        content: fileName, 
        content_type: "url",
        description: desc==='undefined'?undefined:desc,
        public: viewable==='false'?0: 1,
        date: new Date()
    }
  })
  return NextResponse.json({success: true, message: "Lesson created"})
}