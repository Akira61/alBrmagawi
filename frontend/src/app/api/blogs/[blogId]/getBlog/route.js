import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, {params}){
    const {blogId} = params;
    //if blog doesn't exists created
    const blog = await prisma.blogs.findFirst({
        where: {blog_id: blogId}
    });
    console.log("blog: ", blog);
    if(!blog){
        //create a blog
        const newBlog = await prisma.blogs.create({
            data: {
                blog_id: blogId,
            }
        });
        return NextResponse.json({success: true ,data: newBlog})
    }
    return NextResponse.json({success: true ,data: blog})
}   