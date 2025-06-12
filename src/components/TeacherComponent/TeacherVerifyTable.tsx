import React, { useState } from "react";

import { toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Box,
    Button,
    Collapse,
    IconButton,

    Modal,

    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { superadminStyle, teacherPageModalStyle } from "@/components/styles/style";
//import { students } from "@/components/data/data";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Close from '@mui/icons-material/Close';
import type { individualActivity, TeacherVerifyTableProps } from "../types/superadminType";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import pdfIcon from '../../../public/assets/PDF_file_icon.png'
import pdf from '../../../public/assets/4726010.png'
import { generateIndividualReportPDF } from "../../pdfs/generateIndividualReportPDF";
import { generateAllReports } from "@/pdfs/generateAllReports";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
interface Activity {
    serialNo: string;
    name: string;
    date: string;
    points: number;
    docs: string;
    link: string;
    status: boolean;
}

const TeacherVerifyTable: React.FC<TeacherVerifyTableProps> = ({ data, signature }) => {


    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [verifiedRows, setVerifiedRows] = useState<{
        [studentIndex: number]: { [activityIndex: number]: boolean };
    }>({});

    const [submittedStudents, setSubmittedStudents] = useState<{
        [studentIndex: number]: boolean;
    }>({});

    const [checkedRows, setCheckedRows] = useState<{
        [studentIndex: number]: { [activityIndex: number]: boolean };
    }>({});

    const handleCheckboxChange = (
        studentIndex: number,
        activityIndex: number
    ) => {
        setCheckedRows((prev) => ({
            ...prev,
            [studentIndex]: {
                ...prev[studentIndex],
                [activityIndex]: !prev[studentIndex]?.[activityIndex],
            },
        }));
    };

    //-----------docs show modal



    const handleSubmit = (studentIndex: number, student: any) => {
        const selected = checkedRows[studentIndex] || {};

        const selectedActivities = student.activities.filter(
            (_: any, idx: number) => selected[idx]
        );
        console.log("Selected Activities:", selectedActivities);

        // ✅ Update verifiedRows for this student
        setVerifiedRows((prev) => ({
            ...prev,
            [studentIndex]: {
                ...prev[studentIndex],
                ...Object.fromEntries(
                    Object.entries(selected).filter(([_, isChecked]) => isChecked)
                ),
            },
        }));

        // Optional: clear checkboxes
        setCheckedRows((prev) => ({
            ...prev,
            [studentIndex]: {},
        }));

        toast.success("Activities Submitted and verified!", {
            position: "top-right",
            autoClose: 3000,
        });
    };
    const [openDocsModal, setOpenDocsModal] = useState(false);
    const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);





    const handleClose = () => {
        setOpenDocsModal(false);
    };


    const handleDocsModal = (activity: Activity) => {
        setCurrentActivity(activity)
        setOpenDocsModal(!openDocsModal)

    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDeleteActivity = (activity: individualActivity) => {
        setShowDeleteModal(!showDeleteModal)
        console.log("Delete activity", activity)
    }
    const downloadIndividualReport = (individualReportdata: any) => {
        generateIndividualReportPDF(individualReportdata)
    }

    const students = data
    return (
        <div>
            <Modal open={openDocsModal} onClose={handleClose}>
                <Box sx={teacherPageModalStyle}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#2a4054",
                            padding: "10px 16px",

                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#ffffff",
                                flexGrow: 1,
                                textAlign: "center",
                                marginRight: "32px", // For centering due to close icon
                            }}
                        >
                            {`${currentActivity?.serialNo}. ${currentActivity?.name}`}

                        </Typography>

                        <Button
                            onClick={handleClose}
                            sx={{
                                minWidth: "auto",
                                padding: "4px",
                                color: "#ffffff",
                            }}
                        >
                            ✕
                        </Button>
                    </Box>

                    {/* Body */}
                    <Box sx={{ padding: "16px" }}>
                        {currentActivity?.link ? (
                            <iframe
                                src={currentActivity.link}
                                style={{
                                    width: "100%",
                                    height: "80vh",
                                    border: "none",
                                }}
                                title="Document"
                            />
                        ) : (
                            <Typography>No document available.</Typography>
                        )}

                        {/* Footer */}

                    </Box>
                </Box>
            </Modal>
            <Dialog open={showDeleteModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this activity?
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
                        //onClick={handleDelete} // Replace with your actual delete function
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Delete
                    </button>

                </DialogActions>
            </Dialog>

            <div className="relative">

                {/* Top-right image */}
                <div className="flex justify-between items-center px-4 py-2">
                    {/* Left side: status section */}
                    <div className="flex items-center gap-6 text-base font-medium text-gray-700">
                        {/* Submit & Remain */}
                        <div className="flex gap-2">
                            <p className="text-green-600">Submit: 80</p>;
                            <p className="text-red-600">Remain: 20</p>;
                        </div>

                        {/* Verified */}
                        <div className="flex items-center gap-1 text-green-600">
                            Verified:
                            <CheckCircleIcon sx={{ color: "green", fontSize: "20px" }} />
                            (20)
                        </div>;

                        {/* Pending */}
                        <div className="flex items-center gap-1 text-red-600">
                            Pending:
                            <CancelIcon sx={{ color: "#c9352a", fontSize: "20px" }} />
                            (80)
                        </div>;
                    </div>

                    {/* Right side: download icon */}
                    <div className="flex justify-end">
                        <Tooltip title="Download All Students Report">
                            <img
                                onClick={() => generateAllReports(students, signature)}
                                src={pdf}
                                height={100}
                                width={100}
                                className="scale-50 h-18 w-18 p-2 rounded-3xl transition-all duration-300 ease-in-out hover:bg-amber-100 cursor-pointer"
                                alt="Download PDF"
                            />
                        </Tooltip>
                    </div>
                </div>




                <TableContainer component={Paper}>
                    <Table sx={{ fontSize: "18px" }}>
                        <TableHead>
                            <TableRow
                                sx={{ backgroundColor: "#2a4054", height: "30px" }}
                            >
                                <TableCell sx={superadminStyle.headerStyle}>
                                    Sr No
                                </TableCell>
                                <TableCell sx={superadminStyle.headerStyle}>
                                    Student Name
                                </TableCell>
                                <TableCell sx={superadminStyle.headerStyle}>
                                    Roll No
                                </TableCell>
                                <TableCell sx={superadminStyle.headerStyle}>
                                    Total Acquired Points
                                </TableCell>
                                <TableCell sx={superadminStyle.headerStyle}>
                                    Report
                                </TableCell>
                                <TableCell sx={superadminStyle.headerStyle}>
                                    Status
                                </TableCell>
                                <TableCell sx={superadminStyle.headerStyle}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student: any, index: any) => (
                                <React.Fragment key={index}>
                                    <TableRow
                                        sx={{
                                            background: index % 2 ? "#eceff1" : "white",
                                        }}
                                    >
                                        <TableCell
                                            sx={{ ...superadminStyle.cellStyle, py: "4px" }}
                                        >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            sx={{ ...superadminStyle.cellStyle, py: "4px" }}
                                        >
                                            {student.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{ ...superadminStyle.cellStyle, py: "4px" }}
                                        >
                                            {student.rollNo}
                                        </TableCell>
                                        <TableCell
                                            sx={{ ...superadminStyle.cellStyle, py: "4px" }}
                                        >
                                            {student.points}
                                        </TableCell>
                                        <TableCell
                                            sx={{ ...superadminStyle.cellStyle, py: "4px" }}
                                        >
                                            <Tooltip title="Download Report">
                                            <IconButton onClick={() => downloadIndividualReport(student)}>
                                                <BsFileEarmarkPdfFill color="#cc3f35" size={19} />
                                            </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell
                                            sx={{ ...superadminStyle.cellStyle, py: "4px" }}
                                        >
                                            {student.verified ? (
                                                <CheckCircleIcon sx={{ color: "green", fontSize: "20px" }} />
                                            ) : (
                                                <CancelIcon sx={{ color: "#c9352a", fontSize: "20px" }} />
                                            )}

                                        </TableCell>

                                        <TableCell
                                            sx={{ ...superadminStyle.cellStyle, py: "4px" }}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    setOpenIndex(
                                                        openIndex === index ? null : index
                                                    )
                                                }
                                            >
                                                {openIndex === index ? (
                                                    <KeyboardArrowUpIcon />
                                                ) : (
                                                    <KeyboardArrowDownIcon />
                                                )}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            sx={{ paddingBottom: 0, paddingTop: 0 }}
                                        >
                                            <Collapse
                                                in={openIndex === index}
                                                timeout="auto"
                                                unmountOnExit
                                            >
                                                <Box margin={0.5}>
                                                    <strong>Activities:</strong>
                                                    {student.activities &&
                                                        student.activities.length > 0 ? (
                                                        <Box>
                                                            <Table
                                                                size="small"
                                                                sx={{
                                                                    mt: 1,
                                                                    border: "1px solid #ccc",
                                                                    fontSize: "20px",
                                                                }}
                                                            >
                                                                <TableHead

                                                                >
                                                                    <TableRow sx={{ backgroundColor: "#00809D", height: "30px" }}>
                                                                        <TableCell
                                                                            sx={{
                                                                                ...superadminStyle.headerStyle,
                                                                                py: "4px",
                                                                            }}
                                                                        >
                                                                            Serial No.
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                ...superadminStyle.headerStyle,
                                                                                py: "4px",
                                                                            }}
                                                                        >
                                                                            Activity Name
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                ...superadminStyle.headerStyle,
                                                                                py: "4px",
                                                                            }}
                                                                        >
                                                                            Date
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                ...superadminStyle.headerStyle,
                                                                                py: "4px",
                                                                            }}
                                                                        >
                                                                            Points
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                ...superadminStyle.headerStyle,
                                                                                py: "4px",
                                                                            }}
                                                                        >
                                                                            Docs
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                ...superadminStyle.headerStyle,
                                                                                py: "4px",
                                                                            }}
                                                                        >
                                                                            Verify
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                ...superadminStyle.headerStyle,
                                                                                py: "4px",
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {student.activities.map((activity: individualActivity, idx: number) => (
                                                                        <TableRow
                                                                            key={idx}
                                                                            sx={{
                                                                                background:
                                                                                    idx % 2
                                                                                        ? "#eceff1"
                                                                                        : "white",
                                                                            }}
                                                                        >
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.cellStyle,

                                                                                }}
                                                                            >
                                                                                {activity.serialNo}
                                                                            </TableCell>
                                                                            {/* Repeat same for other cells like activity.name, date, etc. */}

                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.cellStyle,
                                                                                    py: "4px",

                                                                                }}
                                                                            >
                                                                                {activity.name}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.cellStyle,
                                                                                    py: "4px",

                                                                                }}
                                                                            >
                                                                                {activity.date}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.cellStyle,
                                                                                    py: "4px",

                                                                                }}
                                                                            >
                                                                                {activity.points}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                onClick={() => {
                                                                                    handleDocsModal(
                                                                                        activity
                                                                                    );
                                                                                }}
                                                                                sx={{
                                                                                    ...superadminStyle.cellStyle,
                                                                                    py: "4px",
                                                                                    color: "blue",
                                                                                    cursor: "pointer",
                                                                                    textDecoration:
                                                                                        "underline",
                                                                                }}
                                                                            >
                                                                                {activity.docs}
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.cellStyle,

                                                                                }}
                                                                            >
                                                                                <input
                                                                                    className=" w-3 h-3 mt-0.5 accent-blue-600 "
                                                                                    type="checkbox"
                                                                                    checked={checkedRows[index]?.[idx] || false}
                                                                                    onChange={() => handleCheckboxChange(index, idx)}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.cellStyle,

                                                                                }}
                                                                            >
                                                                                <IconButton aria-label="delete" color="error" onClick={() => handleDeleteActivity(activity)}>
                                                                                    <DeleteIcon sx={{ fontSize: "20px" }} />
                                                                                </IconButton>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                    )}
                                                                </TableBody>
                                                            </Table>
                                                            <div className="flex justify-end mt-1 ">
                                                                <button
                                                                    className="px-4 py-1 rounded-sm text-white bg-green-600 hover:bg-green-500 cursor-pointer"
                                                                    onClick={() =>
                                                                        handleSubmit(index, student)
                                                                    }
                                                                >
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </Box>
                                                    ) : (
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            sx={{ mt: 1 }}
                                                        >
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
        </div>
    )
}

export default TeacherVerifyTable
