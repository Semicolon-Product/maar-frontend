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


interface Activity {
    serialNo: string;
    name: string;
    date: string;
    points: number;
    docs: string;
    link: string;
    status: boolean;
}

const TeacherVerifyTable: React.FC<TeacherVerifyTableProps> = ({ data }) => {


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

            <div>
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
                                            {student.verified ? (
                                                <CheckCircleIcon sx={{ color: "green", fontSize: "20px" }} />
                                            ) : (
                                                <CancelIcon sx={{ color: "red", fontSize: "20px" }} />
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
                                                                            </TableRow>
                                                                        )
                                                                    )}
                                                                </TableBody>
                                                            </Table>
                                                            <div className="flex justify-end mt-1 ">
                                                                <button
                                                                    className="px-4 py-1 text-white bg-green-400 hover:bg-green-500 cursor-pointer"
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
