import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  myAppointments,
  payAppointment,
  cancelAppointment,
  confirmPayment,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// 🔐 PROTECTED ROUTES
userRouter.post("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateProfile
);

// 📅 BOOK APPOINTMENT
userRouter.post("/book-appointment", authUser, bookAppointment);

// 📄 MY APPOINTMENTS
userRouter.post("/my-appointments", authUser, myAppointments);

// 💳 PAYMENT
userRouter.post("/pay-appointment", authUser, payAppointment);
userRouter.post("/confirm-payment", authUser, confirmPayment);

// ❌ CANCEL
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
