import React, { useRef, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

import { teacherPageModalStyle } from "@/components/styles/style";
//import { students } from "@/components/data/data";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//import Close from '@mui/icons-material/Close';
import type {
  IndividualActivity,
  TeacherVerifyTableProps,
} from "../types/superadminType";
//import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
//import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
//import pdfIcon from '../../../public/assets/PDF_file_icon.png'
//import pdf from '../../../public/assets/4726010.png'
import { generateIndividualReportPDF } from "../../pdfs/generateIndividualReportPDF";
import { generateAllReports } from "@/pdfs/generateAllReports";
import { BsFileEarmarkPdfFill, BsTrash } from "react-icons/bs";
import dayjs from "dayjs";
import { postApi } from "@/api";
import { PhoneCallIcon } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

const TeacherVerifyTable: React.FC<TeacherVerifyTableProps> = ({
  data,
  signature,
}) => {
  const selectedActivityRef = useRef<IndividualActivity | null>(null);
  const toast = useToast();
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
    console.log("selectedIds==>>", selectedIds);
    await postApi("student/detailsVerified", { ids: selectedIds }).then(
      (res) => {
        console.log("res of verifiend:::", res);
        toast.success(res?.message);
      }
    );
  };
  const [openDocsModal, setOpenDocsModal] = useState(false);
  const [currentActivity, setCurrentActivity] =
    useState<IndividualActivity | null>(null);

  const handleClose = () => {
    setOpenDocsModal(false);
  };

  const handleDocsModal = (activity: IndividualActivity) => {
    setCurrentActivity(activity);
    setOpenDocsModal(!openDocsModal);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteActivity = (activity: IndividualActivity) => {
    selectedActivityRef.current = activity;
    setShowDeleteModal(!showDeleteModal);
    // console.log("Delete activity", activity)
  };
  const handleConfirmDelete = async () => {
    console.log("new delete");
    const activity = selectedActivityRef.current;
    if (!activity) return;

    try {
      const res = await postApi("student/detailsDelete", { id: activity?.id });
      console.log(res);
      toast.success(res.message);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setShowDeleteModal(false);
      selectedActivityRef.current = null;
    }
  };

  const downloadIndividualReport = (individualReportdata: any) => {
    generateIndividualReportPDF(individualReportdata);
  };

  const students = data?.students;
  const status = data?.stats;
  /*   function splitAtNearestSpace(str: any, limit = 30) {
    if (!str || str.length <= limit) return str;

    const breakpoint = str.lastIndexOf(" ", limit);
    if (breakpoint === -1) return str; // no space, don’t break
    return str.substring(0, breakpoint) + "\n" + str.substring(breakpoint + 1);
  } */

  //---------------------teacher university portal-------------------------------

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmitTeacherCredential = async (e: any) => {
    e.preventDefault();
    console.log("Submitted Credentials:", credentials);
    await postApi("teacher/automateSubmit", {
      roll: credentials.username,
      password: credentials.password,
    });
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
              <p className="text-red-600">
                Remain: {status?.totalNotSubmitted}
              </p>
            </div>

            {/* Verified */}
            <div className="flex items-center gap-1 text-green-600">
              Verified:
              <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />(
              {status?.totalFullyVerified})
            </div>

            {/* Pending */}
            <div className="flex items-center gap-1 text-red-600">
              Pending:
              <CancelIcon sx={{ color: "#c9352a", fontSize: 18 }} />(
              {status!.totalStudents! - status!.totalFullyVerified!})
            </div>
          </div>

          {/* Right side: download icon */}
          <div className="flex justify-end cursor-pointer">
            <Tooltip title="Download All Students Report">
              <IconButton
                onClick={() =>
                  generateAllReports(students ?? [], signature ?? "")
                }
              >
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

        <div className="mx-2 md:mx-5">
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full   text-base ">
              <thead className="bg-[#2a4054] border text-white">
                <tr className="h-10">
                  {[
                    "Sr No",
                    "Student Name",
                    "Roll No",
                    "Mobile No",
                    "Total Acquired Points",
                    "Report",
                    "Status",
                    "Expand",
                  ].map((label) => (
                    <th
                      key={label}
                      className="px-2 py-1 text-left font-bold whitespace-nowrap"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {students?.length ? (
                  students.map((student, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className={`border ${
                          index % 2
                            ? "bg-gray-100 dark:bg-gray-800"
                            : "bg-white dark:bg-gray-800"
                        }`}
                      >
                        <td className="px-2 py-1">{index + 1}</td>
                        <td className="px-2 py-1">{student.name}</td>
                        <td className="px-2 py-1">{student.roll_no}</td>
                        <td className="px-2 py-1">{student.mobile_no}</td>
                        <td className="px-2 py-1">
                          {student.activities?.reduce(
                            (total, item) => total + (item.point || 0),
                            0
                          )}
                        </td>
                        <td className="px-2 py-1">
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => downloadIndividualReport(student)}
                          >
                            <BsFileEarmarkPdfFill size={20} className="mt-1" />
                          </button>
                        </td>
                        <td className="px-2 py-1">
                          {student.status ? (
                            <CheckCircleIcon className="text-green-600" />
                          ) : (
                            <CancelIcon className="text-red-600 " />
                          )}
                        </td>
                        <td className="px-2 py-1">
                          <button
                            onClick={() =>
                              setOpenIndex(openIndex === index ? null : index)
                            }
                          >
                            {openIndex === index ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Collapse Row */}
                      {openIndex === index && (
                        <tr className="bg-gray-50 dark:bg-gray-900 border   ">
                          <td colSpan={8} className="p-0">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{
                                height: openIndex === index ? "auto" : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-2">
                                <strong>Activities:</strong>
                                {student.activities?.length ? (
                                  <div className="overflow-x-auto mt-1">
                                    <table className="min-w-full border border-gray-300 dark:border-gray-600 text-sm">
                                      <thead className="bg-gray-800  text-white">
                                        <tr className="h-8">
                                          <th className="px-2 py-1">
                                            Serial No.
                                          </th>
                                          <th className="px-2 py-1">
                                            Activity Name
                                          </th>
                                          <th className="px-2 py-1">Date</th>
                                          <th className="px-2 py-1">Points</th>
                                          <th className="px-2 py-1">Docs</th>
                                          <th className="px-2 py-1">Verify</th>
                                          <th className="px-2 py-1">Delete</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {student.activities.map(
                                          (activity, idx) => (
                                            <tr
                                              key={idx}
                                              className={`${
                                                idx % 2
                                                  ? "bg-gray-100 dark:bg-gray-800"
                                                  : "bg-white dark:bg-gray-700"
                                              } ${
                                                !activity.is_active
                                                  ? "line-through text-red-600"
                                                  : ""
                                              }`}
                                            >
                                              <td className="px-2 py-1">
                                                {activity.activity_serial_no}
                                              </td>
                                              <td className="px-2 py-1 whitespace-pre-wrap">
                                                {activity.activity_name}
                                              </td>
                                              <td className="px-2 py-1">
                                                {activity.activity_date
                                                  ? dayjs(
                                                      activity.activity_date
                                                    ).format("DD-MMM-YYYY")
                                                  : dayjs().format(
                                                      "DD-MMM-YYYY"
                                                    )}
                                              </td>
                                              <td className="px-2 py-1">
                                                {activity.point}
                                              </td>
                                              <td
                                                className={`px-2 py-1 cursor-pointer ${
                                                  !activity.is_active
                                                    ? "text-red-600"
                                                    : "text-blue-500"
                                                } underline`}
                                                onClick={() =>
                                                  handleDocsModal(activity)
                                                }
                                              >
                                                {activity.activity_name.length >
                                                30
                                                  ? `${activity.activity_name.slice(
                                                      0,
                                                      30
                                                    )}...`
                                                  : activity.activity_name}
                                              </td>
                                              <td className="px-2 py-1 text-center">
                                                <input
                                                  type="checkbox"
                                                  className="accent-blue-600 w-3 h-3"
                                                  checked={
                                                    selectedIds.includes(
                                                      activity.id
                                                    ) || activity.is_verified
                                                  }
                                                  onChange={() =>
                                                    handleCheckboxChange(
                                                      activity.id
                                                    )
                                                  }
                                                />
                                              </td>
                                              <td className="px-2 py-1 text-center">
                                                <button
                                                  className="text-white hover:text-gray-500"
                                                  onClick={() =>
                                                    handleDeleteActivity(
                                                      activity
                                                    )
                                                  }
                                                >
                                                  <BsTrash size={16} />
                                                </button>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                    <div className="flex justify-end mt-1">
                                      <button
                                        className="px-4 py-1 rounded bg-[#00809D] hover:bg-[#669ba7] text-white"
                                        onClick={handleSubmit}
                                      >
                                        Verify
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="mt-1 italic text-gray-500 dark:text-gray-300 flex items-center gap-1">
                                    <strong>{student.name}</strong> has not
                                    submitted any activity. Please contact at{" "}
                                    <PhoneCallIcon className="w-4 h-4" />{" "}
                                    <strong>{student.mobile_no}</strong>.
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-2 italic text-gray-500 dark:text-gray-300"
                    >
                      No Student Present!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
          Teacher University Credential
        </h2>
        <hr className="border-gray-300 dark:border-gray-600" />

        <form
          onSubmit={handleSubmitTeacherCredential}
          className="space-y-4 mt-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherVerifyTable;
