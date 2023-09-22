import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { resetPassword } from "@/app/helpers/mailer";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = await body;
    const sendMail = await resetPassword(email);
    if (sendMail.success) {
      return NextResponse.json({
        success: true,
        message: "reset password page sent successfully throw email ✅",
      });
    }
    if (sendMail.err_message) {
      return NextResponse.json({
        success: false,
        err_message: sendMail.err_message,
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, err_message: error.message });
  }
}
