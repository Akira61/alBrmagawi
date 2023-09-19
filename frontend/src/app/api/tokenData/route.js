import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import excuteQuery from "@/app/lib/db";

export async function GET(req) {
  try {
    const userData = await getDataFromToken(req);
    const user = await excuteQuery({
      query: `SELECT id,user_id,first_name,
      last_name,email,
      role,verified,
      joining_date 
      FROM ${
        userData.role == "student"
          ? "users"
          : userData.role === "teacher"
          ? "teacher"
          : "admin"
      } WHERE id=?;`,
      values: [userData.id],
    });
    console.log(user);
    return NextResponse.json({
      message: "user found ✅",
      data: user[0],
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
