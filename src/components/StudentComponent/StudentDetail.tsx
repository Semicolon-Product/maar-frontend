import React from "react";
import { FaGraduationCap } from "react-icons/fa";

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
  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    // Preview or upload logic here
  };


  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      {/* Student Info */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8 border border-green-300">
        <h2 className="text-2xl font-semibold mb-6 text-green-800 border-b pb-2 flex gap-0.5"><FaGraduationCap className="mt-1" /> Student Profile</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-gray-800">
          {/* Column 1 */}
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Name:</span> {studentData.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {studentData.email}
            </div>
            <div>
              <span className="font-semibold">Roll No:</span> {studentData.rollNo}
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Phone:</span> {studentData.phone}
            </div>
            <div>
              <span className="font-semibold">Total Uploaded Points:</span> {totalUploaded}
            </div>
            <div>
              <span className="font-semibold">Total Approved Points:</span> {totalApproved}
            </div>
          </div>

          {/* Column 3 - Signature */}
          <div className="flex flex-col items-center justify-center">
            <div className="border-2 border-dotted border-green-400 p-2 rounded w-full bg-white flex justify-center items-center mb-2">
              <img
                src={studentData.signature || "https://www.shutterstock.com/image-vector/signature-vector-hand-drawn-autograph-600nw-2387543207.jpg"}
                alt="Signature"
                className="max-h-20 object-contain"
                style={{ aspectRatio: "auto" }}
              />
            </div>
            {/* Upload input */}
            <label className="block w-full">
              <span className="text-sm text-gray-600">Upload Signature</span>
              <input
                id="signatureUpload"
                type="file"
                accept="image/*"
                //onChange={(e) => setSignatureFile(e.target.files[0])}
                className="mt-2 w-full md:w-auto text-sm file:bg-green-500 file:text-white file:rounded file:px-4 file:py-1 file:border-0 file:cursor-pointer bg-green-100 rounded border border-green-300 p-1"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Year-wise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(studentData.points).map(([year, data]) => (
          <div key={year} className="bg-white rounded-xl border border-red-300 shadow-sm p-4 text-center hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-red-700 mb-2">{year}</h3>
            <p className="text-sm text-gray-800">
              <strong>Uploaded:</strong> {data.uploaded}
            </p>
            <p className="text-sm text-gray-800">
              <strong>Approved:</strong> {data.approved}
            </p>
          </div>
        ))}
      </div>

      {/* Year-wise Suggestions */}
      <div className="mt-8 bg-white border border-blue-200 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🌟 Recommended Activities</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-gray-800">
          {/* First Year */}
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">First Year</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enroll in short-term MOOCs (2–4 weeks)</li>
              <li>Participate in Tech Fests or Fresher’s Welcome</li>
              <li>Join college clubs or student chapters</li>
              <li>Attend seminars, workshops, or discussions</li>
              <li>Join Tree Plantation or Blood Donation camps</li>
            </ul>
          </div>

          {/* Second Year */}
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Second Year</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Complete 4–8 week MOOCs</li>
              <li>Participate in college-level sports or cultural activities</li>
              <li>Join rural reporting or relief efforts</li>
              <li>Contribute to Blogs, Wall Magazines</li>
              <li>Attend Entrepreneurship Awareness Workshops</li>
            </ul>
          </div>

          {/* Third Year */}
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Third Year</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Take 8–12 week MOOCs (NPTEL, SWAYAM)</li>
              <li>Work on Innovative Projects</li>
              <li>Submit technical papers or articles</li>
              <li>Attend yoga or adventure camps</li>
              <li>Visit industries and write reports</li>
            </ul>
          </div>

          {/* Fourth Year */}
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Fourth Year</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enroll in 12-week MOOCs</li>
              <li>Submit a business plan or prototype</li>
              <li>Publish in national magazines</li>
              <li>Compete in national-level competitions</li>
              <li>Join community outreach like elderly or disabled support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default StudentDetail;
