import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: true, // needed for login
    },

    image: {
      type: String,
      required: true,
    },

    speciality: {
      type: String,
      required: true,
    },

    degree: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    fees: {
      type: Number,
      required: true,
    },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: Number },
    },

    // doctor created date (admin adds doctor)
    date: {
      type: Number,
      required: true,
    },

    // booked slots: { "2026-01-10": ["10:00 AM", "10:30 AM"] }
    slots_booked: {
      type: Map,
      of: [String],
      default: {},
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default doctorModel;
