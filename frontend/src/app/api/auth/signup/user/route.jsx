import excuteQuery, { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

// POST new user
export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { firstName, lastName, email, password } = reqBody;
    //check if all values sent
    console.log("from api: ", reqBody);
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({
        success: false,
        err_message: "the form is not complited",
        status: 500,
      });
    }
    // check if email is valid
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegx.test(email)) {
      return res.json({
        err_message: "Email is unvalid. Please Write your Email correctly",
        success: false,
      });
    }

    //check if password is valid
    if (password.length < 5) {
      return res.json({
        err_message: "Password Must Be 6 Characters Or Longer",
        success: false,
      });
    }
    //check if user already exists
    const user = await userExists(email, "email");
    if (user.length > 0) {
      return NextResponse.json({
        success: false,
        err_message: "user already exists",
        status: 500,
      });
    }
    //Hash user's password
    const hashedPass = await bcrypt.hash(password, 10);
    const query = `
    INSERT INTO users(user_id, first_name, last_name, email, password, joining_date)
    VALUES( ?, ?, ?,?, ?,?);`;
    const newUser = await excuteQuery({
      query: query,
      values: [v4(), firstName, lastName, email, hashedPass, Date()],
    });
    console.log(newUser);
    return NextResponse.json({
      success: true,
      message: "user created successfully✅",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}




export default async function userExists(value, column) {
  // check if user exists
  let user = [];
  const query = await excuteQuery({
    query: `
    SELECT * FROM teachers WHERE ${column} = ?;
    SELECT * FROM staff WHERE ${column} = ?;
    SELECT * FROM users WHERE ${column} = ?; 
    `,
    values: [value, value, value],
  });
  query.map((e) => {
    if (e.length > 0) {
      user = e;
    }
  });

  return user;
}
