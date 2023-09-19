import excuteQuery, { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import userExists from "../signup/user/route";
import jwt from "jsonwebtoken";

export default async function GET() {
  try {
    const response = NextResponse.json({
      message: "logout successfully",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
