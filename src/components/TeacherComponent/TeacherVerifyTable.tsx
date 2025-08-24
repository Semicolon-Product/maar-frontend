import React, { useRef, useState } from "react";

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
//import Close from '@mui/icons-material/Close';
import type { IndividualActivity, TeacherVerifyTableProps } from "../types/superadminType";
//import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
//import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
//import pdfIcon from '../../../public/assets/PDF_file_icon.png'
//import pdf from '../../../public/assets/4726010.png'
import { generateIndividualReportPDF } from "../../pdfs/generateIndividualReportPDF";
import { generateAllReports } from "@/pdfs/generateAllReports";
import { BsFileEarmarkPdfFill, BsTrash } from "react-icons/bs";
import dayjs from "dayjs";
import { postApi } from "@/api";
import { PhoneCallIcon } from "lucide-react";



const TeacherVerifyTable: React.FC<TeacherVerifyTableProps> = ({ data, signature }) => {
    const selectedActivityRef = useRef<IndividualActivity | null>(null);


    const [openIndex, setOpenIndex] = useState<number | null>(null);
    /* const [verifiedRows, setVerifiedRows] = useState<{
        [studentIndex: number]: { [activityIndex: number]: boolean };
    }>({});

    const [submittedStudents, setSubmittedStudents] = useState<{
        [studentIndex: number]: boolean;
    }>({});

    const [checkedRows, setCheckedRows] = useState<{
        [studentIndex: number]: { [activityIndex: number]: boolean };
    }>({}); */
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleCheckboxChange = (activityId: number) => {
        setSelectedIds((prevSelected) => {
            if (prevSelected.includes(activityId)) {
                // Uncheck (remove from array)
                return prevSelected.filter((id) => id !== activityId);
            } else {
                // Check (add to array)
                return [...prevSelected, activityId];
            }
        });
    };


    //-----------docs show modal



    const handleSubmit = async () => {
        console.log("selectedIds==>>", selectedIds)
        await postApi("student/detailsVerified", { ids: selectedIds }).then((res) => {
            console.log("res of verifiend:::", res)
            toast.success(res?.message)
        })

    };
    const [openDocsModal, setOpenDocsModal] = useState(false);
    const [currentActivity, setCurrentActivity] = useState<IndividualActivity | null>(null);





    const handleClose = () => {
        setOpenDocsModal(false);
    };


    const handleDocsModal = (activity: IndividualActivity) => {
        setCurrentActivity(activity)
        setOpenDocsModal(!openDocsModal)

    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const handleDeleteActivity = (activity: IndividualActivity) => {
        selectedActivityRef.current = activity;
        setShowDeleteModal(!showDeleteModal)
        // console.log("Delete activity", activity)
    }
    const handleConfirmDelete = async () => {
        console.log("new delete")
        const activity = selectedActivityRef.current;
        if (!activity) return;

        try {
            const res = await postApi("student/detailsDelete", { id: activity?.id });
            console.log(res);
            toast.success(res.message)

        } catch (err) {
            console.error("Error:", err);
        } finally {
            setShowDeleteModal(false);
            selectedActivityRef.current = null;
        }



    }


    const downloadIndividualReport = (individualReportdata: any) => {
        generateIndividualReportPDF(individualReportdata)
    }


    const students = data?.students;
    const status = data?.stats
    function splitAtNearestSpace(str:any, limit = 30) {
        if (!str || str.length <= limit) return str;

        const breakpoint = str.lastIndexOf(" ", limit);
        if (breakpoint === -1) return str; // no space, don’t break
        return (
            str.substring(0, breakpoint) + "\n" + str.substring(breakpoint + 1)
        );
    }


    //---------------------teacher university portal-------------------------------

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e:any) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmitTeacherCredential = async(e:any) => {
        e.preventDefault();
        console.log("Submitted Credentials:", credentials);
    await postApi("teacher/automateSubmit",{roll:credentials.username,password:credentials.password})
    };


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
                            {`${currentActivity?.activity_serial_no}. ${currentActivity?.activity_name}`}

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
                        {currentActivity?.document_url ? (
                            <iframe
                                src={currentActivity.document_url}
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
            <Dialog open={showDeleteModal} >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this activity?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setShowDeleteModal(false)}
                        className="px-4 py-1 rounded-xs border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirmDelete} // Replace with your actual delete function
                        className="px-4 py-1 rounded-xs bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Delete
                    </button>

                </DialogActions>
            </Dialog>

            <div className="relative">

                {/* Top-right image */}
                <div className="flex justify-between items-start md:items-center px-2 md:px-4 py-2 flex-wrap">
                    {/* Left side: status section */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-gray-700 max-w-[80%]">
                        {/* Submit & Remain */}
                        <div className="flex gap-2">
                            <p className="text-green-600">Submit: {status?.totalSubmitted}</p>
                            <p className="text-red-600">Remain: {status?.totalNotSubmitted}</p>
                        </div>

                        {/* Verified */}
                        <div className="flex items-center gap-1 text-green-600">
                            Verified:
                            <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
                            ({status?.totalFullyVerified})
                        </div>

                        {/* Pending */}
                        <div className="flex items-center gap-1 text-red-600">
                            Pending:
                            <CancelIcon sx={{ color: "#c9352a", fontSize: 18 }} />
                            ({status!.totalStudents! - status!.totalFullyVerified!})
                        </div>
                    </div>

                    {/* Right side: download icon */}
                    <div className="flex justify-end cursor-pointer">
                        <Tooltip title="Download All Students Report">
                            <IconButton onClick={() => generateAllReports(students ?? [], signature ?? "")}>
                                <BsFileEarmarkPdfFill color="#cc3f35" size={25} />
                            </IconButton>

                            {/* <img
                                onClick={() => generateAllReports(students, signature)}
                                src={pdf}
                                height={80}
                                width={80}
                                className="h-12 w-12 p-2 rounded-3xl transition-all duration-300 ease-in-out hover:bg-amber-100 cursor-pointer"
                                alt="Download PDF"
                            /> */}
                        </Tooltip>
                    </div>
                </div>






                <Box sx={{ mx: "5px" }}>
                    <TableContainer component={Paper} >

                        <Table sx={{ fontSize: "18px", }}
                        >

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
                                        Mobile No
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
                                    <TableCell sx={{ ...superadminStyle.headerStyle, }}>
                                        Expand
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {students?.length ? <TableBody>
                                {students?.map((student: any, index: any) => (
                                    <React.Fragment key={index}>
                                        <TableRow
                                            sx={{
                                                background: index % 2 ? "#e6e6e6" : "white",
                                            }}
                                        >
                                            <TableCell
                                                sx={{ ...superadminStyle.cellStyle }}
                                            >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                sx={{ ...superadminStyle.cellStyle, }}
                                            >
                                                {student?.name}
                                            </TableCell>
                                            <TableCell
                                                sx={{ ...superadminStyle.cellStyle, }}
                                            >
                                                {student?.roll_no}
                                            </TableCell>
                                            <TableCell
                                                sx={{ ...superadminStyle.cellStyle, }}
                                            >
                                                {student?.mobile_no}
                                            </TableCell>
                                            <TableCell
                                                sx={{ ...superadminStyle.cellStyle, }}
                                            >
                                                {student?.activities?.reduce((total: number, item: IndividualActivity) => total + (item.point || 0), 0)}
                                            </TableCell>
                                            <TableCell
                                                sx={{ ...superadminStyle.cellStyle, }}
                                            >
                                                <Tooltip title="Download Report">
                                                    <IconButton onClick={() => downloadIndividualReport(student)}>
                                                        <BsFileEarmarkPdfFill color="#cc3f35" size={19} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                sx={{ ...superadminStyle.cellStyle, }}
                                            >
                                                {student?.status ? (

                                                    <CheckCircleIcon sx={{ color: "green", fontSize: "20px" }} />

                                                ) : (
                                                    <CancelIcon sx={{ color: "#c9352a", fontSize: "20px" }} />
                                                )}

                                            </TableCell>

                                            <TableCell
                                                sx={{ ...superadminStyle.cellStyle, }}
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
                                                colSpan={8}
                                                sx={{ paddingBottom: 0, paddingTop: 0 }}
                                            >
                                                <Collapse
                                                    in={openIndex === index}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <Box margin={0.25}>
                                                        <strong>Activities:</strong>
                                                        {student?.activities &&
                                                            student?.activities?.length > 0 ? (
                                                            <Box>
                                                                <Table

                                                                    sx={{
                                                                        mt: 1,
                                                                        border: "1px solid #ccc",
                                                                        fontSize: "20px", width: "100%",
                                                                    }}
                                                                >
                                                                    <TableHead

                                                                    >
                                                                        <TableRow sx={{ backgroundColor: "#00809D", height: "30px" }}>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.headerStyle,

                                                                                }}
                                                                            >
                                                                                Serial No.
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.headerStyle,

                                                                                }}
                                                                            >
                                                                                Activity Name
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.headerStyle,

                                                                                }}
                                                                            >
                                                                                Date
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.headerStyle,

                                                                                }}
                                                                            >
                                                                                Points
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.headerStyle,

                                                                                }}
                                                                            >
                                                                                Docs
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.headerStyle,

                                                                                }}
                                                                            >
                                                                                Verify
                                                                            </TableCell>
                                                                            <TableCell
                                                                                sx={{
                                                                                    ...superadminStyle.headerStyle,

                                                                                }}
                                                                            >
                                                                                Delete
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {student.activities.map((activity: IndividualActivity, idx: number) => (
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
                                                                                        ...superadminStyle.cellStyle, color: activity?.is_active === false ? "red" : "inherit", textDecoration: activity?.is_active === false ? "line-through" : "none",

                                                                                    }}
                                                                                >
                                                                                    {activity?.activity_serial_no}
                                                                                </TableCell>
                                                                                {/* Repeat same for other cells like activity.name, date, etc. */}

                                                                                <TableCell
                                                                                    sx={{
                                                                                        ...superadminStyle.cellStyle, textDecoration: activity?.is_active === false ? "line-through" : "none",
                                                                                        color: activity?.is_active === false ? "red" : "inherit", whiteSpace: "pre-line",

                                                                                    }}
                                                                                >
                                                                                    {splitAtNearestSpace(activity?.activity_name)}
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    sx={{
                                                                                        ...superadminStyle.cellStyle,
                                                                                        textDecoration: activity?.is_active === false ? "line-through" : "none",
                                                                                        color: activity?.is_active === false ? "red" : "inherit",

                                                                                    }}
                                                                                >
                                                                                    {activity?.activity_date
                                                                                        ? dayjs(activity.activity_date).format("DD-MMM-YYYY")
                                                                                        : dayjs().format("DD-MMM-YYYY")}

                                                                                </TableCell>
                                                                                <TableCell
                                                                                    sx={{
                                                                                        ...superadminStyle.cellStyle,
                                                                                        textDecoration: activity?.is_active === false ? "line-through" : "none",
                                                                                        color: activity?.is_active === false ? "red" : "inherit",
                                                                                    }}
                                                                                >
                                                                                    {activity?.point}
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    onClick={() => {
                                                                                        handleDocsModal(activity);
                                                                                    }}
                                                                                    sx={{
                                                                                        ...superadminStyle.cellStyle,


                                                                                        cursor: "pointer",

                                                                                        color: activity?.is_active === false ? "red" : "blue", textDecoration: activity?.is_active === false ? "line-through" : "underline",
                                                                                    }}
                                                                                >
                                                                                    {activity?.activity_name.length > 30
                                                                                        ? `${activity.activity_name.slice(0, 30)}...`
                                                                                        : activity.activity_name}
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    sx={{
                                                                                        ...superadminStyle.cellStyle,

                                                                                    }}
                                                                                >
                                                                                    <input
                                                                                        className=" w-3 h-3 mt-0.5 accent-blue-600 "
                                                                                        type="checkbox"
                                                                                        checked={selectedIds.includes(activity.id) || activity.is_verified}
                                                                                        onChange={() => handleCheckboxChange(activity.id)}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    sx={{
                                                                                        ...superadminStyle.cellStyle,

                                                                                    }}
                                                                                >
                                                                                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteActivity(activity)}>
                                                                                        {/*  <DeleteIcon sx={{ fontSize: "20px" }} /> */}
                                                                                        <BsTrash size={18} />
                                                                                    </IconButton>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                                <div className="flex justify-end mt-1 ">
                                                                    <button
                                                                        className="px-4 py-1 rounded-xs text-white bg-[#00809D] hover:bg-[#669ba7] cursor-pointer"
                                                                        onClick={() =>
                                                                            handleSubmit()
                                                                        }
                                                                    >
                                                                        Verify
                                                                    </button>
                                                                </div>
                                                            </Box>
                                                        ) : (
                                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: "italic", fontSize: "14px", p: 1.5, fontFamily: "Calibri, sans-serif", display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}><strong>{student?.name}</strong> has not submitted any activity. Please contact at <PhoneCallIcon size={15} /><strong>{student?.mobile_no}</strong>.</Typography>


                                                        )}
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody> : <TableBody>
                                <TableRow >
                                    <TableCell colSpan={8} align="center" sx={{ py: 2, fontStyle: "italic", color: "gray" }}>
                                        No Student Present!
                                    </TableCell> </TableRow>

                            </TableBody>}

                        </Table>
                    </TableContainer>
                </Box>


            </div>

            <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
                    Teacher University Credential
                </h2>
                <hr />
                <form onSubmit={handleSubmitTeacherCredential} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4  hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div> 
        </div>
    )
}

export default TeacherVerifyTable
