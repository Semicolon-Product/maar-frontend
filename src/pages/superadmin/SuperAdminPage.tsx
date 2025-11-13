import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  FaCalendarAlt,
  FaSchool,
  FaChalkboardTeacher,
  FaBarcode,
} from "react-icons/fa";

import type {
  AllDetails,
  SuperadminSidebarData,
  Teacher,
} from "@/components/types/superadminType";
import {
  LayoutDashboard,
  LogOut,
  Pencil,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";

import { PiCurrencyInrBold } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import { deleteApi, getApi, postApi, putApi } from "@/api";

import { useToast } from "@/contexts/ToastContext";
import ThemeToggleSwitch from "@/components/ThemeToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import PricingSection from "@/components/PricingSection";
import { processPaymentData } from "@/utils/paymentUtils";
interface SidebarContentProps {
  details?: SuperadminSidebarData;
  selectedSection: string;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
}

const SuperAdminPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //--------------manage user-------------
  const [showAddModal, setShowAddModal] = useState(false);
  const [teacherData, setTeacherData] = useState<{
    id?: number;
    name: string;
    department: string;
    email: string;
    password: string;
    mobile_no: string | null;
  }>({
    id: undefined,
    name: "",
    department: "",
    email: "",
    password: "",
    mobile_no: "",
  });

  //-----------add teacher
  const handleOpenAddModal = () => {
    setIsEditMode(false); // not editing, it's new
    setTeacherData({
      id: undefined,
      name: "",
      department: "",
      email: "",
      password: "",
      mobile_no: "",
    });
    setShowAddModal(true);
  };
  //-----edit teacher
  const [isEditMode, setIsEditMode] = useState(false);

  const handleTeacherEdit = (teacher: Teacher) => {
    setIsEditMode(true);
    setTeacherData(teacher);
    setShowAddModal(true);
  };

  const handleClear = () => {
    setTeacherData({
      id: undefined,
      name: "",
      department: "",
      email: "",
      password: "",
      mobile_no: "",
    });
    setErrors({
      name: false,
      department: false,
      email: false,
      password: false,
      mobile_no: false,
    });
  };

  const getCurrentDateTime = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return now.toLocaleString("en-IN", options);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [allTeacher, setAllTeacher] = useState<Teacher[]>();
  const getAllTeacher = async () => {
    await getApi("teacher/getAllTeacher").then((res) => {
      setAllTeacher(res?.teachers);
    });
  };
  const handleDeleteTeacher = (teacher: Teacher) => {
    setShowDeleteModal(true);
    setSelectedTeacher(teacher);
  };

  const confirmDelete = async () => {
    if (!selectedTeacher || selectedTeacher.id === undefined) return;

    await deleteApi(`teacher/delete/${selectedTeacher.id}`).then((res) => {
      toast.success(res?.message);
      getAllTeacher();
      setShowDeleteModal(false);
    });
  };

  const [errors, setErrors] = useState({
    name: false,
    department: false,
    email: false,
    password: false,
    mobile_no: false,
  });

  const handleAddTeacher = async () => {
    const { name, department, email, password, mobile_no } = teacherData;

    const newErrors = {
      name: !name,
      department: !department,
      email: !email,
      password: !password,
      mobile_no: !mobile_no,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    try {
      const payload = {
        teacher_name: name,
        department: department,
        email: email,
        password: password,
        mobile_no: mobile_no,
      };
      await postApi("teacher/create", payload).then((res) => {
        toast.success(res.message);
        setShowAddModal(false);
        handleClear();
        getAllTeacher();
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleUpdateTeacher = async () => {
    try {
      const updatedData = {
        name: teacherData.name,
        email: teacherData.email,
        mobile_no: teacherData.mobile_no,
        department: teacherData.department,
        password: teacherData.password,
      };

      await putApi(`teacher/update/${teacherData.id}`, updatedData);
      toast.success("Teacher Updated Successfully!");
      handleClear();
      setShowAddModal(false);
      getAllTeacher();
    } catch (error) {
      toast.error("Failed to update teacher");
    }
  };

  const [allDetails, setAllDetails] = useState<AllDetails>();
  const getAllDetails = async () => {
    await getApi("superadmin/getDetails").then((res) => {
      setAllDetails(res?.data);
      setAllTeacher(res?.data?.teachers);
    });
  };

  useEffect(() => {
    getAllDetails();
  }, []);

  useEffect(() => {
    if (selectedSection === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [selectedSection, navigate]);

  const handleCreatePayment = async (amount: number) => {
    try {
      const res = await postApi("superadmin/createPayment", { amount });

      if (res?.payUrl) {
        window.open(res.payUrl, "_blank");
      } else {
        toast.error("Payment URL not found");
      }
    } catch (error) {
      toast.error("Payment creation failed");
    }
  };
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    if (allDetails?.payment) {
      const paymentSummary = processPaymentData(allDetails.payment);
      setPayment(paymentSummary);
    }
  }, [allDetails]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block w-72 h-screen sticky top-0 overflow-y-auto shadow-2xl">
          <SidebarContent
            details={allDetails?.superadmin}
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
                  details={allDetails?.superadmin}
                  selectedSection={selectedSection}
                  setSelectedSection={setSelectedSection}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddModal && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal container */}
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-[90vw] md:max-w-[60vw] flex flex-col max-h-[90vh]  dark:border-gray-700 overflow-hidden">
                  {/* Header */}
                  <div className="border-b border-gray-700 flex items-center justify-between bg-[#2a4054] dark:bg-gray-900 text-white px-4 py-3">
                    <h2 className="text-base sm:text-lg font-semibold">
                      {isEditMode ? "Edit Teacher" : "Add New Teacher"}
                    </h2>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="p-1 hover:bg-white/20 rounded-md transition"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Form Content */}
                  <div className="p-4 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Teacher Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Teacher Name
                        </label>
                        <input
                          type="text"
                          value={teacherData.name}
                          onChange={(e) =>
                            setTeacherData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className={`w-full text-gray-700 px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
                            errors.name
                              ? "border-red-500 ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          }`}
                        />
                      </div>

                      {/* Department */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          value={teacherData.department}
                          onChange={(e) =>
                            setTeacherData((prev) => ({
                              ...prev,
                              department: e.target.value,
                            }))
                          }
                          className={`w-full text-gray-700 px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
                            errors.department
                              ? "border-red-500 ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          }`}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={teacherData.email}
                          onChange={(e) =>
                            setTeacherData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className={`w-full text-gray-700 px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
                            errors.email
                              ? "border-red-500 ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          }`}
                        />
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Password
                        </label>
                        <input
                          type="text"
                          value={teacherData.password}
                          onChange={(e) =>
                            setTeacherData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          className={`w-full text-gray-700 px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
                            errors.password
                              ? "border-red-500 ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          }`}
                        />
                      </div>

                      {/* Mobile No */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Mobile No
                        </label>
                        <input
                          type="text"
                          value={teacherData.mobile_no ?? ""}
                          onChange={(e) =>
                            setTeacherData((prev) => ({
                              ...prev,
                              mobile_no: e.target.value,
                            }))
                          }
                          className={`w-full text-gray-700 px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
                            errors.mobile_no
                              ? "border-red-500 ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-end gap-3">
                    <button
                      onClick={
                        isEditMode ? handleUpdateTeacher : handleAddTeacher
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition text-sm"
                    >
                      {isEditMode ? (
                        <>
                          {/* Edit Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536M16.732 3.732a2.5 2.5 0 113.536 3.536L7.5 20.036H4v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Update
                        </>
                      ) : (
                        <>
                          {/* Add Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleClear}
                      className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition text-sm"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Top bar with menu icon */}
          <div className="md:hidden sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center shadow-sm">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {allDetails?.superadmin.name}
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            {/* <h1 className="text-2xl font-bold">Superadmin Portal</h1>
            <p className="mt-2 text-gray-700">
              You are viewing the <strong>{selectedSection}</strong> section.
            </p> */}

            {/* Render Section Content */}
            <div>
              {selectedSection === "dashboard" && (
                <div className="space-y-6">
                  {/* Page Header */}
                  <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                      Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Overview of your institute's performance
                    </p>
                  </div>

                  {/* Row 1 - 3 Equal Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-blue-200 dark:border-blue-700/50 hover:scale-105"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-500 dark:bg-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                          <FaCalendarAlt className="text-white text-2xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          Current Date & Time
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
                        {getCurrentDateTime()}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-green-200 dark:border-green-700/50 hover:scale-105"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-500 dark:bg-green-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                          <FaSchool className="text-white text-2xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          Institute Name
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
                        {allDetails?.institute.name}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-purple-200 dark:border-purple-700/50 hover:scale-105"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-500 dark:bg-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                          <FaChalkboardTeacher className="text-white text-2xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          Total Teachers
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
                        {allDetails?.teachers?.length}
                      </p>
                    </motion.div>
                  </div>

                  {/* Row 2 - Code (1/3) and Payment (2/3) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* 1/3 Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-orange-200 dark:border-orange-700/50 hover:scale-105"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-orange-500 dark:bg-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                          <FaBarcode className="text-white text-2xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          Institute Code
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
                        {allDetails?.institute.institute_code}
                      </p>
                    </motion.div>

                    {/* 2/3 Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-amber-200 dark:border-amber-700/50"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-orange-400 gap-2">
                          <PiCurrencyInrBold className="text-orange-500  text-xl" />
                          Current Plan
                        </h3>
                        <span
                          className={`text-sm font-medium text-white px-3 py-1 rounded-full ${
                            payment?.is_approve
                              ? "bg-green-500 dark:bg-green-700"
                              : "bg-orange-500 dark:bg-amber-800"
                          }`}
                        >
                          {payment?.is_approve ? "Active" : "Not Active"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column - Plan Details */}
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Total Quota:{" "}
                            <span className="font-medium">
                              {payment?.totalQuota ?? 0}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Registered Students:{" "}
                            <span className="font-medium">
                              {payment?.totalStudentsRegistered ?? 0}
                            </span>
                          </p>
                        </div>

                        {/* Right Column - Payment Info */}
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">
                              Last Payment Date:
                            </span>{" "}
                            {payment?.recentPayment?.paid_on
                              ? new Date(
                                  payment?.recentPayment?.paid_on
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">
                              Plan Expiry Date:
                            </span>{" "}
                            {payment?.recentPayment?.valid_until
                              ? new Date(
                                  payment?.recentPayment?.valid_until
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="w-full max-w-7xl mx-auto py-8">
                    <PricingSection
                      data={allDetails?.superadmin ? allDetails : ""}
                    />

                    {/* Contact Section */}
                    <div className="mt-10 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                        Need access for more than 5000 students?{" "}
                        <span className="text-blue-600  underline cursor-pointer hover:text-blue-800">
                          Contact us
                        </span>{" "}
                        for an enterprise solution.
                      </p>
                    </div>

                    {/* Auto Submission Add-on */}
                    <div
                      className="mt-8 cursor-pointer"
                      onClick={() => handleCreatePayment(5000)}
                    >
                      <div className="bg-amber-50 dark:bg-amber-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow">
                        <div className="flex items-center gap-3">
                          <Zap className="h-6 w-6 text-orange-500" />
                          <div>
                            <p className="text-md font-bold text-gray-800 dark:text-gray-200">
                              Auto Submission Feature
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                              Sync student records automatically every year.
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-green-700 dark:text-green-500">
                          ₹5,000/year
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === "users" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                        Teacher Management
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Manage and organize your teaching staff
                      </p>
                    </div>
                    <button
                      onClick={handleOpenAddModal}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2"
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
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Teacher
                    </button>
                  </div>

                  <div className="overflow-auto rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800">
                    <table className="min-w-full  text-sm">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 uppercase text-xs tracking-wider">
                        <tr>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Teacher Name
                          </th>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Email
                          </th>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Mobile No
                          </th>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Department
                          </th>
                          <th className="py-3 px-4 text-center whitespace-nowrap">
                            Action
                          </th>
                        </tr>
                      </thead>

                      {allTeacher?.length ? (
                        <tbody>
                          {allTeacher?.map((teacher, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0
                                  ? "bg-white dark:bg-gray-900"
                                  : "bg-gray-50 dark:bg-gray-800"
                              } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                            >
                              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                {teacher.name}
                              </td>
                              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                {teacher.email}
                              </td>
                              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                {teacher.mobile_no}
                              </td>
                              <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                {teacher.department}
                              </td>

                              <td className="py-3 px-4 text-center flex justify-center gap-3">
                                <button
                                  onClick={() => handleTeacherEdit(teacher)}
                                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteTeacher(teacher)}
                                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td
                              colSpan={6}
                              className="text-center py-6 italic text-gray-500 dark:text-gray-400"
                            >
                              No teachers available. Please add a new teacher to
                              get started.
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              )}

              {selectedSection === "payment-history" && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                      Payment History
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Track all your payment transactions and subscriptions
                    </p>
                  </div>

                  <div className="overflow-auto rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 uppercase text-xs tracking-wider">
                        <tr>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Payment ID
                          </th>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Amount Paid
                          </th>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Student Quota
                          </th>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Students Registered
                          </th>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Paid On
                          </th>
                          <th className="py-3 px-4 text-left whitespace-nowrap">
                            Valid Until
                          </th>
                          <th className="py-3 px-4 text-center whitespace-nowrap">
                            Status
                          </th>
                        </tr>
                      </thead>

                      {allDetails?.payment && allDetails.payment.length > 0 ? (
                        <tbody>
                          {allDetails.payment.map(
                            (payment: any, index: number) => (
                              <tr
                                key={payment.id}
                                className={`${
                                  index % 2 === 0
                                    ? "bg-white dark:bg-gray-900"
                                    : "bg-gray-50 dark:bg-gray-800"
                                } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                              >
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                  #{payment.id}
                                </td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                  ₹{payment.amount_paid}
                                </td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                  {payment.student_quota}
                                </td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                  {payment.students_registered}
                                </td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                  {new Date(payment.paid_on).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </td>
                                <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                                  {new Date(
                                    payment.valid_until
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      payment.is_approve
                                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                        : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                                    }`}
                                  >
                                    {payment.is_approve
                                      ? "Approved"
                                      : "Pending"}
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td
                              colSpan={7}
                              className="text-center py-6 italic text-gray-500 dark:text-gray-400"
                            >
                              No payment history available.
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              )}

              {selectedSection === "logout" && <div>Logging out...</div>}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showDeleteModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Box */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Confirm Delete
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this teacher? This action
                  cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({
  details,
  selectedSection,
  setSelectedSection,
  onClose,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Manage Users", icon: Users },
    {
      id: "payment-history",
      label: "Payment History",
      icon: PiCurrencyInrBold,
    },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 transition-all duration-300 overflow-hidden border-r border-gray-200 dark:border-gray-800">
      {/* Top: Avatar and Details */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center space-x-4 p-6 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 dark:from-blue-800 dark:via-blue-700 dark:to-purple-800 shadow-lg"
      >
        {/* Avatar Section */}
        <div className="relative">
          <Avatar className="w-14 h-14 border-3 border-white shadow-xl ring-2 ring-blue-300 dark:ring-blue-600">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold">
              SA
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white truncate">
            {details?.name || "User"}
          </h2>
          <p className="text-xs text-blue-100 truncate">
            {details?.email || "user@email.com"}
          </p>
        </div>

        {/* ❌ Close Icon (Top-right corner, mobile only) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:hidden text-white/90 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all active:scale-90"
          aria-label="Close"
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
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-all duration-200 ${
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

export default SuperAdminPage;
