import { useEffect } from "react";
import { useDoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
  const {
    dashboardData,
    getDoctorDashboard,
    loading,
  } = useDoctorContext();

  useEffect(() => {
    getDoctorDashboard();
  }, []);

  return (
    <div className="p-6">
      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Earnings */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl">
            ₹
          </div>
          <div>
            <p className="text-sm text-gray-500">Earnings</p>
            <h2 className="text-2xl font-semibold">
              ₹{dashboardData?.earnings ?? 0}
            </h2>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
            📅
          </div>
          <div>
            <p className="text-sm text-gray-500">Appointments</p>
            <h2 className="text-2xl font-semibold">
              {dashboardData?.appointments ?? 0}
            </h2>
          </div>
        </div>

        {/* Patients */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
            👤
          </div>
          <div>
            <p className="text-sm text-gray-500">Patients</p>
            <h2 className="text-2xl font-semibold">
              {dashboardData?.patients ?? 0}
            </h2>
          </div>
        </div>
      </div>

      {/* ================= LATEST BOOKINGS ================= */}
      <div className="bg-white rounded-xl shadow">
        <div className="border-b px-6 py-4">
          <h3 className="font-semibold text-gray-800">
            Latest Bookings
          </h3>
        </div>

        <div className="divide-y">
          {loading ? (
            <p className="p-6 text-gray-500 text-sm">
              Loading...
            </p>
          ) : dashboardData?.latestAppointments?.length === 0 ? (
            <p className="p-6 text-gray-500 text-sm">
              No recent bookings
            </p>
          ) : (
            dashboardData?.latestAppointments?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.userData?.image ||
                      "https://ui-avatars.com/api/?name=Patient"
                    }
                    className="w-10 h-10 rounded-full object-cover"
                    alt="patient"
                  />
                  <div>
                    <p className="font-medium text-sm">
                      {item.userData?.name || "Unknown"}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
