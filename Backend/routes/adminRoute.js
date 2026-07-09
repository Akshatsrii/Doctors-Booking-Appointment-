import express from "express";
import {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  changeAvailability,
  appointmentsAdmin,
  cancelAppointmentAdmin,
  adminDashboard,
  markPaymentPaidAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

// 🔐 Admin login
adminRouter.post("/login", loginAdmin);

// ➕ Add doctor
adminRouter.post(
  "/add-doctor",
  authAdmin,
  upload.single("image"),
  addDoctor
);

// 👨‍⚕️ Get all doctors
adminRouter.get(
  "/all-doctors",
  authAdmin,
  getAllDoctors
);

// 🔁 Change doctor availability
adminRouter.post(
  "/change-availability",
  authAdmin,
  changeAvailability
);

// 📄 ADMIN – ALL APPOINTMENTS
adminRouter.get(
  "/appointments",
  authAdmin,
  appointmentsAdmin
);

// ❌ ADMIN – CANCEL APPOINTMENT  ✅ REQUIRED
adminRouter.post(
  "/cancel-appointment",
  authAdmin,
  cancelAppointmentAdmin
);

// 📊 ADMIN DASHBOARD
adminRouter.get(
  "/dashboard",
  authAdmin,
  adminDashboard
);

// 💳 MARK PAID
adminRouter.post(
  "/mark-paid",
  authAdmin,
  markPaymentPaidAdmin
);

export default adminRouter;
