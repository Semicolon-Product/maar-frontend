import React, { useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Box, Collapse, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { superadminStyle } from '@/components/styles/style';
import { students } from '@/components/data/data';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

interface SidebarContentProps {
    selectedSection: string;
    setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
}
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    height: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    borderRadius: 2,
    p: 2,
};

const TeacherPage = () => {
    const [selectedSection, setSelectedSection] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [checkedRows, setCheckedRows] = useState<{ [key: number]: boolean }>({});

    const handleCheckboxChange = (idx: number) => {
        setCheckedRows((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };


    //-----------docs show modal
    const [openDocsModal, setOpenDocsModal] = useState(false);
    const [docLink, setDocLink] = useState<string | null>(null);

    const handleDocsModal = (link?: string) => {
        if (link) {
            setDocLink(link);
            setOpenDocsModal(true);
        }
    };

    const handleClose = () => {
        setOpenDocsModal(false);
        setDocLink(null);
    };

    return (
        <div className="flex h-screen overflow-hidden">

            <Modal open={openDocsModal} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>Document Link</Typography>
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
                <SidebarContent selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            </div>

            {/* Sidebar for Mobile */}
            {isSidebarOpen && (
                <div className="inset-0 bg-gray-900 text-white w-64 z-50 px-2 pt-2 md:hidden sticky top-0 h-screen overflow-y-auto">
                    <SidebarContent selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
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
                            <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Teacher Information</h2>
                                <div className="space-y-2 text-gray-700">
                                    <p><strong>Name:</strong> Mr. Sekhar Ghosh</p>
                                    <p><strong>Email:</strong> sekhar.ghosh@school.edu</p>
                                    <p><strong>Department:</strong> Computer Science</p>
                                    <p><strong>Subjects:</strong> Data Structures, Web Development, Algorithms</p>
                                </div>
                            </div>
                        )}

                        {selectedSection === "first" && <div>
                            Your are in first year
                            <div>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: "#2a4054", height: "30px" }}>
                                                <TableCell sx={superadminStyle.headerStyle}>Sr No</TableCell>
                                                <TableCell sx={superadminStyle.headerStyle}>Student Name</TableCell>
                                                <TableCell sx={superadminStyle.headerStyle}>Roll No</TableCell>
                                                <TableCell sx={superadminStyle.headerStyle}>Total Acquired Points</TableCell>
                                                <TableCell sx={superadminStyle.headerStyle}>Status</TableCell>
                                                <TableCell sx={superadminStyle.headerStyle}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {students.map((student, index) => (
                                                <React.Fragment key={index}>
                                                    <TableRow sx={{ background: index % 2 ? "#eceff1" : "white" }}>
                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }}>{index + 1}</TableCell>
                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }}>{student.name}</TableCell>
                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }}>{student.rollNo}</TableCell>
                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }}>{student.points}</TableCell>
                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }}>
                                                            {student.verified ? (
                                                                <CheckCircleIcon sx={{ color: 'green', fontSize: '20px' }} />
                                                            ) : (
                                                                <CancelIcon sx={{ color: 'red', fontSize: '20px' }} />
                                                            )}
                                                        </TableCell>
                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px", }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                                            >
                                                                {openIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell colSpan={6} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                                            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                                                                <Box margin={0.5}>
                                                                    <strong>Activities:</strong>
                                                                    {student.activities && student.activities.length > 0 ? (
                                                                        <Box>
                                                                            <Table size="small" sx={{ mt: 1, border: "1px solid #ccc" }}>
                                                                                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                                                                                    <TableRow>
                                                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }}>Serial No.</TableCell>
                                                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }} >Activity Name</TableCell>
                                                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }} >Date</TableCell>
                                                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }} >Points</TableCell>
                                                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }}  >Docs</TableCell>
                                                                                        <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px" }} >Verify</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody >
                                                                                    {student.activities.map((activity, idx) => (
                                                                                        <TableRow
                                                                                            key={idx}
                                                                                            sx={{ color: checkedRows[idx] ? "green" : "inherit" }}
                                                                                        >
                                                                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px", color: checkedRows[idx] ? "green" : "inherit" }}>
                                                                                                {activity.serialNo}
                                                                                            </TableCell>
                                                                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px", color: checkedRows[idx] ? "green" : "inherit" }}>
                                                                                                {activity.name}
                                                                                            </TableCell>
                                                                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px", color: checkedRows[idx] ? "green" : "inherit" }}>
                                                                                                {activity.date}
                                                                                            </TableCell>
                                                                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: "4px", color: checkedRows[idx] ? "green" : "inherit" }}>
                                                                                                {activity.points}
                                                                                            </TableCell>
                                                                                            <TableCell
                                                                                                onClick={() => {

                                                                                                    handleDocsModal(activity.link);

                                                                                                }}


                                                                                                sx={{ ...superadminStyle.cellStyle, py: "4px", color: checkedRows[idx] ? "green" : "inherit", cursor: "pointer" }}>

                                                                                                {activity.docs}

                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    checked={checkedRows[idx] || false}
                                                                                                    onChange={() => handleCheckboxChange(idx)}
                                                                                                />
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    ))}

                                                                                </TableBody>
                                                                            </Table>
                                                                            <div className='flex justify-end mt-1 '>
                                                                                <button className='px-4 py-1 text-white bg-green-400 hover:bg-green-500 cursor-pointer'>Submit</button>
                                                                            </div>


                                                                        </Box>

                                                                    ) : (
                                                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                                                            There is no record.
                                                                        </Typography>
                                                                    )}
                                                                </Box>

                                                            </Collapse>
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </div>


                        </div>}
                        {selectedSection === "second" && <p>Manage attendance records.2</p>}
                        {selectedSection === "third" && <p>Create and review assignments3.</p>}
                        {selectedSection === "four" && <p>View and reply to messages.4</p>}
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

export default TeacherPage;
