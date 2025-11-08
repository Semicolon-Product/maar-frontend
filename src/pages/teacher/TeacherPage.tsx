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

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-colors duration-300">
      <div className="hidden md:block w-72 h-screen sticky top-0 overflow-y-auto shadow-2xl">
        <SidebarContent
          data={teacherDetails?.teacher}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>

      {/* Sidebar for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 md:hidden z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 w-72 md:hidden z-[999] shadow-2xl"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <SidebarContent
                onClose={() => setIsSidebarOpen(false)}
                data={teacherDetails?.teacher}
                selectedSection={selectedSection}
                setSelectedSection={(section) => {
                  setSelectedSection(section);
                  setIsSidebarOpen(false);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="md:hidden sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {selectedSection === "dashboard" && "Teacher Portal"}
            {selectedSection === "first" && "First Year"}
            {selectedSection === "second" && "Second Year"}
            {selectedSection === "third" && "Third Year"}
            {selectedSection === "four" && "Fourth Year"}
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <IoReorderThree className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-2 md:p-6 lg:p-8">
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
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 transition-all duration-300 overflow-hidden border-r border-gray-200 dark:border-gray-800">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center space-x-4 p-6 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 dark:from-blue-800 dark:via-blue-700 dark:to-purple-800 shadow-lg"
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-xl ring-2 ring-blue-300 dark:ring-blue-600">
            <img
              src="https://github.com/shadcn.png"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white truncate">
            {data?.name || "Teacher"}
          </h2>
          <p className="text-xs text-blue-100 truncate">
            {data?.email || "teacher@example.com"}
          </p>
        </div>

        {/* Close Button (Mobile Only) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:hidden text-white/90 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all active:scale-90"
          aria-label="Close Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map(({ id, label, icon: Icon }, index) => (
          <motion.button
            key={id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedSection(id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-full cursor-pointer font-semibold transition-all duration-200 ${
              selectedSection === id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 dark:shadow-blue-900/50"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-md"
            }`}
          >
            <Icon
              size={20}
              className={`${
                selectedSection === id
                  ? "text-white"
                  : "text-blue-600 dark:text-blue-400"
              }`}
            />
            <span className="text-sm">{label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Theme Switch */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Theme
        </span>
        <ThemeToggleSwitch />
      </div>

      {/* Footer */}
      <div className="text-center text-xs py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white font-medium">
        © {new Date().getFullYear()} MAKAUTians
      </div>
    </div>
  );
};

export default TeacherPage;
