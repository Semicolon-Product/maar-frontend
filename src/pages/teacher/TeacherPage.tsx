import React, { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import TeacherVerifyTable from "@/components/TeacherComponent/TeacherVerifyTable";
import TeacherDetails from "@/components/TeacherComponent/TeacherDetails";

//import { allStudentDetails } from "@/components/data/data";
import { GraduationCap, LayoutDashboard, LogOut, X } from "lucide-react";
//import { studentdata } from "@/components/data/data";
import { getApi } from "@/api";
import { useNavigate } from "react-router-dom";
import type {
  BackendStudentDetails,
  teacherGetDetails,
  TeacherSideBarProps,
} from "@/components/types/superadminType";
import ThemeToggleSwitch from "@/components/ThemeToggleButton";
import { motion } from "framer-motion";

interface SidebarContentProps {
  data?: TeacherSideBarProps;
  selectedSection: string;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
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
      {/* Sidebar for Desktop */}
      <div className="hidden md:block bg-gray-800 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto shadow-lg shadow-black/20">
        <SidebarContent
          data={teacherDetails?.teacher}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="flex absolute inset-0 bg-gray-900/95 text-white w-64 px-2 pt-2 md:hidden top-0 h-screen overflow-y-auto z-[999] flex-col backdrop-blur-sm">
          {/* Close icon */}
          <div className="flex justify-end p-2">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-red-400 transition"
            >
              <X size={24} />
            </button>
          </div>

          <SidebarContent
            data={teacherDetails?.teacher}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar: h2 on left, menu icon on right */}
        <div className="flex items-center justify-between px-4 pt-4 pb-0">
          {/* Heading */}
          {selectedSection && selectedSection !== "dashboard" && (
            <h2
              className="text-base md:text-2xl font-semibold 
          bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 
          text-green-900 dark:text-white rounded-sm shadow-md px-3 py-1 w-fit
          transition-colors duration-300"
            >
              {selectedSection === "first" && "First Year Student Data"}
              {selectedSection === "second" && "Second Year Student Data"}
              {selectedSection === "third" && "Third Year Student Data"}
              {selectedSection === "four" && "Fourth Year Student Data"}
            </h2>
          )}

          {/* Menu icon - show only on small screens */}
          <div className="md:hidden">
            <button
              className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white 
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors 
          p-2 rounded-md shadow-sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <IoReorderThree className="text-xl scale-150" />
            </button>
          </div>
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
        className="flex items-center space-x-3 p-5 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600"
      >
        <Avatar className="w-12 h-12 border-2 border-white">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>TP</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-white font-semibold text-base sm:text-lg">
            {data?.name || "Teacher"}
          </h2>
          <p className="text-blue-100 text-sm truncate max-w-[160px]">
            {data?.email || "teacher@example.com"}
          </p>
        </div>
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
