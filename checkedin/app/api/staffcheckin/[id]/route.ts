import { NextResponse } from "next/server";
import { connectDB } from "@/app/config/db";
import Checkin from "@/models/checkin";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { status, comment } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Check-in ID and status are required" },
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Check-in ID is required" },
        { status: 400 }
      );
    }

    const deletedCheckin = await Checkin.findByIdAndDelete(id);

    if (!deletedCheckin) {
      return NextResponse.json(
        { error: "Check-in not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Check-in deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete check-in" },
      { status: 500 }
    );
  }
}
