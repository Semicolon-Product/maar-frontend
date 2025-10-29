import React, { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";

import TeacherVerifyTable from "@/components/TeacherComponent/TeacherVerifyTable";
import TeacherDetails from "@/components/TeacherComponent/TeacherDetails";

//import { allStudentDetails } from "@/components/data/data";
import { GraduationCap, LayoutDashboard, LogOut } from "lucide-react";
//import { studentdata } from "@/components/data/data";
import { getApi } from "@/api";
import { useNavigate } from "react-router-dom";
import type {
  BackendStudentDetails,
  teacherGetDetails,
  TeacherSideBarProps,
} from "@/components/types/superadminType";
import ThemeToggleSwitch from "@/components/ThemeToggleButton";
import { AnimatePresence, motion } from "framer-motion";

interface SidebarContentProps {
  data?: TeacherSideBarProps;
  selectedSection: string;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
}

const TeacherPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [backendAllStudentDetails, setBackendAllStudentDetails] =
    useState<BackendStudentDetails>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getTeacherDetails();
    getAllYearStudentDetails();
  }, []);
  const [teacherDetails, setTeacherDetails] = useState<teacherGetDetails>();
  const getTeacherDetails = async () => {
    await getApi("teacher/getDetails").then((res) => {
      setTeacherDetails(res.data);
    });
  };

  const getAllYearStudentDetails = async () => {
    await getApi("student/getYearlyDetails").then((res) => {
      setBackendAllStudentDetails(res);
      //console.log("get student details",res);
    });
  };
  if (selectedSection === "logout") {
    localStorage.removeItem("token");
    navigate("/");
  }
  //console.log("in page ::",teacherDetails)
  console.log(
    "backendAllStudentDetails",
    backendAllStudentDetails?.teacherSignature
  );
  console.log("teacjer deital::", teacherDetails);

  return (
    <div className="flex h-screen overflow-hidden bg-blue-100/70 dark:bg-gray-900 dark:bg-[url('https://imapro.in/bahrain/global/bg.svg')] dark:bg-cover dark:bg-center dark:bg-fixed transition-colors duration-500">
      <div className="hidden md:block bg-gray-800 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto shadow-lg shadow-black/20">
        <SidebarContent
          data={teacherDetails?.teacher}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>

      {/* ✅ Sidebar for Mobile (Dynamic + Animated) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Background overlay (click to close) */}
            <motion.div
              className="fixed inset-0 bg-black/60  z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar Slide-in Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed top-0 left-0 z-[999] w-72 h-full 
                   bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
                   shadow-2xl flex flex-col rounded-r-2xl overflow-y-auto"
            >
              {/* Top: Profile Header + Close Button */}

              {/* Sidebar Menu Items */}
              <SidebarContent
                onClose={() => setIsSidebarOpen(!isSidebarOpen)}
                data={teacherDetails?.teacher}
                selectedSection={selectedSection}
                setSelectedSection={(section) => {
                  setSelectedSection(section);
                  setIsSidebarOpen(false); // ✅ close sidebar when a section is clicked (mobile UX)
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar: h2 on left, menu icon on right */}
        <div className="flex items-center justify-between px-4 pt-4 pb-0">
          {/* Sidebar Toggle (Mobile Only) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 
                 dark:from-gray-800 dark:to-gray-700 shadow-sm 
                 hover:shadow-md transition-all duration-300 
                 hover:scale-105 active:scale-95"
              aria-label="Toggle Sidebar"
            >
              <IoReorderThree className="text-2xl text-gray-700 dark:text-gray-100" />
            </button>
          </div>

          {/* Dynamic Page Title */}
          {selectedSection && selectedSection !== "dashboard" && (
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg md:text-2xl font-semibold tracking-wide 
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 bg-clip-text text-transparent select-none
                 drop-shadow-sm px-3 py-1 rounded-md"
            >
              {selectedSection === "first" && "First Year Student Data"}
              {selectedSection === "second" && "Second Year Student Data"}
              {selectedSection === "third" && "Third Year Student Data"}
              {selectedSection === "four" && "Fourth Year Student Data"}
            </motion.h2>
          )}
        </div>

        {/* Content */}
        <div className="p-0">
          <div className="mt-0">
            {selectedSection === "dashboard" && (
              <TeacherDetails data={teacherDetails} />
            )}

            {selectedSection === "first" && (
              <TeacherVerifyTable
                data={backendAllStudentDetails?.firstYear}
                signature={backendAllStudentDetails?.teacherSignature}
              />
            )}

            {selectedSection === "second" && (
              <TeacherVerifyTable
                data={backendAllStudentDetails?.secondYear}
                signature={backendAllStudentDetails?.teacherSignature}
              />
            )}

            {selectedSection === "third" && (
              <TeacherVerifyTable
                data={backendAllStudentDetails?.thirdYear}
                signature={backendAllStudentDetails?.teacherSignature}
              />
            )}

            {selectedSection === "four" && (
              <TeacherVerifyTable
                data={backendAllStudentDetails?.fourthYear}
                signature={backendAllStudentDetails?.teacherSignature}
              />
            )}

            {selectedSection === "logout" && (
              <p className="text-gray-800 dark:text-gray-300 px-4 py-2">
                Logging out...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({
  data,
  selectedSection,
  setSelectedSection,
  onClose,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "first", label: "First Year", icon: GraduationCap },
    { id: "second", label: "Second Year", icon: GraduationCap },
    { id: "third", label: "Third Year", icon: GraduationCap },
    { id: "four", label: "Fourth Year", icon: GraduationCap },
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
        {/* Profile Section */}
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
              {data?.name || "Teacher"}
            </h2>
            <p className="text-blue-100 text-sm truncate max-w-[160px]">
              {data?.email || "teacher@example.com"}
            </p>
          </div>
        </div>

        {/* ❌ Close Button (Top-Right, Mobile Only) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:hidden text-white 
                   hover:bg-blue-700 p-1.5 rounded-full transition"
          aria-label="Close Sidebar"
        >
          {/* Inline SVG for cross icon */}
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
        {menuItems.map(({ id, label, icon: Icon }) => (
          <motion.li
            key={id}
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedSection(id)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
              selectedSection === id
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-blue-100 dark:hover:bg-gray-800"
            }`}
          >
            <Icon
              size={18}
              className={`${
                selectedSection === id
                  ? "text-white"
                  : "text-blue-600 dark:text-gray-300"
              }`}
            />
            <span>{label}</span>
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
        © {new Date().getFullYear()} Abc Pvt Ltd
      </div>
    </div>
  );
};

export default TeacherPage;
