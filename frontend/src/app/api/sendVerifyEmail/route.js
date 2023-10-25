
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

const transport = nodemailer.createTransport({
  service: process.env.SMTP_service,
  auth: {
    user: process.env.SMTP_email,
    pass: process.env.SMTP_password,
  },
});
 
export async function GET(req) {
  try {
    // const body = await req.json();
    // const {email,id,role} = body
    // const sendemail = await verifyEmail('jorad98215@ipniel.com', 3, 'student');
    // console.log(sendemail);
    // const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, "");
    // // update user token based on role
    // let user;

    // const updateToken = await prisma.users.update({
    //   where: { id: 56},
    //   data: {
    //     verifyToken: token,
    //   },
    // });
    // user = updateToken;
    // //end update based on role

    // //send email
    // const mailOptions = {
    //   from: process.env.SMTP_email,
    //   to: "jorad98215@ipniel.com", // get email from user_id specifieded in the url
    //   subject: "Please confirm your Email account",
    //   html: `<h1>Hello ${
    //     user.first_name + " " + user.last_name
    //   }</h1><p>Please click <a href='${
    //     process.env.domain
    //   }/verifyemail?token=${token}'>here</a> to verify your email</p>`,
    // };
    // await transport.sendMail(mailOptions);
    return NextResponse.json({data: "none"});
  } catch (error) {
    throw new Error(error.message);
  }
}

async function verifyEmail(email, id, role) {
  try {
    const token = await bcrypt.hash(id.toString(), 10);
    // update user token based on role
    let user;
    if (role === "student") {
      const updateToken = await prisma.users.update({
        where: { id: id },
        data: {
          verifyToken: token,
          verifyTokenExpire: (Date.now() + 3600000).toString(),
        },
      });
      user = updateToken;
    } else if (role === "teacher") {
      const updateToken = await prisma.teachers.update({
        where: { id: id },
        data: {
          verifyToken: token,
          verifyTokenExpire: (Date.now() + 3600000).toString(),
        },
      });
      user = updateToken;
    } else {
      const updateToken = await prisma.staff.update({
        where: { id: id },
        data: {
          verifyToken: token,
          verifyTokenExpire: (Date.now() + 3600000).toString(),
        },
      });
      user = updateToken;
    }
    //end update based on role

    //send email
    const mailOptions = {
      from: process.env.SMTP_email,
      to: email, // get email from user_id specifieded in the url
      subject: "Please confirm your Email account",
      html: `<h1>Hello ${
        user.first_name + " " + user.last_name
      }</h1><p>Please click <a href='${
        process.env.domain
      }/verifyemail?token=${token}'>here</a> to verify your email</p>`,
    };
    const mail = await transport.sendMail(mailOptions);
    console.log(mail);
  } catch (error) {
    throw new Error(error.message);
  }
}
