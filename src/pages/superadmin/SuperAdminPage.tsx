import React, { useEffect, useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaCalendarAlt, FaSchool, FaChalkboardTeacher, FaBarcode, FaCreditCard } from "react-icons/fa";
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
import { teachers } from '@/components/data/data';
import { superadminStyle } from '@/components/styles/style';
import Close from '@mui/icons-material/Close';
import type { GetAllTeachersResponse, Teacher } from '@/components/types/superadminType';
import { X } from 'lucide-react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import { getLoggedInSuperadminId } from '@/utils/auth';
import { toast, ToastContainer } from 'react-toastify';
import { createTeacher, deleteTeacherById, getAllTeacher, updateTeacherById } from '@/api/superAdminApi';
import { useNavigate } from 'react-router-dom';


interface SidebarContentProps {
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
    userId: string;
    password: string;
  }>({
    id: undefined,
    name: '',
    dept: '',
    userId: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setTeacherData(prev => ({ ...prev, [name]: value }));
  };
  //-----------add teacher 
  const handleOpenAddModal = () => {
    setIsEditMode(false); // not editing, it's new
    setTeacherData({ id: undefined, name: '', dept: '', userId: '', password: '' });
    setShowAddModal(true);
  };
  //-----edit teacher
  const [isEditMode, setIsEditMode] = useState(false);

  const handleTeacherEdit = (teacher: Teacher) => {
    setIsEditMode(true);
    setTeacherData({
      id: teacher.id,
      name: teacher.name,
      dept: teacher.department,
      userId: teacher.userId,
      password: teacher.password
    });
    setShowAddModal(true);
  };

  const handleClear = () => {
    setTeacherData({

      name: "",
      dept: "",
      userId: "",
      password: "",
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
  const handleDeleteTeacher = (teacher: Teacher) => {
    console.log("Delete", teacher)
    setShowDeleteModal(!showDeleteModal)
    setSelectedTeacher(teacher);
    console.log("Delete activity", teacher)
  }

  const confirmDelete = async () => {
    if (!selectedTeacher || selectedTeacher.id === undefined) return;

    try {
      const res = await deleteTeacherById(selectedTeacher.id);

      if (res.status) {
        toast.success(res.message);
      }

      setShowDeleteModal(false);
      getAllDetails();
    } catch (err) {
      console.error("Error deleting teacher", err);
      toast.error("Failed to delete teacher. Please try again.");
    }
  };



  const superadminId = getLoggedInSuperadminId();

  console.log("Superadminid", superadminId)



  const handleAddTeacher = async () => {
    const { name, dept, userId, password } = teacherData;

    if (!name) {
      toast.error('Email is required!');
      return;
    }

    if (!dept) {
      toast.error('Department is required!');
      return;
    }
    if (!userId) {
      toast.error('User ID is required!');
      return;
    }
    if (!password) {
      toast.error('Password is required!');
      return;
    }


    createTeacher(teacherData)
      .then((response) => {
        if (response.status) {
          console.log("add teacher", response)
          toast.success(response.message);
          setShowAddModal(!showAddModal);
          getAllDetails();
        } else {
          toast.error(response.message);
        }
      })
      .catch((error: any) => {

        toast.error(error?.message);
      });

  };


  const handleUpdateTeacher = async () => {
    const updatedData = {
      name: teacherData.name,
      department: teacherData.dept,
      userId: teacherData.userId,
      password: teacherData.password
    };

    if (!teacherData.id) {
      console.error("Teacher ID is missing for update");
      return;
    }

    try {
      const response = await updateTeacherById(teacherData.id, updatedData);
      console.log("Update successful", response);
    } catch (err) {
      console.error("Update failed", err);
    }
  };


  const getAllDetails = async () => {
    const allTeachers = getAllTeacher();
    allTeachers
      .then((res) => {
        console.log("all details", res);
        setBackendAllTeachers(res)
      })
      .catch((err) => {
        console.error("Error fetching teachers", err);
      });
  }

  useEffect(() => {
    getAllDetails();
  }, []);

  const [backendAllTeachers, setBackendAllTeachers] = useState<GetAllTeachersResponse>();
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

  return (
    <div className="flex flex-col min-h-screen">

      <ToastContainer position='top-right' />
      <div className="flex h-[100vh] overflow-hidden">

        {/* Sidebar for Desktop */}
        <div className="hidden md:block bg-gray-900 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto">
          <SidebarContent selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
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
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
        )}

        <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>

          <div className="max-h-screen bg-white max-w-[90vw] sm:max-w-[95vw] md:max-w-[60vw] mt-[5%] mx-auto md:mx-[20%] flex flex-col rounded-lg">
            <Box
              sx={{
                flex: 1,
                display: "flex",
                bgcolor: "#2a4054",
                borderRadius: "0em",
              }}
            >
              <Box sx={{ flex: 1 }} />
              <p className="flex-1 text-white flex justify-center text-center my-[0.15em] sm:my-[0.15em] md:my-[0.5em] text-[0.85rem] sm:text-[1rem] md:text-[1.2rem] whitespace-nowrap">
                {isEditMode ? 'Edit Teacher' : 'Add New Teacher'}
              </p>

              <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  size="small"
                  sx={{ p: "0.25em", m: 0 }}
                  onClick={() => setShowAddModal(false)}
                >
                  <Close fontSize="small" sx={{ p: 0, m: 0 }} htmlColor="white" />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                paddingTop: "0.5em",
                minHeight: "40vh",
              }}
            >

              <div className=" p-6 bg-white  border-gray-200 space-y-4 modalContainer">


                {/* Input Fields */}
                <div className="my-auto ">
                  <div className="flex gap-1 flex-col mb-1 sm:mb-0 sm:flex-row" style={{ marginBottom: "0.35em" }}>


                    <div className='flex flex-1  flex-row xs:flex-col' >
                      <label htmlFor="" className='flex-1/3 modalLabel '>Teacher Name :</label>
                      <input
                        type="text"
                        name="name"
                        value={teacherData.name}
                        onChange={handleChange}
                        placeholder=""
                        className="w-full flex-2/3 px-4 py-1 border border-gray-300 rounded-md modalInput "
                      />
                    </div>
                    <div className='flex flex-1'>
                      <label htmlFor="" className='flex-1/3 modalLabel'>Department :</label>
                      <input
                        type="text"
                        name="dept"
                        value={teacherData.dept}
                        onChange={handleChange}
                        placeholder=""
                        className="w-full flex-2/3 px-4 py-1 border border-gray-300 rounded-md  modalInput"
                      />
                    </div>
                  </div>


                  <div className="flex gap-1 flex-col sm:flex-row">
                    <div className='flex flex-1'>
                      <label htmlFor="" className='flex-1/3 modalLabel'>User Id :</label>
                      <input
                        type="text"
                        name="userId"
                        value={teacherData.userId}
                        onChange={handleChange}
                        placeholder=""
                        className="w-full flex-2/3 px-4 py-1 border border-gray-300 rounded-md modalInput"
                      />
                    </div>
                    <div className='flex flex-1'>
                      <label htmlFor="" className='flex-1/3 modalLabel'>Password :</label>
                      <input
                        type="text"
                        name="password"
                        value={teacherData.password}
                        onChange={handleChange}
                        placeholder=""
                        className="w-full flex-2/3 px-4 py-1 border border-gray-300 rounded-md modalInput "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Box>
            <Divider sx={{ width: "100%", borderBottomWidth: 2, borderColor: "gray" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingY: "0.35em",
                paddingX: "0.25em",
                marginRight: "0.5em",
                gap: 1
              }}
            >
              <Button
                sx={{
                  ...superadminStyle.button, color: "white", background: "green"

                }}
                onClick={isEditMode ? handleUpdateTeacher : handleAddTeacher}> {isEditMode ? 'Update' : 'Add'}</Button>
              <Button sx={{ ...superadminStyle.button, color: "white", background: "red" }} onClick={() => handleClear()}>Clear</Button>
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
                      <p className="text-gray-700 text-base">{backendAllTeachers?.college.college_name}</p>
                    </div>

                    <div className="bg-purple-100 rounded-xl shadow-md p-5 border border-purple-200">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800">
                        <FaChalkboardTeacher className="text-purple-500 text-xl" />
                        Total Teachers
                      </h3>
                      <p className="text-gray-700 text-base">{backendAllTeachers?.totalTeachers}</p>
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
                      <p className="text-gray-700 text-base">{backendAllTeachers?.college.college_code}</p>
                    </div>

                    {/* 2/3 Card */}
                    <div className="lg:col-span-2 bg-orange-100 rounded-xl shadow-md p-5 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Current Plan</h3>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <p className="text-md font-medium">Premium</p>
                          <p className="text-sm text-gray-700">
                            Every student needs to pay ₹10 under the current plan.
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-l hover:bg-blue-700 transition">
                          Upgrade Plan
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              }


              {selectedSection === "users" && (

                <div>
                  <Button variant="contained" sx={{
                    ...superadminStyle.button, mb: 2,
                  }} onClick={() => handleOpenAddModal()}>Add Teacher</Button>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#2a4054", height: "30px", }}>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Teacher Name</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Department</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>User ID</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Password</TableCell>
                          <TableCell sx={{ ...superadminStyle.headerStyle, fontSize: "0.8em" }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      {backendAllTeachers?.totalTeachers ?
                        <TableBody>
                          {backendAllTeachers?.teachers.map((teacher, index) => (
                            <TableRow key={index} sx={{ background: index % 2 ? "#eceff1" : "white" }}>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.name}</TableCell>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.department}</TableCell>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.userId}</TableCell>
                              <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "0.8em" }}>{teacher.password}</TableCell>
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

const SidebarContent: React.FC<SidebarContentProps> = ({ selectedSection, setSelectedSection }) => {
  return (
    <div className="flex flex-col h-full">

      {/* Top: Avatar and Menu */}
      <div className="flex items-center space-x-4 p-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Super Admin</h2>
          <p className="text-sm text-gray-400">superadmin@portal.com</p>
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
