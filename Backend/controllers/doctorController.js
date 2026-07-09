import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";          // ✅ MISSING
import jwt from "jsonwebtoken";       // ✅ MISSING

/* ================= CHANGE AVAILABILITY ================= */
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    doctor.available = !doctor.available;
    await doctor.save();

    res.json({
      success: true,
      message: "Availability changed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DOCTOR LOGIN ================= */
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ validation
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 🔍 find doctor created by admin
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🎟 generate JWT
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Doctor login successful",
      token,
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality,
      },
    });
  } catch (error) {
    console.log("❌ Doctor login error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
/* ================= DOCTOR APPOINTMENTS ================= */
import appointmentModel from "../models/appointmentModel.js";

const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID missing",
      });
    }

    const appointments = await appointmentModel.find({
      docId,
    });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Doctor appointments error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//Dashboard
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId });

    const earnings = appointments
      .filter((a) => a.isPaid && !a.isCancelled)
      .reduce((sum, a) => sum + a.amount, 0);

    const patients = new Set(
      appointments.map((a) => a.userId.toString())
    ).size;

    const latestAppointments = appointments
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    res.json({
      success: true,
      dashboardData: {
        earnings,
        appointments: appointments.length,
        patients,
        latestAppointments,
      },
    });
  } catch (error) {
    console.error("Doctor dashboard error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;

    const doctor = await doctorModel
      .findById(docId)
      .select("-password");

    if (!doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { about, fees, experience, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, {
      about,
      fees,
      experience,
      available,
    });

    res.json({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const cancelAppointmentDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId.toString() !== docId.toString()) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    if (appointment.isCancelled) {
      return res.json({ success: false, message: "Appointment already cancelled" });
    }

    appointment.isCancelled = true;
    appointment.status = "cancelled";
    await appointment.save();

    // Free slot
    if (appointment.slotDate && appointment.slotTime) {
      await doctorModel.findByIdAndUpdate(docId, {
        $pull: {
          [`slots_booked.${appointment.slotDate}`]: appointment.slotTime,
        },
      });
    }

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Doctor cancel appointment error:", error);
    res.json({ success: false, message: error.message });
  }
};

const completeAppointmentDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId.toString() !== docId.toString()) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    if (appointment.isCancelled) {
      return res.json({ success: false, message: "Cannot complete a cancelled appointment" });
    }

    appointment.isCompleted = true;
    appointment.status = "confirmed";
    await appointment.save();

    res.json({ success: true, message: "Appointment marked as completed" });
  } catch (error) {
    console.error("Doctor complete appointment error:", error);
    res.json({ success: false, message: error.message });
  }
const addPrescriptionDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId, medicines, instructions } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId.toString() !== docId.toString()) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    if (appointment.isCancelled) {
      return res.json({ success: false, message: "Cannot prescribe for a cancelled appointment" });
    }

    appointment.prescription = {
      medicines,
      instructions,
      prescribedAt: new Date(),
    };
    appointment.isCompleted = true;
    appointment.status = "confirmed";
    await appointment.save();

    res.json({ success: true, message: "Prescription saved successfully" });
  } catch (error) {
    console.error("Doctor prescribe error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  loginDoctor,
  appointmentsDoctor,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  cancelAppointmentDoctor,
  completeAppointmentDoctor,
  addPrescriptionDoctor,
};