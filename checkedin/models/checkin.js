import mongoose from "mongoose";
// checkin schema for how staff checkin will work and will be stored in database 
const checkinSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
    },
    staffName: {
      type: String,
      required: true,
      trim: true,
    },
   
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Denied"],
    },
    comment: {
      type: String,
      default: "",
      trim: true,
    },
    approvedBy: {
      type: String,
      
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Checkin || mongoose.model("Checkin", checkinSchema);