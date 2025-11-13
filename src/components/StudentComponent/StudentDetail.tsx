import { FileUpload, handleDeleteFile, postApi } from "@/api";
import { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import type { Institute } from "../types/superadminType";
import CloseIcon from "../CloseIcon";
import { useToast } from "@/contexts/ToastContext";
import { motion } from "framer-motion";

type StudentPointsByYear = {
  uploaded: number;
  approved: number;
};

type StudentData = {
  id: string;
  name: string;
  teacher_id: string;
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
  const toast = useToast();
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
  //const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    key: string;
  } | null>(null);
  const handleSignatureUpload = async () => {
    try {
      await postApi("student/upload-signature", {
        signature: uploadedFile?.url,
        admissionYear: studentData?.admission_year,
        teacherId: studentData?.teacher_id,
      }).then((res) => {
        //console.log(res);
        if (res?.success === true) toast.success(res?.message);
      });
    } catch (error) {}
  };
  const fileUploadtoS3 = async (file: any) => {
    if (file) {
      await FileUpload("signature?type=student", {
        file,
        teacherId: studentData?.id,
      }).then((res) => {
        //console.log("res=>>", res);
        setUploadedFile({ url: res.fileUrl, key: res.key });
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto dark:bg-gray-900 min-h-screen">
      {/* Student Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 md:p-6 mb-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800 dark:text-blue-400 pb-2 flex items-center gap-2">
          <FaGraduationCap className="text-3xl" />
          <span>Student Profile</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm md:text-base text-gray-800 dark:text-gray-300">
          {/* Column 1 */}
          <div className="space-y-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 shadow-md">
            <div>
              <span className="font-semibold text-blue-800 dark:text-blue-300">
                Name:
              </span>{" "}
              <span className="text-gray-900 dark:text-white">
                {studentData?.name}
              </span>
            </div>
            <div>
              <span className="font-semibold text-blue-800 dark:text-blue-300">
                Email:
              </span>{" "}
              <span className="text-gray-900 dark:text-white break-all">
                {studentData?.email}
              </span>
            </div>
            <div>
              <span className="font-semibold text-blue-800 dark:text-blue-300">
                Roll No:
              </span>{" "}
              <span className="text-gray-900 dark:text-white">
                {studentData?.roll_no}
              </span>
            </div>
            <div>
              <span className="font-semibold text-blue-800 dark:text-blue-300">
                Institute:
              </span>{" "}
              <span className="text-gray-900 dark:text-white">
                {studentData?.institute?.name}
              </span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 shadow-md">
            <div>
              <span className="font-semibold text-green-800 dark:text-green-300">
                Phone:
              </span>{" "}
              <span className="text-gray-900 dark:text-white">
                {studentData?.mobile_no}
              </span>
            </div>
            <div>
              <span className="font-semibold text-green-800 dark:text-green-300">
                Total Uploaded Points:
              </span>{" "}
              <span className="text-gray-900 dark:text-white font-bold">
                {totalUploaded}
              </span>
            </div>
            <div>
              <span className="font-semibold text-green-800 dark:text-green-300">
                Total Approved Points:
              </span>{" "}
              <span className="text-gray-900 dark:text-white font-bold">
                {totalApproved}
              </span>
            </div>
            <div>
              <span className="font-semibold text-green-800 dark:text-green-300">
                Code:
              </span>{" "}
              <span className="text-gray-900 dark:text-white">
                {studentData?.institute?.institute_code}
              </span>
            </div>
          </div>

          {/* Column 3 - Signature */}
          <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 shadow-md">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 text-base">
              Signature
            </h3>

            {/* Signature Preview Box */}
            <div
              className="border-2 border-dashed border-purple-300 dark:border-purple-500 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm w-full"
              style={{ height: "120px", maxWidth: "300px" }}
            >
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <button
                    onClick={() => {
                      if (uploadedFile?.key)
                        handleDeleteFile(uploadedFile?.key);
                      setPreviewUrl(null);
                      // setSignatureFile(null);
                      if (signatureRef.current) {
                        signatureRef.current.value = "";
                      }
                      setUploadedFile(null);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition z-10"
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
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm text-center">
                  Please Upload Signature
                </div>
              )}
            </div>

            {/* Upload Input + Button */}
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
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

                    //setSignatureFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                    fileUploadtoS3(file);
                  }
                }}
                className="text-sm text-gray-500 dark:text-gray-400
                 file:bg-purple-600 file:hover:bg-purple-700
                  file:text-white file:rounded-l file:font-semibold
                  file:px-4 file:py-1.5 file:border-0 
                  file:cursor-pointer bg-gray-200 dark:bg-gray-700 rounded 
                  file:transition-colors p-0 w-full"
              />

              <button
                type="button"
                onClick={handleSignatureUpload}
                disabled={!uploadedFile?.url}
                className={`text-sm px-4 py-1.5 rounded shadow font-semibold transition-all whitespace-nowrap ${
                  uploadedFile?.url
                    ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer hover:shadow-lg"
                    : "bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                Upload
              </button>
            </div>

            {/* {fileError && !signatureFile && (
                                <span className='text-red-500 text-[15px]'>Please Select File!</span>
                            )} */}
          </div>
        </div>
      </motion.div>

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2  md:p-4 border border-gray-100 dark:border-gray-700"
      >
        <h2 className=" whitespace-nowrap sm:text-2xl md:text-3xl text-xl   font-bold text-blue-800 dark:text-blue-400 mb-2 md:mb-6 text-center flex items-center justify-center ">
          <span className="">🌟</span>
          Recommended Activities
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300">
          {/* First Year */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 border border-blue-200 dark:border-gray-600 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              First Year
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Enroll in short-term MOOCs (2–4 weeks)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Participate in Tech Fests or Fresher's Welcome</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Join college clubs or student chapters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Attend seminars, workshops, or discussions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Join Tree Plantation or Blood Donation camps</span>
              </li>
            </ul>
          </motion.div>

          {/* Second Year */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 border border-green-200 dark:border-gray-600 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              Second Year
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Complete 4–8 week MOOCs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  Participate in college-level sports or cultural activities
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Join rural reporting or relief efforts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Contribute to Blogs, Wall Magazines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Attend Entrepreneurship Awareness Workshops</span>
              </li>
            </ul>
          </motion.div>

          {/* Third Year */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 border border-purple-200 dark:border-gray-600 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              Third Year
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Take 8–12 week MOOCs (NPTEL, SWAYAM)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Work on Innovative Projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Submit technical papers or articles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Attend yoga or adventure camps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Visit industries and write reports</span>
              </li>
            </ul>
          </motion.div>

          {/* Fourth Year */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 border border-indigo-200 dark:border-gray-600 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Fourth Year
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Enroll in 12-week MOOCs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Submit a business plan or prototype</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Publish in national magazines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Compete in national-level competitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>
                  Join community outreach like elderly or disabled support
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDetail;
