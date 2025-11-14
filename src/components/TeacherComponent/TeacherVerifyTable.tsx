import React, { useRef, useState } from "react";

import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import type {
  IndividualActivity,
  TeacherVerifyTableProps,
} from "../types/superadminType";
import { generateIndividualReportPDF } from "../../pdfs/generateIndividualReportPDF";
import { generateAllReports } from "@/pdfs/generateAllReports";
import { BsFileEarmarkPdfFill, BsTrash } from "react-icons/bs";
import dayjs from "dayjs";
import { postApi } from "@/api";
import { PhoneCallIcon, Users } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import DocsModal from "../DocsModal";

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
    await postApi("student/detailsVerified", { ids: selectedIds }).then(
      (res) => {
        toast.success(res?.message);
        setSelectedIds([]);
      }
    );
  };
  const [openDocsModal, setOpenDocsModal] = useState(false);
  const [currentActivity, setCurrentActivity] =
    useState<IndividualActivity | null>(null);

  const handleClose = () => {
    setOpenDocsModal(false);
    setCurrentActivity(null);
  };

  const handleDocsModal = (activity: IndividualActivity) => {
    setCurrentActivity(activity);
    setOpenDocsModal(!openDocsModal);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteActivity = (activity: IndividualActivity) => {
    selectedActivityRef.current = activity;
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const activity = selectedActivityRef.current;
    if (!activity) return;

    try {
      const res = await postApi("student/detailsDelete", { id: activity?.id });
      toast.success(res.message);
    } catch (err) {
      toast.error("Failed to delete activity");
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

  return (
    <div>
      <DocsModal
        open={openDocsModal}
        onClose={handleClose} // also fix this, see below 👇
        currentActivity={currentActivity ?? null}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 dark:bg-black/70 z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <BsTrash className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Confirm Deletion
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Are you sure you want to delete this activity? This action
                cannot be undone.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Delete Activity
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="relative bg-white dark:bg-gray-900 rounded-md  border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Top section with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-700 dark:via-purple-700 dark:to-blue-900 px-6 py-1">
          <div className="flex justify-between items-start md:items-center flex-wrap gap-4">
            {/* Left side: status section */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-white">
              {/* Submit & Remain */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Submitted: {status?.totalSubmitted}</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Pending: {status?.totalNotSubmitted}</span>
                </div>
              </div>

              {/* Verified */}
              <div className="flex items-center gap-2 bg-green-500/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <CheckCircleIcon sx={{ color: "#10b981", fontSize: 18 }} />
                <span>Verified: {status?.totalFullyVerified}</span>
              </div>

              {/* Pending Count */}
              <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <CancelIcon sx={{ color: "#ef4444", fontSize: 18 }} />
                <span>
                  Unverified:{" "}
                  {status!.totalStudents! - status!.totalFullyVerified!}
                </span>
              </div>
            </div>

            {/* Right side: download icon */}
            <div className="flex justify-end cursor-pointer">
              <div className="relative group inline-block">
                <button
                  onClick={() =>
                    generateAllReports(students ?? [], signature ?? "")
                  }
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <BsFileEarmarkPdfFill className="text-white" size={20} />
                </button>

                <div
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap
                 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0
                 group-hover:opacity-100 transition-all duration-200 shadow-xl border border-gray-700"
                >
                  Download All Reports
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2">
          <div className="overflow-x-auto rounded  border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-base bg-white dark:bg-gray-900">
              <thead className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white">
                <tr className="h-8">
                  {[
                    "Sr No",
                    "Student Name",
                    "Roll No",
                    "Mobile No",
                    "Total Points",
                    "Report",
                    "Status",
                    "Actions",
                  ].map((label) => (
                    <th
                      key={label}
                      className="px-4 py-3 font-semibold whitespace-nowrap uppercase text-center text-sm tracking-wide"
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
                        className={`border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                          index % 2
                            ? "bg-gray-50 dark:bg-gray-800/50"
                            : "bg-white dark:bg-gray-900"
                        }`}
                      >
                        <td className="px-4 py-2 text-center font-medium text-gray-900 dark:text-gray-100">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-center font-medium text-gray-900 dark:text-gray-100">
                          {student.name}
                        </td>
                        <td className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">
                          {student.roll_no}
                        </td>
                        <td className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">
                          {student.mobile_no}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {student.activities?.reduce(
                              (total, item) => total + (item.point || 0),
                              0
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 transition-colors duration-200 group"
                            onClick={() => downloadIndividualReport(student)}
                          >
                            <BsFileEarmarkPdfFill
                              size={18}
                              className="text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform"
                            />
                          </button>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex justify-center">
                            {student.status ? (
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <CheckCircleIcon className="w-4 h-4 mr-1" />
                                Verified
                              </div>
                            ) : (
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                <CancelIcon className="w-4 h-4 mr-1" />
                                Pending
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() =>
                              setOpenIndex(openIndex === index ? null : index)
                            }
                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 group"
                          >
                            {openIndex === index ? (
                              <KeyboardArrowUpIcon className="text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                            ) : (
                              <KeyboardArrowDownIcon className="text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Activities Row */}
                      {openIndex === index && (
                        <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
                          <td colSpan={8} className="p-0">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: openIndex === index ? "auto" : 0,
                                opacity: openIndex === index ? 1 : 0,
                              }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                      {student.activities?.length}
                                    </span>
                                  </div>
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Student Activities
                                  </h3>
                                </div>
                                {student.activities?.length ? (
                                  <div className="overflow-x-auto rounded-md shadow-md border border-gray-200 dark:border-gray-700">
                                    <table className="min-w-full bg-white dark:bg-gray-800 text-sm  overflow-hidden">
                                      <thead className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 text-white">
                                        <tr className="h-10">
                                          <th className="px-4 py-2 font-semibold text-left">
                                            Serial No.
                                          </th>
                                          <th className="px-4 py-2 font-semibold text-left">
                                            Activity Name
                                          </th>
                                          <th className="px-4 py-2 font-semibold text-center">
                                            Date
                                          </th>
                                          <th className="px-4 py-2 font-semibold text-center">
                                            Points
                                          </th>
                                          <th className="px-4 py-2 font-semibold text-center">
                                            Documents
                                          </th>
                                          <th className="px-4 py-2 font-semibold text-center">
                                            Verify
                                          </th>
                                          <th className="px-4 py-2 font-semibold text-center">
                                            Actions
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {student.activities.map(
                                          (activity, idx) => (
                                            <tr
                                              key={idx}
                                              className={`transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                                                idx % 2
                                                  ? "bg-gray-50 dark:bg-gray-700/50"
                                                  : "bg-white dark:bg-gray-800"
                                              } ${
                                                !activity.is_active
                                                  ? "opacity-60 line-through"
                                                  : ""
                                              }`}
                                            >
                                              <td className="px-4 py-2 text-gray-900 dark:text-gray-100 font-medium">
                                                {activity.activity_serial_no}
                                              </td>
                                              <td className="px-4 py-2 text-gray-700 dark:text-gray-300 max-w-xs">
                                                <div className="whitespace-pre-wrap break-words">
                                                  {activity.activity_name}
                                                </div>
                                              </td>
                                              <td className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">
                                                {activity.activity_date
                                                  ? dayjs(
                                                      activity.activity_date
                                                    ).format("DD-MMM-YYYY")
                                                  : dayjs().format(
                                                      "DD-MMM-YYYY"
                                                    )}
                                              </td>
                                              <td className="px-4 py-2 text-center">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                  {activity.point}
                                                </span>
                                              </td>
                                              <td className="px-4 py-2 text-center">
                                                <button
                                                  className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 ${
                                                    !activity.is_active
                                                      ? "bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800"
                                                      : "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
                                                  }`}
                                                  onClick={() =>
                                                    handleDocsModal(activity)
                                                  }
                                                >
                                                  <span
                                                    className={`text-xs font-medium ${
                                                      !activity.is_active
                                                        ? "text-red-600 dark:text-red-400"
                                                        : "text-blue-600 dark:text-blue-400"
                                                    }`}
                                                  >
                                                    View
                                                  </span>
                                                </button>
                                              </td>
                                              <td className="px-4 py-2 text-center">
                                                <input
                                                  type="checkbox"
                                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                                              <td className="px-4 py-2 text-center">
                                                <button
                                                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 transition-colors duration-200 group"
                                                  onClick={() =>
                                                    handleDeleteActivity(
                                                      activity
                                                    )
                                                  }
                                                >
                                                  <BsTrash
                                                    size={14}
                                                    className="text-red-600 dark:text-red-200 group-hover:scale-110 transition-transform"
                                                  />
                                                </button>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                    <div className="flex justify-end mt-4">
                                      <button
                                        className="inline-flex items-center px-4 py-2 rounded m-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 "
                                        onClick={handleSubmit}
                                      >
                                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                                        Verify Selected
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <PhoneCallIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">
                                      No Activities Submitted
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                                      Contact{" "}
                                      <strong className="text-blue-600 dark:text-blue-400">
                                        {student.name}
                                      </strong>{" "}
                                      at{" "}
                                      <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                        {student.mobile_no}
                                      </span>
                                    </p>
                                  </div>
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
                    <td colSpan={8} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                          <Users className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          No Students Found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                          There are currently no students enrolled in this year.
                          Students will appear here once they join the program.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherVerifyTable;
