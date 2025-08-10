import React, { useEffect, useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaCalendarAlt, FaSchool, FaChalkboardTeacher, FaBarcode, FaStar } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Modal,
  Box,
  Typography,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { superadminStyle } from '@/components/styles/style';
import Close from '@mui/icons-material/Close';
import type { AllDetails, PaymentPlan, SuperadminSidebarData, Teacher, Department } from '@/components/types/superadminType';
import { X, Zap } from 'lucide-react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import { getLoggedInSuperadminId } from '@/utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import { PiCurrencyInrBold } from "react-icons/pi";

import { useNavigate } from 'react-router-dom';
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi2";
import premium from '../../../public/assets/premium_2x-min-removebg-preview.png'
import { deleteApi, getApi, postApi } from '@/api';
import Select from "react-select";
interface SidebarContentProps {
  details?: SuperadminSidebarData;
  selectedSection: string;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
}

const SuperAdminPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //--------------manage user-------------
  const [showAddModal, setShowAddModal] = useState(false)
  const [teacherData, setTeacherData] = useState<{
    id?: number;
    name: string;
    dept: string;
    email: string;
    password: string;
    mobileNo: string
  }>({
    id: undefined,
    name: '',
    dept: '',
    email: '',
    password: '',
    mobileNo: "",
  });


  //-----------add teacher 
  const handleOpenAddModal = () => {
    setIsEditMode(false); // not editing, it's new
    setTeacherData({ id: undefined, name: '', dept: '', email: '', password: '', mobileNo: "" });
    setShowAddModal(true);
  };
  //-----edit teacher
  const [isEditMode, setIsEditMode] = useState(false);

  const handleTeacherEdit = (teacher: Teacher) => {
    setIsEditMode(true);
    console.log("teacher", teacher);
    /* setTeacherData({
      id: teacher.id,
      name: teacher.name,
      dept: teacher.department,
      email: teacher.email,
      password: teacher.password,
      mobileNo:teacher.mobile_no
    }); */
    setShowAddModal(true);
  };

  const handleClear = () => {
    setTeacherData({

      name: "",
      dept: "",
      email: "",
      password: "",
      mobileNo: ""
    });
  }



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
      setAllTeacher(res?.teachers)
    })
  }
  const handleDeleteTeacher = (teacher: Teacher) => {
    console.log("Delete", teacher)
    setShowDeleteModal(!showDeleteModal)
    setSelectedTeacher(teacher);
    console.log("Delete activity", teacher)
    getAllTeacher()
  }

  const confirmDelete = async () => {
    if (!selectedTeacher || selectedTeacher.id === undefined) return;
    console.log("delte:::", selectedTeacher);
    await deleteApi(`teacher/delete/${selectedTeacher.id}`).then((res) => {
      console.log("res in delter", res);
      toast.success(res?.message)
      getAllTeacher();
      setShowDeleteModal(false);

    })


  };



  const superadminId = getLoggedInSuperadminId();

  console.log("Superadminid", superadminId)


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
      const payload = { teacher_name: name, department: dept, email: email, password: password, mobile_no: mobileNo }
      await postApi("teacher/create", payload).then((res) => {
        console.log("res in teacher create::", res)
        toast.success(res.message)
        setShowAddModal(false);
        handleClear()
        getAllTeacher();
      })
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
      console.log("in page::", res)
      setAllDetails(res?.data);
      setAllTeacher(res?.data?.teachers);
    })
  }
  const [paymentDetails, setPaymentDetails] = useState<PaymentPlan[]>();
  const getPlanDetails = async () => {
    await getApi("superadmin/getPlans").then((res) => {
      console.log("res isn payment:::", res?.data);
      setPaymentDetails(res?.data)

    })
  }

  useEffect(() => {
    getAllDetails();
    getPlanDetails();
  }, []);
  console.log("data::", allDetails)

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

  console.log("payment details::", paymentDetails)

  const handleCreatePayment = async (amount: string | undefined) => {
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

  const [deptList, setDeptList] = useState<Department[]>();
  const getAllDept = async () => {
    await getApi("superadmin/getAllDepartments").then((res) => {
      console.log("dept", res.data);
      setDeptList(res?.data);
    })
  }


  useEffect(() => {

    getAllDept();
  }, [])



  const deptOptions = deptList?.map((dept) => ({
    label: dept.name,
    value: dept.name,
  }));



  return (

    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-white"
    /*  style={{
       backgroundImage: "url('https://imapro.in/bahrain/global/bg.svg')", // Replace with your actual image path
       backgroundAttachment: "fixed",
     }} */
    >
      <ToastContainer position='top-right' />
      <div className="flex h-[100vh] overflow-hidden">

        {/* Sidebar for Desktop */}
        <div className="hidden md:block bg-gray-900 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto">
          <SidebarContent
            details={allDetails?.superadmin}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection} />
        </div>

        {/* Sidebar for Mobile */}
        {isSidebarOpen && (
          <div className="flex absolute inset-0 bg-gray-900 text-white w-64 px-2 pt-2 md:hidden top-0 h-screen overflow-y-auto z-[999] flex-col">

            {/* Close icon */}
            <div className="flex justify-end p-2">
              <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-red-400">
                <X size={24} />
                {/* Or if using MUI: <CloseIcon /> */}
              </button>
            </div>

            {/* Sidebar content below the icon */}
            <SidebarContent
              details={allDetails?.superadmin}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
        )}

        <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
          <div className="bg-white max-w-[95vw] sm:max-w-[90vw] md:max-w-[60vw] mt-[5%] mx-auto rounded-lg shadow-lg flex flex-col max-h-screen overflow-hidden">
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#2a4054", px: 2, py: 1 }}>
              <Typography
                variant="h6"
                className="text-white text-center flex-1 text-sm sm:text-base md:text-lg"
              >
                {isEditMode ? 'Edit Teacher' : 'Add New Teacher'}
              </Typography>
              <IconButton onClick={() => setShowAddModal(false)} size="small">
                <Close fontSize="small" sx={{ color: "white" }} />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ p: 3, overflowY: "auto", minHeight: "50vh" }}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Teacher Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Name</label>
                    <input
                      type="text"
                      name="name"
                      value={teacherData.name}
                      onChange={(e) =>
                        setTeacherData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className={`w-full px-4 py-2 border  focus:outline-none focus:ring-1 ${errors.name ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    />

                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    {/* <input
                      type="text"
                      name="dept"
                      value={teacherData.dept}
                      onChange={(e) =>
                        setTeacherData((prev) => ({ ...prev, dept: e.target.value }))
                      }
                      className={`w-full px-4 py-2 border focus:outline-none focus:ring-1 ${errors.dept ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    /> */}
                    <Select
                      name="dept"
                      options={deptOptions}
                      value={deptOptions?.find((opt) => opt.value === teacherData.dept) || null}
                      onChange={(selectedOption) =>
                        setTeacherData((prev) => ({ ...prev, dept: selectedOption?.value || "" }))
                      }
                      classNamePrefix="react-select"
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          padding: "2px",
                          borderRadius: "0.25rem",
                          border: errors.dept ? "1px solid #f87171" : "1px solid #d1d5db", // red-500 or gray-300
                          boxShadow: state.isFocused
                            ? errors.dept
                              ? "0 0 0 1px #f87171"
                              : "0 0 0 1px #3b82f6"
                            : "none", // blue-500 ring
                          "&:hover": {
                            borderColor: errors.dept ? "#f87171" : "#3b82f6",
                          },
                        }),
                      }}
                      isSearchable
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={teacherData.email}
                      onChange={(e) =>
                        setTeacherData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className={`w-full px-4 py-2 border  focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="text"
                      name="password"
                      value={teacherData.password}
                      onChange={(e) =>
                        setTeacherData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      className={`w-full px-4 py-2 border  focus:outline-none focus:ring-1 ${errors.password ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    />
                  </div>

                  {/* Mobile No */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
                    <input
                      type="text"
                      name="mobileNo"
                      value={teacherData.mobileNo}
                      onChange={(e) =>
                        setTeacherData((prev) => ({ ...prev, mobileNo: e.target.value }))
                      }
                      className={`w-full px-4 py-2 border  focus:outline-none focus:ring-1 ${errors.mobileNo ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    />
                  </div>
                </div>
              </div>
            </Box>

            {/* Footer */}
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                p: 2,
              }}
            >
              <Button
                sx={{
                  ...superadminStyle.button,
                  color: "white",
                  backgroundColor: "green",
                  '&:hover': { backgroundColor: "#228B22" },
                }}
                onClick={isEditMode ? handleUpdateTeacher : handleAddTeacher}
              >
                {isEditMode ? 'Update' : 'Add'}
              </Button>
              <Button
                sx={{
                  ...superadminStyle.button,
                  color: "white",
                  backgroundColor: "red",
                  '&:hover': { backgroundColor: "#cc0000" },
                }}
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>
          </div>
        </Modal>


        {/* Main Content */}
        <div className="flex-1 overflow-y-auto ">

          {/* Top bar with menu icon */}
          <div className="flex justify-end px-4 py-2 md:hidden">
            <Button
              className="text-black bg-transparent hover:bg-gray-100  block"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <IoReorderThree className="text-xl scale-150" />
            </Button>
          </div>

          <div className="px-4 py-2">
            {/* <h1 className="text-2xl font-bold">Superadmin Portal</h1>
            <p className="mt-2 text-gray-700">
              You are viewing the <strong>{selectedSection}</strong> section.
            </p> */}

            {/* Render Section Content */}
            <div className="mt-6">
              {selectedSection === "dashboard" &&
                <div className="p-4 grid gap-6">
                  {/* Row 1 - 3 Equal Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-blue-100 rounded-xl shadow-md p-5 border border-blue-200">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800">
                        <FaCalendarAlt className="text-blue-500 text-xl" />
                        Current Date & Time
                      </h3>
                      <p className="text-gray-700 text-base">{getCurrentDateTime()}</p>
                    </div>

                    <div className="bg-green-100 rounded-xl shadow-md p-5 border border-green-200">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800">
                        <FaSchool className="text-green-500 text-xl" />
                        Institute Name
                      </h3>
                      <p className="text-gray-700 text-base">{allDetails?.institute.name}</p>
                    </div>

                    <div className="bg-purple-100 rounded-xl shadow-md p-5 border border-purple-200">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800">
                        <FaChalkboardTeacher className="text-purple-500 text-xl" />
                        Total Teachers
                      </h3>
                      <p className="text-gray-700 text-base">{allDetails?.teachers?.length}
                      </p>
                    </div>
                  </div>

                  {/* Row 2 - Code (1/3) and Payment (2/3) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 1/3 Card */}
                    <div className="bg-red-100 rounded-xl shadow-md p-5 border border-red-200">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800">
                        <FaBarcode className="text-orange-500 text-xl" />
                        Institute Code
                      </h3>
                      <p className="text-gray-700 text-base">{allDetails?.institute.institute_code}</p>
                    </div>

                    {/* 2/3 Card */}
                    <div className="lg:col-span-2 bg-orange-100 rounded-xl shadow-md p-5 border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="flex items-center text-lg font-semibold text-gray-800 gap-2">
                          <PiCurrencyInrBold className="text-orange-500 text-xl" />

                          Current Plan
                        </h3>
                        <span className="text-sm font-medium text-white bg-orange-500 px-3 py-1 rounded-full">
                          Premium Plan
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column - Plan Details */}
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700">
                            Total Quota: <span className="font-medium">{allDetails?.payment?.student_quota ?? 0}</span>
                          </p>
                          <p className="text-sm text-gray-700">
                            Registered Students: <span className="font-medium">{allDetails?.payment?.students_registered ?? 0}</span>
                          </p>
                        </div>

                        {/* Right Column - Payment Info */}
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Last Payment Date:</span>{" "}
                            {allDetails?.payment?.paid_on
                              ? new Date(allDetails.payment.paid_on).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })
                              : "N/A"}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Plan Expiry Date:</span> 10 July 2026
                          </p>
                        </div>
                      </div>
                    </div>






                  </div>
                  <div className="w-full max-w-7xl mx-auto px-4 py-12">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-[1200px]">
                      <div className="bg-gradient-to-br from-[#ffffff] via-[#ebf4ff] to-[#ffffff] shadow-lg border border-gray-300 rounded-2xl p-6 flex flex-col h-[350px] justify-between hover:scale-105 hover:-rotate-y-3 transition-transform duration-300">
                        <div>
                          <h4 className="text-sm uppercase font-bold text-blue-600 mb-1">{paymentDetails && paymentDetails[0]?.plan_name} Plan</h4>
                          <div className="flex items-center gap-2 mb-3">
                            <HiUserGroup className="h-6 w-6 text-blue-500" />
                            <h3 className="text-xl font-bold text-gray-800">Up to{paymentDetails && paymentDetails[0]?.total_students}  Students</h3>
                          </div>
                          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mb-4">
                            <li>₹{paymentDetails && paymentDetails[0]?.amount_per_student}  per student</li>
                            <li>Email support</li>
                            <li>Basic analytics</li>
                          </ul>
                          <p className="text-sm text-gray-400 line-through">₹24,000/year</p>
                          <p className="text-3xl font-bold text-green-600">₹{paymentDetails && paymentDetails[0]?.total_amount}/year</p>
                        </div>
                        <button onClick={() => handleCreatePayment(paymentDetails && paymentDetails[0]?.total_amount)} className="mt-6 w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
                          Choose Standard
                        </button>
                      </div>


                      <div className="bg-gradient-to-br from-[#fff9db] via-[#fff4bf] to-[#fef08a] shadow-2xl border-3 border-yellow-400 rounded-2xl p-6 flex flex-col h-[350px] justify-between scale-105 z-10 hover:scale-[1.07] transition-transform duration-300">
                        <div>
                          <h4 className="text-sm uppercase font-bold text-yellow-700 mb-1">{paymentDetails && paymentDetails[1]?.plan_name} Plan</h4>
                          <div className="flex items-center gap-2 mb-3">
                            <FaStar className="h-6 w-6 text-yellow-500" />
                            <h3 className="text-xl font-bold text-gray-900">Up to {paymentDetails && paymentDetails[1]?.total_students}  Students</h3>
                          </div>
                          <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1 mb-4">
                            <li>₹{paymentDetails && paymentDetails[1]?.amount_per_student}  per student</li>
                            <li>Priority email support</li>
                            <li>Advanced reporting dashboard</li>
                            <li>Data export feature</li>
                          </ul>
                          <p className="text-sm text-gray-500 line-through">₹54,000/year</p>
                          <p className="text-3xl font-bold text-yellow-700">₹{paymentDetails && paymentDetails[1]?.total_amount}/year</p>
                        </div>
                       {/*  <img
                          src={premium}
                          alt="Premium Plan"
                          className="w-full h-48 object-contain my-4"
                        /> */}
                        <button onClick={() => handleCreatePayment(paymentDetails && paymentDetails[1]?.total_amount)} className="mt-6 w-full bg-yellow-500 text-white rounded-lg py-2 font-medium hover:bg-yellow-600 transition">
                          Choose Premium
                        </button>
                      </div>


                      <div className="bg-gradient-to-br from-[#fef2e8] via-white to-[#ffd9cf] shadow-lg border border-yellow-300 rounded-2xl p-6 flex flex-col h-[350px] justify-between hover:scale-105 hover:rotate-y-3 transition-transform duration-300">
                        <div>
                          <h4 className="text-sm uppercase font-bold text-indigo-600 mb-1">{paymentDetails && paymentDetails[2]?.plan_name} Plan</h4>
                          <div className="flex items-center gap-2 mb-3">
                            <HiOutlineUserGroup className="h-6 w-6 text-indigo-500" />
                            <h3 className="text-xl font-bold text-gray-800">Up to {paymentDetails && paymentDetails[2]?.total_students} Students</h3>
                          </div>
                          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mb-4">
                            <li>₹{paymentDetails && paymentDetails[2]?.amount_per_student}  per student</li>
                            <li>Dedicated account manager</li>
                            <li>Full API access</li>
                            <li>Custom integrations</li>
                          </ul>
                          <p className="text-sm text-gray-400 line-through">₹75,000/year</p>
                          <p className="text-3xl font-bold text-green-600">₹{paymentDetails && paymentDetails[2]?.total_amount}/year</p>
                        </div>
                        <button onClick={() => handleCreatePayment(paymentDetails && paymentDetails[2]?.total_amount)} className="mt-6 w-full bg-indigo-600 text-white rounded-lg py-2 font-medium hover:bg-indigo-700 transition">
                          Choose Enterprise
                        </button>
                      </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-10 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-800 font-medium">
                        Need access for more than 5000 students?{" "}
                        <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">Contact us</span> for an enterprise solution.
                      </p>
                    </div>

                    {/* Auto Submission Add-on */}
                    <div className="mt-8 cursor-pointer" onClick={()=>handleCreatePayment(5000)}>
                      <div className="bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] border border-orange-300 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow">
                        <div className="flex items-center gap-3">
                          <Zap className="h-6 w-6 text-orange-500" />
                          <div>
                            <p className="text-md font-bold text-gray-800">Auto Submission Feature</p>
                            <p className="text-sm text-gray-700">Sync student records automatically every year.</p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-green-700">₹5,000/year</p>
                      </div>
                    </div>
                  </div>



                </div>
              }


              {selectedSection === "users" && (

                <div>
                  <Button variant="contained" sx={{
                    fontSize: "12px", mb: 2, textTransform: "none", background: "#2a4054", p: 1
                  }} onClick={() => handleOpenAddModal()}>Add Teacher</Button>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#2a4054", height: "30px", }}>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Teacher Name</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Email</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Mobile No</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Department</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Password</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      {allTeacher?.length ?
                        <TableBody>
                          {allTeacher?.map((teacher: any, index: number) => (
                            <TableRow key={index} sx={{ background: index % 2 ? "#eceff1" : "white" }}>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.name}</TableCell>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.email}</TableCell>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.mobile_no}</TableCell>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.department}</TableCell>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.password_hash}</TableCell>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>
                                <IconButton aria-label="edit" color="primary" onClick={() => handleTeacherEdit(teacher)}>
                                  <EditIcon sx={{ fontSize: "20px" }} />
                                </IconButton>
                                <IconButton aria-label="delete" color="error" onClick={() => handleDeleteTeacher(teacher)}>
                                  <DeleteIcon sx={{ fontSize: "20px" }} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        :
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ fontStyle: "italic", color: "gray", py: 3 }}>
                              No teachers available. Please add a new teacher to get started.
                            </TableCell>
                          </TableRow>
                        </TableBody>

                      }

                    </Table>
                  </TableContainer>

                </div>

              )}

              {selectedSection === "logout" && (
                <div>
                  Logging out...
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      <Dialog open={showDeleteModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this teacher?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}// Replace with your actual delete function
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>

        </DialogActions>
      </Dialog>

    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ details, selectedSection, setSelectedSection }) => {
  return (
    <div className="flex flex-col h-full">

      {/* Top: Avatar and Menu */}
      <div className="flex items-center space-x-4 p-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{details?.name}</h2>
          <p className="text-sm text-gray-400">{details?.email}</p>
        </div>
      </div>

      {/* Sidebar Menu Items */}
      <ul className="space-y-2 mt-4 px-4">
        {[
          { id: "dashboard", label: "Dashboard" },
          { id: "users", label: "Manage Users" },
          { id: "logout", label: "Logout" },
        ].map(({ id, label }) => (
          <li
            key={id}
            className={`p-1 rounded font-bold cursor-pointer ${selectedSection === id ? "text-blue-300" : "hover:text-blue-500"
              }`}
            onClick={() => setSelectedSection(id)}
          >
            {label}
          </li>
        ))}
      </ul>

      {/* Footer Stuck to Bottom */}
      <div className="text-center text-xs mt-auto text-gray-400 py-4 border-t border-gray-400">
        © {new Date().getFullYear()} Abc Pvt Ltd
      </div>
    </div>
  );
};

export default SuperAdminPage;
