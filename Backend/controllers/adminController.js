import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js"; // ✅ REQUIRED
import userModel from "../models/userModel.js"; 

/* ================= ADD DOCTOR ================= */
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    if (!req.file) {
      return res.json({ success: false, message: "Image required" });
    }

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be 8 characters",
      });
    }

    const exists = await doctorModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "Doctor already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUpload = await cloudinary.uploader.upload(req.file.path);

    await doctorModel.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    });

    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= ADMIN LOGIN ================= */
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ success: true, token });
};

/* ================= GET ALL DOCTORS ================= */
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= CHANGE AVAILABILITY ================= */
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.json({
        success: false,
        message: "Doctor ID required",
      });
    }

    const doctor = await doctorModel.findById(docId);

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.available = !doctor.available;
    await doctor.save();

    res.json({
      success: true,
      message: "Availability updated",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
/* ================= ADMIN: ALL APPOINTMENTS ================= */
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .sort({ date: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= ADMIN CANCEL APPOINTMENT ================= */
const cancelAppointmentAdmin = async (req, res) => {
  try {
    const appointmentId =
      req.body.appointmentId || req.body.id;

    if (!appointmentId) {
      return res.json({
        success: false,
        message: "Appointment ID missing",
      });
    }

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.isCancelled) {
      return res.json({
        success: false,
        message: "Appointment already cancelled",
      });
    }

    // ✅ Update appointment
    appointment.isCancelled = true;
    appointment.status = "cancelled";
    await appointment.save();

    // ✅ Free slot ONLY if fields exist
    if (appointment.slotDate && appointment.slotTime) {
      await doctorModel.findByIdAndUpdate(appointment.docId, {
        $pull: {
          [`slots_booked.${appointment.slotDate}`]:
            appointment.slotTime,
        },
      });
    }

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("ADMIN CANCEL ERROR:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= ADMIN DASHBOARD ================= */
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.countDocuments();
    const patients = await userModel.countDocuments();
    const appointments = await appointmentModel.countDocuments();

    const latestAppointments = await appointmentModel
      .find({})
      .sort({ date: -1 })
      .limit(5);

    res.json({
      success: true,
      dashData: {
        doctors,
        patients,
        appointments,
        latestAppointments,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  changeAvailability,
  appointmentsAdmin, // ✅ IMPORTANT
  cancelAppointmentAdmin,
  adminDashboard, // ✅ ADD THIS
};
