import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { join,extname } from "path";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.formData();
  console.log(body)
  console.log(body.get('file'));
  // const file = body.get('file');
  const title = body.get('title');
  //check if teacher exists
  const cookie =  cookies().get("token")
  const teacher = jwt.verify(cookie.value,process.env.JWT_SECRET)
  console.log(teacher);
  if(teacher.role=== 'student'){
    return NextResponse.json({
      success: false,
      err_message: "You're not allowed to create a course",
    });
  }

  // check if course title already exists
  const titleExists = await prisma.courses.findFirst({
    where: { title: title },
  });
  if (titleExists) {
    return NextResponse.json({
      success: false,
      err_message: "Course Title already taken",
    });
  }

  //save thumbnail to public directory
  // const bytes = await file.arrayBuffer();
  // const img = Buffer.from(bytes);
  // const fileName = Date.now()+'-'+file.name;
  // const filePath = 'public/courses/thumbnails/'+fileName;
  //check extension
  // const fileExtension = extname(file.name);
  // const extRegx = /\.(jpe?g|png|gif|avif|webp)$/i
  // if(!extRegx.test(file.name)){
  //   return NextResponse.json({
  //     success: false,
  //     err_message: "only images files allowed jpeg,png,gif,avif,webp.",
  //   });
  // }
  //save file
  // const saveFile = await writeFile(filePath, img);

  //save data in db
  const course = await prisma.courses.create({
    data: {
      course_id: Date.now().toString(),
      teacher: teacher.id,
      title: title,
      // thumbnail: fileName,
      public: 0,
      date: new Date(),
    },
  });
  if (course) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({
    success: false,
    err_message: "something went wrong. Please try again",
  });
}
