import { FileUpload } from "@/api";
import { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import type { Institute } from "../types/superadminType";
import CloseIcon from "../CloseIcon";

type StudentPointsByYear = {
  uploaded: number;
  approved: number;
};

type StudentData = {
  name: string;
  roll_no: string;
  mobile_no: string;
  signature: string | null;
  admission_year: number;
  email: string;
  institute: Institute;
  current_year: number;
  points: {
    "1st Year": StudentPointsByYear;
    "2nd Year": StudentPointsByYear;
    "3rd Year": StudentPointsByYear;
    "4th Year": StudentPointsByYear;
  };
};
type ChildProps = {
  student: any;
  onYearSelect: (year: string) => void;
};

const StudentDetail: React.FC<ChildProps> = (student: any) => {
  const signatureRef = useRef<HTMLInputElement | null>(null);
  const [studentData, setStudentData] = useState<StudentData>();
  useEffect(() => {
    setStudentData(student.student);
  }, [student]);
  //console.log("student data apo::", student.student);

  const totalUploaded = Object.values(studentData?.points || {}).reduce(
    (acc, year) => acc + (year?.uploaded || 0),
    0
  );

  const totalApproved = Object.values(studentData?.points || {}).reduce(
    (acc, year) => acc + (year?.approved || 0),
    0
  );

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const handleSignatureUpload = async () => {
    const formData = new FormData();
    formData.append("signature", signatureFile ?? new Blob());

    await FileUpload("student/uploadSignature", formData).then((res) => {
      console.log("res in upload==>>", res);
    });
  };

  /*  const handleClick=(year:any)=>{
console.log("year=>>",year)
  } */

  return (
    <div className="p-4 max-w-5xl mx-auto  dark:bg-gray-900 min-h-screen">
      {/* Student Info */}
      <div className=" dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8 border">
        <h2 className="text-2xl font-semibold mb-6 t  pb-2 flex gap-0.5 ">
          <FaGraduationCap className="mt-1" /> Student Profile
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-gray-800 dark:text-white">
          {/* Column 1 */}
          <div className="space-y-3 ">
            <div>
              <span className="font-semibold">Name:</span> {studentData?.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {studentData?.email}
            </div>
            <div>
              <span className="font-semibold">Roll No:</span>{" "}
              {studentData?.roll_no}
            </div>
            <div>
              <span className="font-semibold">Institute:</span>{" "}
              {studentData?.institute?.name}
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3 ">
            <div>
              <span className="font-semibold">Phone:</span>{" "}
              {studentData?.mobile_no}
            </div>
            <div>
              <span className="font-semibold">Total Uploaded Points:</span>{" "}
              {totalUploaded}
            </div>
            <div>
              <span className="font-semibold">Total Approved Points:</span>{" "}
              {totalApproved}
            </div>
            <div>
              <span className="font-semibold">Code:</span>{" "}
              {studentData?.institute?.institute_code}
            </div>
          </div>

          {/* Column 3 - Signature */}
          <div className="flex flex-col items-center md:items-end gap-3 mt-[-20px]">
            {/* Signature Preview Box */}
            <div
              className="border-1 border-dotted border-gray-400 p-2 rounded  shadow-sm"
              style={{ height: "100px", width: "300px" }}
            >
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <button
                    onClick={() => {
                      setPreviewUrl(null);
                      setSignatureFile(null);
                      if (signatureRef.current) {
                        signatureRef.current.value = "";
                      }
                    }} // your function to clear preview
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black transition"
                    title="Remove Image"
                  >
                    <CloseIcon size={16} />
                  </button>
                  <img
                    src={previewUrl}
                    alt="Signature Preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : studentData?.signature ? (
                <img
                  src={studentData.signature}
                  alt="Signature"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  Please Upload Signature
                </div>
              )}
            </div>

            {/* Upload Input + Button */}

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <input
                id="signatureUpload"
                type="file"
                ref={signatureRef}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  if (file) {
                    const maxSizeMB = 1;
                    const maxSizeBytes = maxSizeMB * 1024 * 1024;

                    if (file.size > maxSizeBytes) {
                      alert(`File size should not exceed ${maxSizeMB} MB`);
                      e.target.value = ""; // reset input
                      return;
                    }

                    setSignatureFile(file);
                    setPreviewUrl(URL.createObjectURL(file)); // preview without upload
                  }
                }}
                className="text-sm text-gray-500
                 file:bg-gray-600
                  file:text-gray-300 file:rounded-l 
                  file:px-4 file:py-1 file:border-0 
                  file:cursor-pointer bg-gray-200 dark:bg-gray-700 rounded 
                    p-0 w-full sm:w-auto"
              />

              <button
                type="button"
                onClick={handleSignatureUpload}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-4 py-1 rounded shadow cursor-pointer"
              >
                Upload
              </button>
            </div>

            {/* {fileError && !signatureFile && (
                                <span className='text-red-500 text-[15px]'>Please Select File!</span>
                            )} */}
          </div>
        </div>
      </div>

      {/* Year-wise Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 cursor-pointer ">
        {Object.entries(studentData?.points || {}).map(([year, data]) => (
          <div key={year}
             onClick={() => handleClick(year)}
            className="bg-white rounded-xl border border-red-300 shadow-sm p-4 text-center hover:shadow-md transition "
          >
            <div className="">
               <h3 className="text-lg font-semibold text-red-700 mb-2">{year}</h3>
            <p className="text-sm text-gray-800">
              <strong>Uploaded:</strong> {data?.uploaded}
            </p>
            <p className="text-sm text-gray-800">
              <strong>Approved:</strong> {data?.approved}
            </p>
            </div>
           
          </div>
        ))}
      </div> */}

      {/* Year-wise Suggestions */}
      <div className="mt-8 bg-white border  dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          🌟 Recommended Activities
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-gray-800">
          {/* First Year */}
          <div className="bg-blue-50 border dark:bg-gray-900  rounded-lg p-4 shadow-sm hover:shadow-md transition ">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              First Year
            </h3>
            <ul className="list-disc pl-5 space-y-1 dark:text-blue-100">
              <li>Enroll in short-term MOOCs (2–4 weeks)</li>
              <li>Participate in Tech Fests or Fresher’s Welcome</li>
              <li>Join college clubs or student chapters</li>
              <li>Attend seminars, workshops, or discussions</li>
              <li>Join Tree Plantation or Blood Donation camps</li>
            </ul>
          </div>

          {/* Second Year */}
          <div className="bg-blue-50 dark:bg-gray-900 border  rounded-lg p-4 shadow-sm hover:shadow-md transition ">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Second Year
            </h3>
            <ul className="list-disc pl-5 space-y-1 dark:text-blue-100">
              <li>Complete 4–8 week MOOCs</li>
              <li>
                Participate in college-level sports or cultural activities
              </li>
              <li>Join rural reporting or relief efforts</li>
              <li>Contribute to Blogs, Wall Magazines</li>
              <li>Attend Entrepreneurship Awareness Workshops</li>
            </ul>
          </div>

          {/* Third Year */}
          <div className="bg-blue-50 border dark:bg-gray-900  rounded-lg p-4 shadow-sm hover:shadow-md transition ">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Third Year
            </h3>
            <ul className="list-disc pl-5 space-y-1 dark:text-blue-100">
              <li>Take 8–12 week MOOCs (NPTEL, SWAYAM)</li>
              <li>Work on Innovative Projects</li>
              <li>Submit technical papers or articles</li>
              <li>Attend yoga or adventure camps</li>
              <li>Visit industries and write reports</li>
            </ul>
          </div>

          {/* Fourth Year */}
          <div className="bg-blue-50 border dark:bg-gray-900  rounded-lg p-4 shadow-sm hover:shadow-md transition ">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Fourth Year
            </h3>
            <ul className="list-disc pl-5 space-y-1 dark:text-blue-100">
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
