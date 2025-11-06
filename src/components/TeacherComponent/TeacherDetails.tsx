import { useEffect, useRef, useState } from "react";
import { FaChalkboardTeacher, FaCloudUploadAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getApi, postApi } from "@/api";
import type {
  StudentYearData,
  StudentYearDataArray,
  Teacher,
  YearlyStudentData,
} from "../types/superadminType";
import { useToast } from "@/contexts/ToastContext";
import { MdOutlineSaveAlt } from "react-icons/md";
import { Trash } from "lucide-react";
import CloseIcon from "../CloseIcon";

const TeacherDetails = (teacherDetails: any) => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const signatureRef = useRef<HTMLInputElement | null>(null);
  const [teacherDataApi, setTeacherDataApi] = useState<Teacher>();
  const [studentData, setStudentData] = useState<StudentYearDataArray>();
  const [year, setYear] = useState("");
  useEffect(() => {
    setTeacherDataApi(teacherDetails?.data?.teacher);
    setStudentData(teacherDetails?.data?.studentData);
  }, [teacherDetails]);

  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    mobileNo: "",
    year: "",
  });

  const [students, setStudents] = useState<YearlyStudentData>();
  const handleDownloadTemplate = () => {
    const csvHeaders = ["Name,Email,Mobile_No,University_Roll_No"];
    const csvContent = csvHeaders.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "student_template_csv.csv";
    link.click();
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitStudent = async (e: any) => {
    e.preventDefault();
    await postApi("student/create", formData)
      .then((res) => {
        console.log("res in create", res);
        toast.success(res?.message);
        getAllStudent();
      })
      .catch((err) => {
        console.log("Error creating student:", err.response.data.error);
        toast.error(err.response.data.error);
      });
  };

  const getAllStudent = async () => {
    await getApi("student/getAllStudents").then((res) => {
      setStudents(res?.data);
    });
  };
  useEffect(() => {
    getAllStudent();
  }, []);

  const [selectedYear, setSelectedYear] = useState<string>("");

  // Extract years from object keys like 1, 2, 3, 4
  const availableYears = Object.keys(students ?? {}).sort(
    (a: any, b: any) => a - b
  );

  // Optional: convert 1 → 1st Year, 2 → 2nd Year, etc.
  const formatYear = (year: number) => {
    const suffix = ["th", "st", "nd", "rd", "th"];
    const v = year % 100;
    return `${year}${suffix[(v - 20) % 10] || suffix[v] || suffix[0]} Year`;
  };

  const [fileError, setFileError] = useState(false);
  const handleSignatureUpload = async () => {
    if (!signatureFile) {
      setFileError(true);
      return;
    }
    console.log("signatureFile==>>>>", signatureFile);

    const formData = new FormData();
    formData.append("signature", signatureFile); // field name must match multer's .single('signature')

    /* await FileUpload("teacher/uploadSignature", formData).then((res) => {
      console.log("res of upload==>>", res);
    }); */
  };
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleRemoveRow = (index: number) => {
    setCsvData((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Parse CSV manually ---
  const parseCSV = (text: string) => {
    // Detect delimiter automatically (comma or tab)
    const firstLine = text.split("\n")[0];
    const delimiter = firstLine.includes("\t") ? "\t" : ",";

    const lines = text.trim().split("\n");

    // Helper function to split CSV safely (handles quoted values)
    const splitCSVLine = (line: string) => {
      const result: string[] = [];
      let current = "";
      let insideQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === delimiter && !insideQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result.map((v) => v.replace(/^"|"$/g, "")); // remove outer quotes
    };

    // Read headers and normalize them
    const headers = splitCSVLine(lines[0]).map((h) => h.trim().toLowerCase());

    // Expected headers
    const expectedHeaders = [
      "name",
      "email",
      "university_roll_no",
      "mobile_no",
    ];

    // Validate headers
    const missingHeaders = expectedHeaders.filter((h) => !headers.includes(h));
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(", ")}`);
    }

    // Parse each line into an object
    const rows = lines.slice(1).map((line) => {
      const values = splitCSVLine(line);
      const row: Record<string, string> = {
        Name: "",
        Email: "",
        University_Roll_No: "",
        Mobile_No: "",
      };

      headers.forEach((header, i) => {
        const normalized = header.replace(/\s|_/g, "").toLowerCase();
        const value = values[i]?.trim() || "";

        if (normalized === "name") row.Name = value;
        if (normalized === "email") row.Email = value;
        if (normalized === "universityrollno") row.University_Roll_No = value;
        if (normalized === "mobileno" || normalized === "mobile") {
          const mobile = value.replace(/\D/g, ""); // remove non-digits
          row.Mobile_No = mobile ? `+91${mobile}` : "";
        }
      });

      return row;
    });

    return rows;
  };

  const handleExcelFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      setCsvData(parsed);
      setShowModal(true);
    };
    reader.readAsText(file);
  };
  const handleImportCsvData = async () => {
    try {
      console.log("csv", csvData);
      console.log("currentYear", year);

      if (!year) {
        toast.error("Please select a year before importing.");
        return;
      }

      if (!csvData || csvData.length === 0) {
        toast.error("No CSV data found to import.");
        return;
      }

      // Convert CSV data to your desired format
      const formattedData = csvData.map((item) => ({
        email: item.Email?.trim() || "",
        mobileNo: item.Mobile_No?.trim() || "",
        name: item.Name?.trim() || "",
        rollNo: item.University_Roll_No?.trim() || "",
        year: year,
      }));

      // API call
      const res = await postApi("student/create/many", formattedData);
      toast.success("Students imported successfully!");
      console.log("res in many", res);
    } catch (error) {
      console.error("Error importing students:", error);

      toast.error("Failed to import students.");
    } finally {
      // ✅ reset state and close modal
      setCsvData([]);
      setShowModal(false); // assuming your modal visibility is managed by this state
    }
  };

  return (
    <div>
      <div className="p-4 space-y-8  min-h-screen">
        {/* Teacher Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto ">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex gap-1">
            <FaChalkboardTeacher className="mt-2 " /> Teacher Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2  items-center ">
            {/* Column 1: Teacher Info */}
            <div className="space-y-2 ">
              <p>
                <strong>Name:</strong> {teacherDataApi?.name}
              </p>
              <p>
                <strong>Email:</strong> {teacherDataApi?.email}
              </p>
              <p>
                <strong>Department:</strong> {teacherDataApi?.department}
              </p>
            </div>
            <img
              src="https://student-teacher-new.s3.ap-south-1.amazonaws.com/students/12/2024/45/docs/1st/21b9572c-9cfe-43e2-970a-2cf89e399c84-PASSPORT.jpeg"
              alt="Signature"
              className="h-full w-full object-contain"
            />

            {/* Column 2: Signature */}
            <div className="flex flex-col items-center md:items-end gap-3">
              {/* Signature Preview Box */}
              <div
                className="border-2 border-dotted border-blue-400 p-2 rounded shadow-sm relative flex items-center justify-center"
                style={{ height: "100px", width: "300px" }}
              >
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    {/* Close Icon */}
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

                    {/* Image Preview */}
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-contain rounded"
                    />
                  </div>
                ) : teacherDataApi?.signature ? (
                  <img
                    src={teacherDataApi.signature}
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
                  ref={signatureRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    //const file = e.target.files[0] ?? null;
                    const file = e.target.files?.[0] ?? null;

                    if (file) {
                      setSignatureFile(file);
                      setPreviewUrl(URL.createObjectURL(file)); // preview without upload
                    }
                  }}
                  className="text-sm file:bg-blue-300 dark:file:bg-blue-800 file:rounded-l file:px-4 file:py-1 file:border-0 file:cursor-pointer bg-blue-100 dark:bg-blue-900 rounded border border-blue-300 p-0 w-full sm:w-auto"
                />

                <button
                  type="button"
                  onClick={handleSignatureUpload}
                  className="bg-blue-600 hover:bg-blue-700  text-sm px-4 py-1 rounded shadow"
                >
                  Upload
                </button>
              </div>
              {fileError && !signatureFile && (
                <span className="text-red-500 text-[15px]">
                  Please Select File!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Student Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto ">
          {studentData?.map((item: StudentYearData, index: number) => (
            <div
              key={index}
              className="bg-blue-50 dark:bg-gray-800 rounded-xl shadow p-4 text-center space-y-2 "
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-blue-100">
                {item.year}
              </h3>
              <p className="text-2xl font-bold text-blue-700">{item.count}</p>
              <p className="text-sm text-green-500 font-semibold">
                Submitted: {item.submit}
              </p>
              <p className="text-sm text-red-500 font-semibold">
                Remaining: {item.remain}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto  transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-400 flex gap-2">
            <FaCloudUploadAlt className="mt-1" /> Upload Student Data
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Instruction Panel */}
            <div className="bg-red-50 dark:bg-gray-800 border border-red-300 dark:border-gray-700 p-4 rounded-md text-sm text-gray-800 dark:text-gray-200 md:w-2/5">
              <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                Excel File Format:
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Allowed formats: <strong>.csv</strong>
                </li>
                <li>
                  Headers must be:
                  <ul className="ml-4 list-disc">
                    <li>
                      <code>Name</code>
                    </li>
                    <li>
                      <code>Email</code>
                    </li>
                    <li>
                      <code>University_Roll_No</code>
                    </li>
                    <li>
                      <code>Mobile_No</code>
                    </li>
                  </ul>
                </li>
                <li>Each student in a new row.</li>
                <li>No blank required fields.</li>
                <li>Check email & mobile formats.</li>
              </ul>
            </div>

            {/* Right Form Section */}
            <form className="flex flex-col gap-4 md:w-3/5">
              <span
                className="text-sm font-medium w-fit text-red-700 hover:text-red-500 dark:text-red-400 dark:hover:text-red-500 mb-1 cursor-pointer inline "
                onClick={handleDownloadTemplate}
              >
                📥 Download Template CSV File
              </span>

              {/* Year Selection */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Select Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  id="year"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-red-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-red-400 transition"
                >
                  <option value="">--Select--</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label
                  htmlFor="fileUpload"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Upload Excel File
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleExcelFileSelect}
                  accept=".csv"
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-red-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-red-400 transition cursor-pointer"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-md py-2 transition"
              >
                <MdOutlineSaveAlt className="text-lg" />
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-4 space-y-4  rounded-xl">
          <h4
            className="
            font-semibold tracking-tight
            text-gray-900 dark:text-gray-100
            bg-clip-text
            transition-colors duration-200
          "
          >
            Create Student — Individual
          </h4>
          <form
            onSubmit={handleSubmitStudent}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border text-gray-800 dark:text-gray-100 p-2 rounded w-full bg-white dark:bg-gray-800"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border text-gray-800 dark:text-gray-100 p-2 rounded w-full bg-white dark:bg-gray-800"
              required
            />
            <input
              type="text"
              name="rollNo"
              placeholder="University Roll No"
              value={formData.rollNo}
              onChange={handleChange}
              className="border text-gray-800 dark:text-gray-100 p-2 rounded w-full bg-white dark:bg-gray-800"
              required
            />
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile No"
              value={formData.mobileNo}
              onChange={handleChange}
              className="border text-gray-800 dark:text-gray-100 p-2 rounded w-full bg-white dark:bg-gray-800"
              required
            />
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border p-2 text-gray-800 dark:text-gray-100 rounded w-full bg-white dark:bg-gray-800"
              required
            >
              <option value="">Select Current Year</option>
              <option value="1">1st Year </option>
              <option value="2">2nd Year </option>
              <option value="3">3rd Year </option>
              <option value="4">4th Year </option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              Save
            </button>
          </form>

          {availableYears.length > 0 && (
            <div className="flex justify-end mb-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border p-2 rounded bg-white dark:bg-gray-800"
              >
                <option value="">Select Year</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {formatYear(parseInt(year))}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedYear && students?.[selectedYear] && (
            <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm md:text-base text-left text-gray-700 dark:text-gray-300">
                <thead className="bg-blue-900 dark:bg-blue-800 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Roll No</th>
                    <th className="px-4 py-3 font-semibold">Mobile No</th>
                    <th className="px-4 py-3 font-semibold">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {students[selectedYear]?.map((student, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "bg-gray-50 dark:bg-gray-800"
                          : "bg-white dark:bg-gray-700"
                      } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                    >
                      <td className="px-4 py-3">{student.name}</td>
                      <td className="px-4 py-3">{student.email}</td>
                      <td className="px-4 py-3">{student.roll_no}</td>
                      <td className="px-4 py-3">{student.mobile_no}</td>
                      <td className="px-4 py-3">{student.admission_year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-11/12 max-w-5xl p-5 transition-all"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
                Imported CSV Data
              </h2>

              {/* Table */}
              <div className="overflow-auto max-h-96 rounded-lg">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                    <tr className="uppercase text-gray-700 dark:text-gray-300">
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">University_Roll_No</th>
                      <th className="px-4 py-2">Mobile_No</th>
                      <th className="px-4 py-2">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-700/30 hover:bg-gray-700/10  transition"
                      >
                        <td className="px-4 py-2">{idx + 1}</td>
                        <td className="px-4 py-2">{row.Name}</td>
                        <td className="px-4 py-2">{row.Email}</td>
                        <td className="px-4 py-2 truncate max-w-[200px]">
                          {row.University_Roll_No}
                        </td>
                        <td className="px-4 py-2 truncate max-w-[200px]">
                          {row.Mobile_No}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <button
                            onClick={() => handleRemoveRow(idx)}
                            className="cursor-pointer"
                            title="Remove"
                          >
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end mt-5 gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setCsvData([]);
                  }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Close
                </button>
                <button
                  onClick={handleImportCsvData}
                  disabled={csvData.length === 0}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition"
                >
                  Import
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherDetails;
