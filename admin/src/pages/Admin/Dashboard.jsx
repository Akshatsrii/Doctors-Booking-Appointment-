import React, { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { dashData, getDashboardData } = useAdminContext();

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!dashData) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* DOCTORS */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="text-blue-600 text-3xl">👨‍⚕️</div>
          <div>
            <p className="text-gray-500 text-sm">Doctors</p>
            <p className="text-2xl font-bold">{dashData.doctors}</p>
          </div>
        </div>

        {/* APPOINTMENTS */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="text-purple-600 text-3xl">📅</div>
          <div>
            <p className="text-gray-500 text-sm">Appointments</p>
            <p className="text-2xl font-bold">{dashData.appointments}</p>
          </div>
        </div>

        {/* PATIENTS */}
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <div className="text-green-600 text-3xl">🧑</div>
          <div>
            <p className="text-gray-500 text-sm">Patients</p>
            <p className="text-2xl font-bold">{dashData.patients}</p>
          </div>
        </div>
      </div>

      {/* LATEST BOOKINGS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Latest Bookings</h3>

        {dashData.latestAppointments.length === 0 && (
          <p className="text-gray-500 text-sm">No recent appointments</p>
        )}

        <div className="space-y-4">
          {dashData.latestAppointments.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-3 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.docData?.image || "/avatar.png"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {item.docData?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.slotDate}
                  </p>
                </div>
              </div>

              <span
                className={`text-sm font-medium ${
                  item.isCancelled
                    ? "text-red-500"
                    : item.isPaid
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                {item.isCancelled
                  ? "Cancelled"
                  : item.isPaid
                  ? "Paid"
                  : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
