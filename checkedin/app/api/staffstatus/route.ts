// implement the route for staff status to be displayed on staff dashboard

import { connectDB } from "@/app/config/db";
import Checkin from "@/models/checkin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const staffUserCookie = cookieStore.get("user");

    if (!staffUserCookie) {
      return NextResponse.json(
        { error: "Unauthorized: No user cookie found" },
        { status: 401 }
      );
    }

    const staffUser = JSON.parse(staffUserCookie.value);
    const staffId = staffUser.id;

    const checkin = await Checkin.findOne(
      { staffId: staffId },
      {},
      { sort: { createdAt: -1 } }
    );

    if (!checkin) {
      return NextResponse.json(
        { error: "No check-in found for this staff member" },
        { status: 404 }
      );
    }

    return NextResponse.json({ checkin }, { status: 200 });
  } catch (error) {
    console.error("Error fetching staff status:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff status" },
      { status: 500 }
    );
  }
}
