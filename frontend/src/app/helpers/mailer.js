import nodemailer from "nodemailer";
import excuteQuery from "../lib/db";
import bcrypt from "bcrypt";
import userExists from "../api/auth/signup/user/route";
import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";
import { env } from "process";
const prisma = new PrismaClient();

const transport = nodemailer.createTransport({
  service: process.env.SMTP_service,
  auth: {
    user: process.env.SMTP_email,
    pass: process.env.SMTP_password,
  },
});

export default async function sendEmail({ email, emailType, userId }) {
  try {
    // create a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    console.log(hashedToken);
    const user = await userExists(email, "email");
    console.log(user);
    if (user.length < 1) {
      return { success: false, err_message: "email doesn't exists" };
    }
    if (emailType === "VERIFY") {
      const verify = await excuteQuery({
        query: `UPDATE ${
          user[0].role === "student"
            ? "users"
            : user[0].role === "teacher"
            ? "teachers"
            : "staff"
        } SET verifyToken=?, verifyTokenExpire=? WHERE email=? AND id=?`,
        values: [hashedToken, Date.now() + 3600000, email, userId],
      });
      console.log(verify);
    } else if (emailType === "RESET") {
      await excuteQuery({
        query: `UPDATE ${
          user[0].role === "student"
            ? "users"
            : user[0].role === "teacher"
            ? "teachers"
            : "staff"
        } SET forgotPasswordToken=?, forgotPasswordTokenExpire=? WHERE email=? AND id=?`,
        values: [hashedToken, Date.now() + 3600000, email, userId],
      });
    }
    const mailOptions = {
      from: "otaku.fahad11@gmail.com",
      to: email, // get email from user_id specifieded in the url
      subject:
        emailType === "VERIFY"
          ? "Please confirm your Email account"
          : "Reset your password",
      html: `<p>Click <a href='${
        process.env.domain
      }/verifyemail?token=${hashedToken}'>here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    const emailRes = await transport.sendMail(mailOptions);
    console.log(emailRes);
    return emailRes;
  } catch (error) {
    throw new Error(error.message);
  }
}



export async function verifyEmail(email, id, role) {
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
    return mail;
  } catch (error) {
    throw new Error(error.message);
  }
}
