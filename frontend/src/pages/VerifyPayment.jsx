import React, { useEffect, useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");
  
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const verifyPayment = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/verify-stripe`,
        { success, appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setIsSuccess(true);
        toast.success(data.message || "Payment verified!");
      } else {
        setIsSuccess(false);
        toast.error(data.message || "Payment verification failed.");
      }
    } catch (error) {
      setIsSuccess(false);
      toast.error("An error occurred during payment verification.");
    } finally {
      setLoading(false);
      // Redirect to MyAppointments after 3 seconds
      setTimeout(() => {
        navigate("/my-appointments");
      }, 3000);
    }
  };

  useEffect(() => {
    if (token && appointmentId) {
      verifyPayment();
    }
  }, [token, appointmentId]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-gray-100 text-center space-y-6">
        {loading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold text-gray-800">Verifying Your Payment</h2>
            <p className="text-sm text-gray-500">Please do not close this window or click go back.</p>
          </div>
        ) : isSuccess ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Payment Verified!</h2>
            <p className="text-sm text-gray-500">Your appointment is confirmed. Redirecting you to your bookings history...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Payment Failed or Cancelled</h2>
            <p className="text-sm text-gray-500">If money was deducted, it will be refunded. Redirecting you back to retry...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPayment;
