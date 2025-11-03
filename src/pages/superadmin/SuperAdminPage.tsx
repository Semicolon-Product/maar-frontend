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

import { getLoggedInSuperadminId } from "@/utils/auth";
import { PiCurrencyInrBold } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import { deleteApi, getApi, postApi } from "@/api";

import { useToast } from "@/contexts/ToastContext";
import ThemeToggleSwitch from "@/components/ThemeToggleButton";
import { AnimatePresence, motion } from "framer-motion";
import PricingSection from "@/components/PricingSection";
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
    dept: string;
    email: string;
    password: string;
    mobileNo: string;
  }>({
    id: undefined,
    name: "",
    dept: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  //-----------add teacher
  const handleOpenAddModal = () => {
    setIsEditMode(false); // not editing, it's new
    setTeacherData({
      id: undefined,
      name: "",
      dept: "",
      email: "",
      password: "",
      mobileNo: "",
    });
    setShowAddModal(true);
  };
  //-----edit teacher
  const [isEditMode, setIsEditMode] = useState(false);

  const handleTeacherEdit = (teacher: Teacher) => {
    setIsEditMode(true);
    console.log("teacher", teacher);
    setShowAddModal(true);
  };

  const handleClear = () => {
    setTeacherData({
      name: "",
      dept: "",
      email: "",
      password: "",
      mobileNo: "",
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

    return now.toLocaleString("en-IN", options); // You can change the locale as needed
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [allTeacher, setAllTeacher] = useState<Teacher[]>();
  const getAllTeacher = async () => {
    await getApi("teacher/getAllTeacher").then((res) => {
      console.log("get all teacher res::", res);
      setAllTeacher(res?.teachers);
    });
  };
  const handleDeleteTeacher = (teacher: Teacher) => {
    console.log("Delete", teacher);
    setShowDeleteModal(!showDeleteModal);
    setSelectedTeacher(teacher);
    console.log("Delete activity", teacher);
    getAllTeacher();
  };

  const confirmDelete = async () => {
    if (!selectedTeacher || selectedTeacher.id === undefined) return;
    console.log("delte:::", selectedTeacher);
    await deleteApi(`teacher/delete/${selectedTeacher.id}`).then((res) => {
      console.log("res in delter", res);
      toast.success(res?.message);
      getAllTeacher();
      setShowDeleteModal(false);
    });
  };

  const superadminId = getLoggedInSuperadminId();

  console.log("Superadminid", superadminId);

  const [errors, setErrors] = useState({
    name: false,
    dept: false,
    email: false,
    password: false,
    mobileNo: false,
  });

  const handleAddTeacher = async () => {
    const { name, dept, email, password, mobileNo } = teacherData;

    const newErrors = {
      name: !name,
      dept: !dept,
      email: !email,
      password: !password,
      mobileNo: !mobileNo,
    };

    setErrors(newErrors);

    // Proceed to submit if all fields are valid
    try {
      const payload = {
        teacher_name: name,
        department: dept,
        email: email,
        password: password,
        mobile_no: mobileNo,
      };
      await postApi("teacher/create", payload).then((res) => {
        console.log("res in teacher create::", res);
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
    /* const updatedData = {
      name: teacherData.name,
      department: teacherData.dept,
      userId: teacherData.userId,
      password: teacherData.password
    }; */

    if (!teacherData.id) {
      console.error("Teacher ID is missing for update");
      return;
    }
  };

  const [allDetails, setAllDetails] = useState<AllDetails>();
  const getAllDetails = async () => {
    await getApi("superadmin/getDetails").then((res) => {
      console.log("in page::", res);
      setAllDetails(res?.data);
      setAllTeacher(res?.data?.teachers);
    });
  };

  useEffect(() => {
    getAllDetails();
  }, []);
  console.log("data::", allDetails);

  //console.log("all teachers", backendAllTeachers);

  //---------------log-out functionality

  useEffect(() => {
    if (selectedSection === "logout") {
      // Clear auth tokens/local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // If you're storing user data

      // Redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 1000); // Optional: add delay for UX
    }
  }, [selectedSection]);

  const handleCreatePayment = async (amount: number) => {
    console.log("amount", amount, typeof amount);
    try {
      const res = await postApi("superadmin/createPayment", { amount });
      console.log("payment status::", res);

      if (res?.payUrl) {
        window.open(res.payUrl, "_blank");
      } else {
        console.error("Payment URL not found");
      }
    } catch (error) {
      console.error("Payment creation failed", error);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-center text-white
             bg-cover dark:bg-[url('https://imapro.in/bahrain/global/bg.svg')]"
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex h-[100vh] overflow-hidden">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block text-white w-64  h-screen sticky top-0 overflow-y-auto">
          <SidebarContent
            details={allDetails?.superadmin}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </div>

        {/* Sidebar for Mobile */}
        {isSidebarOpen && (
          <div className="flex absolute inset-0  text-white w-64  md:hidden top-0 h-screen overflow-y-auto z-[999] flex-col">
            {/* Close icon */}

            {/* Sidebar content below the icon */}
            <SidebarContent
              onClose={() => setIsSidebarOpen(!isSidebarOpen)}
              details={allDetails?.superadmin}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
        )}

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
                  <div className=" border-b border-gray-700 flex items-center justify-between bg-[#2a4054] dark:bg-gray-900 text-white px-4 py-3">
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
                          className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
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
                          value={teacherData.dept}
                          onChange={(e) =>
                            setTeacherData((prev) => ({
                              ...prev,
                              dept: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
                            errors.dept
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
                          className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
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
                          className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
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
                          value={teacherData.mobileNo}
                          onChange={(e) =>
                            setTeacherData((prev) => ({
                              ...prev,
                              mobileNo: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-1 ${
                            errors.mobileNo
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
        <div className="flex-1 overflow-y-auto ">
          {/* Top bar with menu icon */}
          <div className="flex justify-end px-4 py-2 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-black dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 transition flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="px-4 py-2">
            {/* <h1 className="text-2xl font-bold">Superadmin Portal</h1>
            <p className="mt-2 text-gray-700">
              You are viewing the <strong>{selectedSection}</strong> section.
            </p> */}

            {/* Render Section Content */}
            <div className="">
              {selectedSection === "dashboard" && (
                <div className="px-2 grid gap-6">
                  {/* Row 1 - 3 Equal Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-blue-100 dark:bg-gray-800 rounded-xl shadow-md p-5 ">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                        <FaCalendarAlt className="text-blue-500 dark:text-blue-200 text-xl" />
                        Current Date & Time
                      </h3>
                      <p className="text-gray-700 dark:text-blue-200 text-base">
                        {getCurrentDateTime()}
                      </p>
                    </div>

                    <div className="bg-green-100  dark:bg-gray-800 rounded-xl shadow-md p-5">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-green-200">
                        <FaSchool className="text-green-300 text-xl" />
                        Institute Name
                      </h3>
                      <p className="text-gray-700 dark:text-green-200 text-base">
                        {allDetails?.institute.name}
                      </p>
                    </div>

                    <div className="bg-purple-100 dark:bg-gray-800 rounded-xl shadow-md p-5">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-purple-200">
                        <FaChalkboardTeacher className="text-purple-500 dark:text-purple-200 text-xl" />
                        Total Teachers
                      </h3>
                      <p className="text-gray-700 dark:text-purple-200 text-base">
                        {allDetails?.teachers?.length}
                      </p>
                    </div>
                  </div>

                  {/* Row 2 - Code (1/3) and Payment (2/3) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 1/3 Card */}
                    <div className="bg-red-100 dark:bg-gray-800 rounded-xl shadow-md p-5">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800 dark:text-orange-200">
                        <FaBarcode className="text-orange-500 dark:text-orange-200 text-xl" />
                        Institute Code
                      </h3>
                      <p className="text-gray-700 dark:text-orange-200 text-base">
                        {allDetails?.institute.institute_code}
                      </p>
                    </div>

                    {/* 2/3 Card */}
                    <div className="lg:col-span-2 bg-orange-100 dark:bg-gray-800 rounded-xl shadow-md p-5">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-orange-400 gap-2">
                          <PiCurrencyInrBold className="text-orange-500  text-xl" />
                          Current Plan
                        </h3>
                        <span className="text-sm font-medium text-white bg-orange-500 dark:bg-amber-800 px-3 py-1 rounded-full">
                          Premium Plan
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column - Plan Details */}
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Total Quota:{" "}
                            <span className="font-medium">
                              {allDetails?.payment?.student_quota ?? 0}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Registered Students:{" "}
                            <span className="font-medium">
                              {allDetails?.payment?.students_registered ?? 0}
                            </span>
                          </p>
                        </div>

                        {/* Right Column - Payment Info */}
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">
                              Last Payment Date:
                            </span>{" "}
                            {allDetails?.payment?.paid_on
                              ? new Date(
                                  allDetails.payment.paid_on
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
                            10 July 2026
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-7xl mx-auto px-4 py-12">
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
                      <div className=" bg-amber-50 dark:bg-amber-800  rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow">
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
                <div className="p-1 min-h-screen text-white">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Teacher Management
                    </h2>
                    <button
                      onClick={handleOpenAddModal}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm font-medium"
                    >
                      Add Teacher
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full text-sm">
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
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 shadow-xl rounded-r-2xl overflow-hidden">
      {/* Top: Avatar and Details */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center space-x-3 p-5 
                 bg-gradient-to-r from-blue-600 to-blue-400 
                 dark:from-blue-700 dark:to-blue-500"
      >
        {/* Avatar Section */}
        <Avatar className="w-12 h-12 border-2 border-white">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SG</AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white">
            {details?.name || "User"}
          </h2>
          <p className="text-sm text-blue-100 truncate max-w-[160px]">
            {details?.email || "user@email.com"}
          </p>
        </div>

        {/* ❌ Close Icon (Top-right corner, mobile only) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:hidden text-white hover:bg-blue-700/50 
                   rounded-full p-1.5 transition"
          aria-label="Close"
        >
          {/* Inline SVG for close icon */}
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

      {/* Menu Items */}
      <ul className="flex-1 space-y-1 mt-4 px-3">
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
        © {new Date().getFullYear()} MAKAUTians
      </div>
    </div>
  );
};

export default SuperAdminPage;
