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
      <div className="bg-green-100 shadow rounded-lg p-6 mb-6 border border-green-300">

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
          <div key={year} className="bg-red-100 rounded-lg shadow p-4 text-center border border-red-400">
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
      {/* Year-wise Suggestions */}
      <div className="mt-8 bg-yellow-50 border border-blue-200 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-6 text-center">~: Recommended Activities :~</h2>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-gray-800">
          {/* First Year */}
          <div className="bg-white border border-blue-300 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">First Year</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enroll in short-term MOOCs (2–4 weeks)</li>
              <li>Participate in Tech Fests or Fresher’s Welcome as a volunteer or participant</li>
              <li>Join college clubs or student chapters</li>
              <li>Attend seminars, workshops, or group discussions</li>
              <li>Participate in Tree Plantation or Blood Donation camps</li>
            </ul>
          </div>

          {/* Second Year */}
          <div className="bg-white border border-blue-300 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Second Year</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Complete 4–8 week MOOCs in technical/non-technical areas</li>
              <li>Take part in college-level sports or cultural activities</li>
              <li>Participate in rural reporting or relief activities</li>
              <li>Contribute to Wall Magazine, Blogs, or Photography competitions</li>
              <li>Organize or participate in Entrepreneurship Awareness Workshops</li>
            </ul>
          </div>

          {/* Third Year */}
          <div className="bg-white border border-blue-300 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Third Year</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Take 8–12 week MOOCs (NPTEL, SWAYAM, etc.)</li>
              <li>Start or participate in an Innovative Project beyond curriculum</li>
              <li>Submit research articles or technical papers</li>
              <li>Join trekking, yoga camps, or adventure sports at college/university level</li>
              <li>Visit relevant industries and submit a report</li>
            </ul>
          </div>

          {/* Fourth Year */}
          <div className="bg-white border border-blue-300 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Fourth Year</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Work on high-duration MOOCs (12 weeks / 40 hours)</li>
              <li>Build and submit a business plan or startup prototype</li>
              <li>Publish in external newspapers or magazines</li>
              <li>Participate in state/national level competitions or sports</li>
              <li>Work on community service like animal care, senior citizen support, or training differently abled</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
};

export default StudentDetail;
