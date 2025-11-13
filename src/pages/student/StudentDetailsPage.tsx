import React, { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import StudentYearlyDetails from "@/components/StudentComponent/StudentYearlyDetails";
import { LogOut } from "lucide-react";
import { FaGraduationCap } from "react-icons/fa";
import { BookOpen, User2, CalendarCheck2, GraduationCap } from "lucide-react";
import StudentDetail from "@/components/StudentComponent/StudentDetail";
import { getApi } from "@/api";
import { useNavigate } from "react-router-dom";
import type {
  StudentResponseofGetDetails,
  YearWiseActivityStructure,
} from "@/components/types/superadminType";
import { motion } from "framer-motion";
import ThemeToggleSwitch from "@/components/ThemeToggleButton";
interface SidebarContentProps {
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  student: StudentResponseofGetDetails;
  onClose?: () => void;
}

const StudentDetails = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("details");
  const [studentdata, setStudentData] = useState<YearWiseActivityStructure>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [studentDetails, setStudentDetails] =
    useState<StudentResponseofGetDetails>();

  const getProfileDetails = async () => {
    await getApi("student/getDetails").then((res) => {
      //console.log(" res in get student::", res)
      setStudentDetails(res?.data);
    });
  };

  const getActivityDetails = async () => {
    await getApi("student/getActivityDetails").then((res) => {
      //console.log("res activity details::", res)
      setStudentData(res?.data?.studentData);
    });
  };

  useEffect(() => {
    getActivityDetails();
    getProfileDetails();
  }, []);

  if (selectedYear === "logout") {
    localStorage.removeItem("token");
    navigate("/");
  }
  //console.log(studentDetails)
  //console.log("activity detail ", studentdata)
  console.log("selectedYear", selectedYear);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white w-72 h-screen shadow-xl">
        <div className="flex-1 overflow-y-auto">
          {studentDetails && (
            <SidebarContent
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              student={studentDetails}
            />
          )}
        </div>
        <div className="text-center text-xs text-blue-200 py-4 bg-blue-800/50">
          © {new Date().getFullYear()} Makautins
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[999] md:hidden">
          <div
            className="absolute inset-0 bg-black/50 "
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="relative flex flex-col bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white w-72 h-screen shadow-2xl">
            <div className="flex-1 overflow-y-auto">
              {studentDetails && (
                <SidebarContent
                  onClose={() => setIsSidebarOpen(!isSidebarOpen)}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  student={studentDetails}
                />
              )}
            </div>
            <div className="text-center text-xs text-blue-200 py-4 bg-blue-800/50">
              © {new Date().getFullYear()} Makautins
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 shadow-inner">
        {/* Top bar with menu icon */}
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900  dark:border-gray-700">
          {/* <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Student Dashboard
          </h1> */}
          <Button
            className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden block rounded-full p-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <IoReorderThree className="text-xl" />
          </Button>
        </div>

        <div className="p-6">
          {/* <p>You are in {selectedYear} year</p> */}

          {selectedYear === "details" && (
            <div>
              <StudentDetail
                student={studentDetails}
                onYearSelect={(year) => setSelectedYear(year)}
              />
            </div>
          )}

          {selectedYear === "1st" && (
            <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
              <StudentYearlyDetails
                student={studentDetails}
                data={studentdata?.firstyear}
                currentyear={studentDetails?.current_year}
                year={1}
              />
            </div>
          )}
          {selectedYear === "2nd" && (
            <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
              <StudentYearlyDetails
                student={studentDetails}
                data={studentdata?.secondyear}
                currentyear={studentDetails?.current_year}
                year={2}
              />
            </div>
          )}
          {selectedYear === "3rd" && (
            <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
              <StudentYearlyDetails
                student={studentDetails}
                data={studentdata?.thirdyear}
                currentyear={studentDetails?.current_year}
                year={3}
              />
            </div>
          )}
          {selectedYear === "4th" && (
            <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
              <StudentYearlyDetails
                student={studentDetails}
                data={studentdata?.fourthyear}
                currentyear={studentDetails?.current_year}
                year={4}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({
  selectedYear,
  setSelectedYear,
  student,
  onClose,
}) => {
  const yearItems = [
    { id: "details", label: "Details", icon: User2 },
    { id: "1st", label: "First Year", icon: BookOpen },
    { id: "2nd", label: "Second Year", icon: CalendarCheck2 },
    { id: "3rd", label: "Third Year", icon: GraduationCap },
    { id: "4th", label: "Fourth Year", icon: FaGraduationCap },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  return (
    <div
      className="flex flex-col h-full bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-lg rounded-r-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='12' height='24' viewBox='0 0 12 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.6'%3E%3Cpath d='M2 0h2v12H2V0zm1 20c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM9 8c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-1 4h2v12H8V12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundBlendMode: "overlay", // ensures transparency blends with bg color
      }}
    >
      {" "}
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center space-x-3 p-5 
                   bg-gradient-to-r from-blue-600 to-blue-500 
                   dark:from-blue-700 dark:to-blue-600"
      >
        {/* Student Avatar + Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img
              src="https://github.com/shadcn.png"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-white font-semibold text-base sm:text-lg">
              {student?.name || "Student"}
            </h2>
            <p className="text-blue-100 text-sm truncate max-w-[160px]">
              {student?.roll_no || "Roll No: ----"}
            </p>
          </div>
        </div>

        {/* ❌ Close Button (Top-Right, Mobile Only) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:hidden text-white hover:bg-blue-700/70 p-1.5 rounded-full transition"
          aria-label="Close Sidebar"
        >
          {/* SVG Cross Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
      {/* Sidebar Menu */}
      <ul className="flex-1 px-3 py-4 space-y-1">
        {yearItems.map(({ id, label, icon: Icon }) => (
          <motion.li
            key={id}
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedYear(id)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
              selectedYear === id
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-blue-100 dark:hover:bg-gray-800"
            }`}
          >
            <Icon
              size={18}
              className={`${
                selectedYear === id
                  ? "text-white"
                  : "text-blue-600 dark:text-gray-300"
              }`}
            />
            <span className="uppercase text-sm tracking-wide">{label}</span>
          </motion.li>
        ))}
      </ul>
      {/* Theme Switch */}
      <div className="flex items-center justify-between mt-auto px-5 py-3   dark:border-gray-700">
        <span className="text-sm font-medium">Theme</span>
        <ThemeToggleSwitch />
      </div>
    </div>
  );
};

export default StudentDetails;
