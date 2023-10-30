import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req){
    const body = await req.json();
    const {blogId,title,content} = await body;
    // update data
    const updateBlog = await prisma.blogs.update({
        where: {blog_id: blogId},
        data: {
            title: title,
            content: content
        }
    })
    console.log("update blog: ",updateBlog);
    return NextResponse.json({success: true});
} 