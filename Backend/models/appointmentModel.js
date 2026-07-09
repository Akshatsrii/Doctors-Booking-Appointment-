import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    /* ================= USER & DOCTOR ================= */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },

    /* ================= SNAPSHOT DATA ================= */
    // Stored so appointment history remains even if profile changes
    userData: {
      type: Object,
      required: true, // name, age, image, etc.
    },

    docData: {
      type: Object,
      required: true, // doctor name, speciality, fees
    },

    /* ================= SLOT INFO ================= */
    slotDate: {
      type: String, // e.g. "23 Aug 2024"
      required: true,
    },

    slotTime: {
      type: String, // e.g. "11:00 AM"
      required: true,
    },

    /* ================= PAYMENT ================= */
    amount: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false, // true = online paid
    },

    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
      default: "cash",
    },

    /* ================= STATUS ================= */
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    isCancelled: {
      type: Boolean,
      default: false,
    },

    /* ================= CREATED DATE ================= */
    date: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
