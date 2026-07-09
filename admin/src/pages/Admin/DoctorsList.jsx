import { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const {
    doctors,
    aToken,
    getAllDoctors,
    changeAvailability,
  } = useAdminContext();

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-5">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-4">
        {doctors.length === 0 ? (
          <p>No doctors found</p>
        ) : (
          doctors.map((item) => (
            <div
              key={item._id}
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="bg-indigo-50 w-full h-52 object-cover"
              />

              <div className="p-3">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                  />
                  <p className="text-sm">
                    {item.available ? "Available" : "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
