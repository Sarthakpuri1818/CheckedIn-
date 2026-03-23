import { connectDB } from "@/app/config/db";// importing the database connection call
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";// for hashing of passwords 

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const reqBody = await request.json();
    const name = (reqBody.name || "").trim();
    const email = (reqBody.email || "").toLowerCase().trim();
    const password = reqBody.password;
    const role = reqBody.role;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "name, email, password, and role are required" },
        { status: 400 }
      );
    }

    // const existingUser = await User.findOne({ email });

    // if (existingUser) {
    //   return NextResponse.json(
    //     { message: "User already exists" },
    //     { status: 400 }
    //   );
    // }


    //hasing method of password using bycrypt 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role

    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("SIGNUP ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}