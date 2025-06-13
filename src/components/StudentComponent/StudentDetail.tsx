import React from "react";

const studentData = {
  name: "Sayak Khan",
  email: "sayak@example.com",
  rollNo: "UNI2023001",
  phone: "9876543210",
  points: {
    "1st Year": { uploaded: 25, approved: 20 },
    "2nd Year": { uploaded: 30, approved: 28 },
    "3rd Year": { uploaded: 40, approved: 35 },
    "4th Year": { uploaded: 45, approved: 40 },
  },
};

const StudentDetail = () => {
  const totalUploaded = Object.values(studentData.points).reduce(
    (acc, year) => acc + year.uploaded,
    0
  );
  const totalApproved = Object.values(studentData.points).reduce(
    (acc, year) => acc + year.approved,
    0
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Student Info */}
      <div className="bg-green-100 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Student Profile
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-gray-700">
          {/* Column 1 */}
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Name:</span> {studentData.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {studentData.email}
            </div>
            <div>
              <span className="font-semibold">Roll No:</span>{" "}
              {studentData.rollNo}
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Phone:</span> {studentData.phone}
            </div>
            <div>
              <span className="font-semibold">Total Uploaded Points:</span>{" "}
              {totalUploaded}
            </div>
            <div>
              <span className="font-semibold">Total Approved Points:</span>{" "}
              {totalApproved}
            </div>
          </div>

          {/* Column 3 - Signature */}
          <div className="border-2 border-dotted border-green-400 p-2 rounded flex items-center justify-center bg-white">
            <img
              src="https://www.shutterstock.com/image-vector/signature-vector-hand-drawn-autograph-600nw-2387543207.jpg"
              alt="Signature"
              className="max-h-20 max-w-full object-contain"
              style={{ aspectRatio: "auto", margin: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Year-wise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(studentData.points).map(([year, data]) => (
          <div key={year} className="bg-red-100 rounded-lg shadow p-4 text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{year}</h3>
            <p className="text-sm text-gray-700">
              <strong>Uploaded:</strong> {data.uploaded}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Approved:</strong> {data.approved}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetail;
