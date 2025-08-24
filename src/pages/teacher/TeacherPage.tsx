import React, { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Modal, Typography, } from "@mui/material";
import TeacherVerifyTable from "@/components/TeacherComponent/TeacherVerifyTable";
import TeacherDetails from "@/components/TeacherComponent/TeacherDetails";
import { teacherPageModalStyle } from "@/components/styles/style";

//import { allStudentDetails } from "@/components/data/data";
import { X } from "lucide-react";
//import { studentdata } from "@/components/data/data";
import { getApi } from "@/api";
import { useNavigate } from "react-router-dom";
import type { BackendStudentDetails, teacherGetDetails, TeacherSideBarProps,  } from "@/components/types/superadminType";

interface SidebarContentProps {
data?:TeacherSideBarProps,
  selectedSection: string;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
}

const TeacherPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [backendAllStudentDetails,setBackendAllStudentDetails] =useState<BackendStudentDetails> ();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //-----------docs show modal
  const [openDocsModal, setOpenDocsModal] = useState(false);
  const [docLink, setDocLink] = useState<string | null>(null);
  const handleClose = () => {
    setOpenDocsModal(false);
    setDocLink(null);
  };
  useEffect(() => {
    getTeacherDetails();
    getAllYearStudentDetails();
  }, [])
  const [teacherDetails, setTeacherDetails] = useState<teacherGetDetails>();
  const getTeacherDetails = async () => {
    await getApi("teacher/getDetails").then((res) => {
      setTeacherDetails(res.data);
    })
  }

  const getAllYearStudentDetails = async()=>{
    await getApi("student/getYearlyDetails").then((res)=>{
      setBackendAllStudentDetails(res);
      //console.log("get student details",res);
    })
  }
   if (selectedSection === "logout") {
        localStorage.removeItem("token");
        navigate("/");
    }
  //console.log("in page ::",teacherDetails)
  console.log("backendAllStudentDetails",backendAllStudentDetails?.teacherSignature)
  console.log("teacjer deital::",teacherDetails)
  
  return (
    <div className="flex h-screen overflow-hidden" >
      <ToastContainer />
      <Modal open={openDocsModal} onClose={handleClose}>
        <Box sx={teacherPageModalStyle}>
          <Typography variant="h6" mb={2}>
            Document Link
          </Typography>
          {docLink ? (
            <iframe
              src={docLink}
              style={{
                width: "100%",
                height: "calc(100% - 48px)",
                border: "none",
              }}
              title="Document"
            />
          ) : (
            <Typography>No document available.</Typography>
          )}

          <Box mt={3} textAlign="right">
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Box>
      </Modal>

      {/* Sidebar for Desktop */}
      <div className="hidden md:block bg-gray-900 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto">
        <SidebarContent
           data={teacherDetails?.teacher}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="flex absolute inset-0 bg-gray-900 text-white w-64 px-2 pt-2 md:hidden top-0 h-screen overflow-y-auto z-[999] flex-col">

          {/* Close icon */}
          <div className="flex justify-end p-2">
            <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-red-400">
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
            <h2 className="text-base md:text-2xl font-semibold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-green-900 rounded-sm shadow-md px-3 py-1 w-fit">
              {selectedSection === "first" && "First Year Student Data"}
              {selectedSection === "second" && "Second Year Student Data"}
              {selectedSection === "third" && "Third Year Student Data"}
              {selectedSection === "four" && "Fourth Year Student Data"}
            </h2>
          )}

          {/* Menu icon - show only on small screens */}
          <div className="md:hidden">
            <Button
              className="text-black bg-gray-100 hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <IoReorderThree className="text-xl scale-150" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-0">
          <div className="mt-0">
            {selectedSection === "dashboard" && <TeacherDetails data={teacherDetails} />}

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

            {selectedSection === "logout" && <p>Logging out...</p>}
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

  console.log("in side bar",data)
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-4 p-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>TP</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{data?.name}</h2>
            <p className="text-sm text-gray-400">{data?.email}</p>
          </div>
        </div>

        <ul className="space-y-4 mt-4">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "first", label: "First Year" },
            { id: "second", label: "Second Year" },
            { id: "third", label: "Third Year" },
            { id: "four", label: "Fourth Year" },
            { id: "logout", label: "Logout" },
          ].map(({ id, label }) => (
            <li
              key={id}
              className={`p-1 rounded font-bold cursor-pointer ${selectedSection === id ? " text-blue-300" : "hover:text-blue-500"
                }`}
              onClick={() => setSelectedSection(id)}
            >
              {label}
            </li>
          ))}
        </ul>
        <div className="text-center text-xs mt-auto text-gray-400 py-4 border-t border-gray-400">
          © {new Date().getFullYear()} Abc Pvt Ltd
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
