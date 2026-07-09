import express from "express";
import doctorModel from "../models/doctorModel.js";
import {
  loginDoctor,
  changeAvailability,
  appointmentsDoctor,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  cancelAppointmentDoctor,
  completeAppointmentDoctor,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

/* ======================================================
   DOCTOR LOGIN
   Doctor logs in using credentials created by Admin
   ====================================================== */
doctorRouter.post("/login", loginDoctor);

/* ======================================================
   GET AVAILABLE DOCTORS (PUBLIC)
   Used on user side for booking appointments
   ====================================================== */
doctorRouter.get("/list", async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({ available: true })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log("❌ Doctor List Error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
});


doctorRouter.get(
  "/appointments",
  authDoctor,
  appointmentsDoctor
);


doctorRouter.post(
  "/change-availability",
  authDoctor,
  changeAvailability
);

doctorRouter.get(
  "/dashboard",
  authDoctor,
  doctorDashboard // 🔥 THIS LINE IS REQUIRED
);
doctorRouter.get(
  "/profile",
  authDoctor,
  doctorProfile
);
doctorRouter.put(
  "/update-profile",
  authDoctor,
  updateDoctorProfile
);

doctorRouter.post(
  "/cancel-appointment",
  authDoctor,
  cancelAppointmentDoctor
);

doctorRouter.post(
  "/complete-appointment",
  authDoctor,
  completeAppointmentDoctor
);

export default doctorRouter;
