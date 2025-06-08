import React, { useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Box, Modal, Typography,} from "@mui/material";
import TeacherVerifyTable from "@/components/TeacherVerifyTable";
import TeacherDetails from "@/components/TeacherComponent/TeacherDetails";
import { teacherPageModalStyle } from "@/components/styles/style";

import { firstYear } from "@/components/data/data";

interface SidebarContentProps {
  selectedSection: string;
  setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
}

const TeacherPage = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
 

 




  //-----------docs show modal
  const [openDocsModal, setOpenDocsModal] = useState(false);
  const [docLink, setDocLink] = useState<string | null>(null);

 


  const handleClose = () => {
    setOpenDocsModal(false);
    setDocLink(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
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
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="inset-0 bg-gray-900 text-white w-64 z-50 px-2 pt-2 md:hidden sticky top-0 h-screen overflow-y-auto">
          <SidebarContent
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
          <div className="text-right pr-4">
            <Button
              className="mt-4 bg-white text-black"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar with menu icon */}
        <div className="flex justify-end p-4 md:hidden">
          <Button
            className="text-black bg-transparent hover:bg-gray-100 "
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <IoReorderThree className="text-xl scale-150" />
          </Button>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <p className="mt-2 text-gray-700">
            You are viewing the <strong>{selectedSection}</strong> section.
          </p>

          {/* Render Section Content */}
          <div className="mt-6">
            {selectedSection === "dashboard" && (
              <TeacherDetails/>
            )}

            {selectedSection === "first" && (
              <div>
                Your are in first year
               <TeacherVerifyTable/>
              </div>
            )}
            {selectedSection === "second" && <div>
                Your are in second year
               
              </div>}
            {selectedSection === "third" && (
              <div>
                Your are in third year
               
              </div>
            )}
            {selectedSection === "four" && <div>
                Your are in fourth year
               
              </div>}
            {selectedSection === "logout" && <p>Logging out...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({
  selectedSection,
  setSelectedSection,
}) => (
  <>
    <div className="flex items-center space-x-4 p-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>TP</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-semibold">Mr. Sharma</h2>
        <p className="text-sm text-gray-400">Teacher ID: TCH2025</p>
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
  </>
);

export default TeacherPage;
