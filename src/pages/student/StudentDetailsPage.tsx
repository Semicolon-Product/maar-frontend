import React, { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { Button } from "@/components/ui/button";
/* import InputWithLabel from '@/components/InputWithLabel';
import AllPoints from '@/components/AllPoints';
import NewAllPoint from '@/components/NewAllPoint'; */
import StudentYearlyDetails from "@/components/StudentComponent/StudentYearlyDetails";
//import { studentdata } from '@/components/data/data';
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
    <div className="flex h-[100vh] overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col bg-gray-800 text-white w-64 px-2 pt-2 h-screen sticky top-0">
        <div className="flex-1 overflow-y-auto">
          {studentDetails && (
            <SidebarContent
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              student={studentDetails}
            />
          )}
        </div>
        <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-400">
          © {new Date().getFullYear()} Abc Pvt Ltd
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="flex absolute inset-0 bg-gray-900 text-white w-64 pt-2 md:hidden top-0 h-screen z-[999] flex-col">
          {/* Scrollable menu */}
          <div className="flex-1 overflow-y-auto px-2">
            {studentDetails && (
              <SidebarContent
                onClose={() => setIsSidebarOpen(!isSidebarOpen)}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                student={studentDetails}
              />
            )}
          </div>

          {/* Footer */}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto dark:bg-gray-900 ">
        {/* Top bar with menu icon */}
        <div className="flex justify-end p-0 pb-0">
          <Button
            className="text-black bg-transparent hover:bg-gray-100 md:hidden block"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <IoReorderThree className="text-xl scale-150" />
          </Button>
        </div>

        <div className="p-0  mt-0">
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
                data={studentdata?.firstyear}
                currentyear={studentDetails?.current_year}
                year={1}
              />
            </div>
          )}
          {selectedYear === "2nd" && (
            <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
              <StudentYearlyDetails
                data={studentdata?.secondyear}
                currentyear={studentDetails?.current_year}
                year={2}
              />
            </div>
          )}
          {selectedYear === "3rd" && (
            <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
              <StudentYearlyDetails
                data={studentdata?.thirdyear}
                currentyear={studentDetails?.current_year}
                year={3}
              />
            </div>
          )}
          {selectedYear === "4th" && (
            <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
              <StudentYearlyDetails
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
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-lg rounded-r-2xl overflow-hidden transition-all duration-300">
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
      <div className="flex items-center justify-between mt-auto px-5 py-3 border-t border-gray-300 dark:border-gray-700">
        <span className="text-sm font-medium">Theme</span>
        <ThemeToggleSwitch />
      </div>

      {/* Footer */}
      <div className="text-center text-xs py-3 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
        © {new Date().getFullYear()} Student Portal
      </div>
    </div>
  );
};

export default StudentDetails;
