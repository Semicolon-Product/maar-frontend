import React, { useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
import type { Teacher } from '@/components/types/superadminType';


interface SidebarContentProps {
  selectedSection: string;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
}

const SuperAdminPage = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentDateTime = new Date().toLocaleString();
  //--------------manage user-------------
  const [showAddModal, setShowAddModal] = useState(false)
  const [teacherData, setTeacherData] = useState({
    name: '',
    dept: '',
    userId: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacherData(prev => ({ ...prev, [name]: value }));
  };

  //-----edit teacher
  const handleTeacherEdit = (teacher: Teacher) => {
    setTeacherData({
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


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar for Desktop */}
      <div className="hidden md:block bg-gray-900 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto">
        <SidebarContent selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className=" absolute inset-0 bg-gray-900 text-white w-64  px-2 pt-2 md:hidden top-0 h-screen overflow-y-auto z-[999]">
          <SidebarContent selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
          <div className="text-right pr-4">
            <Button
              className="mt-4 bg-white text-black"
              onClick={() => setIsSidebarOpen(false)}
            >
              Close
            </Button>
          </div>
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
  Add New Teacher
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
               <div className="flex gap-1 flex-col mb-1 sm:mb-0 sm:flex-row" style={{marginBottom:"0.35em"}}>


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
            <Button sx={{ ...superadminStyle.button, color: "white", background: "green" }}>Add</Button>
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
          <h1 className="text-2xl font-bold">Superadmin Portal</h1>
          <p className="mt-2 text-gray-700">
            You are viewing the <strong>{selectedSection}</strong> section.
          </p>

          {/* Render Section Content */}
          <div className="mt-6">
            {selectedSection === "dashboard" && <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Current Date and Time */}
              <div className="bg-white rounded-2xl shadow-md p-5 border">
                <h3 className="text-lg font-semibold mb-2">📅 Current Date & Time</h3>
                <p className="text-gray-700">{currentDateTime}</p>
              </div>

              {/* Institute Name */}
              <div className="bg-white rounded-2xl shadow-md p-5 border">
                <h3 className="text-lg font-semibold mb-2">🏫 Institute Name</h3>
                <p className="text-gray-700">Dream Institute of Technology</p>
              </div>

              {/* Total Teachers */}
              <div className="bg-white rounded-2xl shadow-md p-5 border">
                <h3 className="text-lg font-semibold mb-2">🧑‍🏫 Total Teachers</h3>
                <p className="text-gray-700">42</p>
              </div>

              {/* Institute Code */}
              <div className="bg-white rounded-2xl shadow-md p-5 border">
                <h3 className="text-lg font-semibold mb-2">🏷️ Institute Code</h3>
                <p className="text-gray-700">DIT-CSE-2025</p>
              </div>

              {/* Current Plan */}
              <div className="bg-white rounded-2xl shadow-md p-5 border col-span-1 md:col-span-2 lg:col-span-3">
                <h3 className="text-lg font-semibold mb-2">💳 Current Plan</h3>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <p className="text-gray-800 text-md">Premium Plan</p>
                    <p className="text-gray-500 text-sm">Access to full features, analytics, and support.</p>
                  </div>
                  <button className="mt-3 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>}


            {selectedSection === "users" && (

              <div>
                <Button variant="contained" sx={{
                  ...superadminStyle.button, mb: 2,
                }} onClick={() => setShowAddModal(!showAddModal)}>Add Teacher</Button>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#2a4054", height: "30px", }}>
                        <TableCell sx={superadminStyle.headerStyle}>Teacher Name</TableCell>
                        <TableCell sx={superadminStyle.headerStyle}>Department</TableCell>
                        <TableCell sx={superadminStyle.headerStyle}>User ID</TableCell>
                        <TableCell sx={superadminStyle.headerStyle}>Password</TableCell>
                        <TableCell sx={superadminStyle.headerStyle}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teachers.map((teacher, index) => (
                        <TableRow key={index} sx={{ background: index % 2 ? "#eceff1" : "white" }}>
                          <TableCell sx={superadminStyle.cellStyle}>{teacher.name}</TableCell>
                          <TableCell sx={superadminStyle.cellStyle}>{teacher.department}</TableCell>
                          <TableCell sx={superadminStyle.cellStyle}>{teacher.userId}</TableCell>
                          <TableCell sx={superadminStyle.cellStyle}>{teacher.password}</TableCell>
                          <TableCell sx={superadminStyle.cellStyle}>
                            <IconButton aria-label="edit" color="primary" onClick={() => handleTeacherEdit(teacher)}>
                              <EditIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                            <IconButton aria-label="delete" color="error" onClick={() => console.log("Delete", teacher)}>
                              <DeleteIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </div>

            )}
            {selectedSection === "settings" && <p>Site settings and configurations.</p>}
            {selectedSection === "reports" && <p>Reports and analytics.</p>}
            {selectedSection === "logout" && <p>Logging out...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ selectedSection, setSelectedSection }) => (
  <>
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

    <ul className="space-y-2 mt-4">
      {[
        { id: "dashboard", label: "Dashboard" },
        { id: "users", label: "Manage Users" },
        { id: "settings", label: "Site Settings" },
        { id: "reports", label: "Reports" },
        { id: "logout", label: "Logout" },
      ].map(({ id, label }) => (
        <li
          key={id}
          className={`p-1 rounded font-bold cursor-pointer ${selectedSection === id
            ? " text-blue-300"
            : "hover:text-blue-500"
            }`}
          onClick={() => setSelectedSection(id)}
        >
          {label}
        </li>
      ))}
    </ul>
  </>
);

export default SuperAdminPage;
