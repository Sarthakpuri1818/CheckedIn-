// this route is designed for staff to checkin from the dashboard

import { connectDB } from "@/app/config/db";
import Checkin from "@/models/checkin";
import User from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// created a GET request to display all checkins on manager dahboard
export async function GET() {
  try {
    await connectDB();

    const checkins = await Checkin.find().sort({ createdAt: -1 });

    return NextResponse.json({ checkins }, { status: 200 });
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    return NextResponse.json(
      { error: "Failed to fetch check-ins" },
      { status: 500 }
    );
  }
}



// created a PUT request for manager to approve or rejct the checkin request from staff
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, status, comment } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    const updatedCheckin = await Checkin.findByIdAndUpdate(
      id,
      {
        status,
        comment,
        approvedBy: "Manager",
      },
      { new: true }
    );

    if (!updatedCheckin) {
      return NextResponse.json(
        { error: "Check-in not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Check-in updated successfully",
        checkin: updatedCheckin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update check-in" },
      { status: 500 }
    );
  }
}



// created a post request for staff to checkin and store the data in database

export async function POST() {
  try {
    await connectDB();
// cookie is created for staff when they log in
// this helps to identify where the checkin request coming from the staff user
    const cookieStore = await cookies();
    const staffCookie = cookieStore.get("user");

    if (!staffCookie) {
      return NextResponse.json({ error: "Please log in first" }, { status: 401 });
    }

    const parsedUser = JSON.parse(staffCookie.value);
    const staffId = parsedUser.id;

    if (!staffId) {
      return NextResponse.json({ error: "Invalid login session" }, { status: 401 });
    }

    const staffUser = await User.findById(staffId);

    if (!staffUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingCheckin = await Checkin.findOne({ staffId, status: "Pending" });
    if (existingCheckin) {
      return NextResponse.json(
        { error: "You have already checked in and it's pending approval." },
        { status: 400 }
      );
    }
// creates a new checkin for any user 
    const newCheckin = new Checkin({
      staffId,
      staffName: staffUser.name,
      status: "Pending",
      comment: "",
      approvedBy: "",
    });
    await newCheckin.save();

    return NextResponse.json(
      { message: "Check-in successful", checkin: newCheckin },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during check-in:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
