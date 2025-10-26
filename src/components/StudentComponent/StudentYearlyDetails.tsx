import { useEffect, useRef, useState } from "react";

import {
  initialStudentActivityFormData,
  type StudentActivityFormData,
  type StudentYearlyDetailsProps,
} from "../types/superadminType";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Save } from "lucide-react";
import "./tableStyle.css";
import { FileUpload, postApi } from "@/api";
import CloseIcon from "../CloseIcon";
import { useToast } from "@/contexts/ToastContext";
const StudentYearlyDetails: React.FC<StudentYearlyDetailsProps> = ({
  data,
  currentyear,
  year,
}) => {
  const toast = useToast();
  const [totalPoint, setTotalPoint] = useState(0);
  const [open, setOpen] = useState(false);
  //const [error, setError] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  const [formData, setFormData] = useState<StudentActivityFormData>(
    initialStudentActivityFormData
  );

  //------------------------------Calculate Total Points-----------------------
  useEffect(() => {
    let currentTotalPoints = 0;

    for (const key in formData) {
      // Skip file fields
      if (key.toLowerCase().includes("file")) continue;

      const value = formData[key as keyof StudentActivityFormData];

      // Convert value to number safely, skip if null or not a number
      const num = Number(value);
      if (!isNaN(num)) {
        currentTotalPoints += num;
      }
    }

    setTotalPoint(currentTotalPoints);
  }, [formData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const totalMoocs =
      Number(formData.moocs2Weeks) +
      Number(formData.moocs4Weeks) +
      Number(formData.moocs8Weeks) +
      Number(formData.moocs12Weeks);

    if (totalMoocs + data[0].already_acquired > 40) {
      //setError("1. MOOCs can't be greater than 40")
      toast.error("1. MOOCs can't be greater than 40");
      //showValidationError("1. MOOCs can't be greater than 40");
      setValidationMessage("555");
      return;
    }

    if (
      Number(formData.techFestOrganizer) +
        data[1].subpoints[0].already_acquired >
      10
    ) {
      toast.error(
        "2.a Tech Fest/Fest/Teachers Day/Fresher’s Welcome Organizer can't be greater than 10"
      );
      return;
    }
    if (
      Number(formData.techFestParticipant) +
        data[1].subpoints[1].already_acquired >
      6
    ) {
      toast.error(
        "2.b Tech Fest/Fest/Teachers Day/Fresher’s Welcome Participant can't be greater than 6"
      );
      return;
    }
    if (Number(formData.ruralReporting) + data[2].already_acquired > 10) {
      toast.error("3. Rural Reporting can't be greater than 10");
      return;
    }
    if (Number(formData.treePlantation) + data[3].already_acquired > 10) {
      toast.error(
        "4. Tree plantation and Up-keeping (per tree) can't be greater than 10"
      );
      return;
    }
    if (
      Number(formData.reliefFundCollection) +
        Number(formData.reliefWorkTeam) +
        data[4].already_acquired >
      40
    ) {
      toast.error("5. Relief/Charitable Activities can't be greater than 20");
      return;
    }
    if (Number(formData.participationInArts) + data[5].already_acquired > 20) {
      toast.error(
        "6. Participation in Debate/Group Discussion/Workshop/Tech quiz/Music/Dance/Drama/Elocution/Quiz/Seminar/Painting/any Performing Arts/Photography/Film Making can't be greater than 40"
      );
      return;
    }
    if (Number(formData.publication) + data[6].already_acquired > 20) {
      toast.error(
        "7. Publication in News Paper, Magazine, Wall Magazine & Blogs can't be greater than 20"
      );
      return;
    }
    if (Number(formData.researchPublication) + data[7].already_acquired > 30) {
      toast.error(
        "8. Research Publication (per publication) can't be greater than 30"
      );
      return;
    }
    if (Number(formData.innovativeProjects) + data[8].already_acquired > 60) {
      toast.error(
        "9. Innovative Projects (other than course curriculum) can't be greater than 60"
      );
      return;
    }
    if (
      Number(formData.bloodDonation) + data[9].subpoints[0].already_acquired >
      16
    ) {
      toast.error("10.a Blood donation can't be greater than 16");
      return;
    }
    if (
      Number(formData.bloodDonationCampOrganization) +
        data[9].subpoints[1].already_acquired >
      20
    ) {
      toast.error(
        "10.b Blood Donation Camp Organization can't be greater than 20"
      );
      return;
    }
    if (
      Number(formData.sportsPersonal) + data[10].subpoints[0].already_acquired >
      20
    ) {
      toast.error(
        "11.a Sports/Games/Adventure Sports/Trekking/Yoga (Personal Level) Camp can't be greater than 20"
      );
      return;
    }
    if (
      Number(formData.sportsCollege) + data[10].subpoints[1].already_acquired >
      10
    ) {
      toast.error(
        "11.b Sports/Games/Adventure Sports/Trekking/Yoga (College Level) Camp can't be greater than 10"
      );
      return;
    }
    if (
      Number(formData.sportsUniversity) +
        data[10].subpoints[2].already_acquired >
      20
    ) {
      toast.error(
        "11.c Sports/Games/Adventure Sports/Trekking/Yoga (University Level) Camp can't be greater than 20"
      );
      return;
    }
    if (
      Number(formData.sportsDistrict) + data[10].subpoints[3].already_acquired >
      24
    ) {
      toast.error(
        "11.d Sports/Games/Adventure Sports/Trekking/Yoga (District Level) Camp can't be greater than 24"
      );
      return;
    }
    if (
      Number(formData.sportsState) + data[10].subpoints[4].already_acquired >
      30
    ) {
      toast.error(
        "11.e Sports/Games/Adventure Sports/Trekking/Yoga (State Level) Camp can't be greater than 30"
      );
      return;
    }
    if (
      Number(formData.sportsNationalInternational) +
        data[10].subpoints[5].already_acquired >
      40
    ) {
      toast.error(
        "11.f Sports/Games/Adventure Sports/Trekking/Yoga (National/International Level) Camp can't be greater than 40"
      );
      return;
    }
    if (
      Number(formData.professionalSocietyActivities) +
        data[11].already_acquired >
      20
    ) {
      toast.error(
        "12. Activities in a Professional Society/Student Chapter Camp can't be greater than 20"
      );
      return;
    }
    if (Number(formData.industryVisit) + data[12].already_acquired > 20) {
      toast.error(
        "13. Relevant Industry Visit & Report/Hotel-Event Management Training & Report (Minimum 3 days with submitted report) Camp can't be greater than 20"
      );
      return;
    }
    if (Number(formData.communityService) + data[13].already_acquired > 20) {
      toast.error(
        "14.Community Service & Allied Activities like: Caring for the Senior Citizens, Under-privileged/Street Children/ Animal Care etc/ Training to Differently Able Camp can't be greater than 20"
      );
      return;
    }
    if (
      Number(formData.entrepreneurshipOrganize) +
        data[14].subpoints[0].already_acquired >
      20
    ) {
      toast.error(
        "15.a. To organise entrepreneurship programmes and workshops can't be greater than 20"
      );
      return;
    }
    if (
      Number(formData.entrepreneurshipParticipate) +
        data[14].subpoints[1].already_acquired >
      10
    ) {
      toast.error(
        "15.b. To take part in entrepreneurship workshop and get certificate can't be greater than 20"
      );
      return;
    }
    if (
      Number(formData.entrepreneurshipVideo) +
        data[14].subpoints[2].already_acquired >
      20
    ) {
      toast.error(
        "15.c. Video film making on entrepreneurship can't be greater than 20"
      );
      return;
    }
    if (
      Number(formData.entrepreneurshipBusinessPlan) +
        data[14].subpoints[3].already_acquired >
      20
    ) {
      toast.error(
        "15.d. Submit business plan on any project can't be greater than 20"
      );
      return;
    }
    if (
      Number(formData.entrepreneurshipWorkForStartup) +
        data[14].subpoints[4].already_acquired >
      40
    ) {
      toast.error(
        "15.e. To work for start-up/as entrepreneur can't be greater than 20"
      );
      return;
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    console.log("Form Data Submitted:", formData, totalPoint);
    await postApi("student/activitySubmit", { formData, totalPoint }).then(
      (res) => {
        toast.success(res.message);
      }
    );
    setOpen(false);
    // Add your form submission logic here
  };
  console.log("year and current >>>", year, currentyear);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const uploadActivityFileToS3 = async (fieldName: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fieldName", fieldName);

    try {
      const res = await FileUpload("student/individualFile", formData);
      console.log("upload success:", res);

      if (res.success && res.fileUrl) {
        // Replace the visible filename with fileUrl
        setFormData((prev: any) => ({
          ...prev,
          [fieldName]: res.fileUrl,
        }));
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  // Delete from S3 + clear state
  const handleClearFile = async (fieldName: string) => {
    console.log("field name in clear", fieldName);
    try {
      const fileUrl = formData[fieldName as keyof StudentActivityFormData];

      if (fileUrl) {
        await postApi("student/deleteFile", { fieldName, fileUrl }); // 🔥 call your backend delete route
      }
    } catch (err) {
      console.error("Error deleting file:", err);
    }

    // Clear from state
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: null,
    }));

    // Clear actual input
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName]!.value = "";
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (
      type === "file" &&
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files[0]
    ) {
      const file = e.target.files[0];

      // Show filename instantly
      setFormData((prev: any) => ({
        ...prev,
        [name]: file.name,
      }));

      // Upload to S3 in background
      uploadActivityFileToS3(name, file);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  console.log("Form data:::l", formData);
  return (
    <div className="">
      {showValidationPopup && (
        <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 ">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md border-t-4 border-red-600 relative animate-fade-in border ">
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.75a.75.75 0 10-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM10 14a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-center text-gray-800 font-medium">
              {validationMessage}
            </p>

            <button
              onClick={() => setShowValidationPopup(false)}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2 rounded-lg"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: "", // Light green background
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Confirm Submission
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit the data?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              textTransform: "none",
              py: "0.25em",
              backgroundColor: "#f44336",
              color: "#fff",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{
              textTransform: "none",
              py: "0.25em",
              backgroundColor: "#4caf50",
              color: "#fff",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {year <= (currentyear ?? 0) ? (
        <div className=" flex flex-col ">
          {/* <span className="bg-green-200 text-center">
            Total Points: {totalPoint}
          </span> */}
          <div className="max-h-[88vh] lg:max-h-[88vh] overflow-y-auto myForm">
            <form className="border border-[#ccc]">
              <table className="table-auto border w-full text-sm ">
                <thead className="bg-gray-200 dark:bg-gray-700 font-semibold text-center top-0 sticky mythead">
                  <tr className="">
                    <th className="border border-black dark:border-white border-t-0 border-r px-2 py-1 ">
                      Activity
                    </th>
                    <th className="border border-black border-t-0 px-2 py-1">
                      Points per Activity
                    </th>
                    <th className="border border-black border-t-0 px-2 py-1">
                      Permissible Points (max)
                    </th>
                    <th className="border border-black border-t-0 px-2 py-1">
                      Remain Point
                    </th>
                    <th className="border border-black border-t-0 px-2 py-1">
                      Already Aquire
                    </th>
                  </tr>
                </thead>
                <tbody className="mytbody">
                  {/* MOOCS */}
                  <tr className="bg-yellow-300 text-black font-semibold">
                    <td
                      colSpan={5}
                      className="border border-black px-2 py-1 text-center"
                    >
                      {" "}
                      {/* Colspan adjusted */}
                      1. MOOCS (SWAYAM/NPTEL/Spoken Tutorial/any technical,
                      non-technical course) (per course)
                    </td>
                  </tr>
                  <tr>
                    <td className=" px-2 py-1 flex flex-wrap">
                      a. For 12 weeks duration/40 Hours
                      <select
                        name="moocs12Weeks"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.moocs12Weeks}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                      <input
                        id="moocs12WeeksFile"
                        ref={(el) => {
                          fileInputRefs.current["moocs12WeeksFile"] = el;
                        }}
                        type="file"
                        //className="text-[11px] file:bg-gray-500 file:text-white file:text-center file:px-2 file:py-0.4 border-rounded file:border-0 file:cursor-pointer"
                        className="fileInputBox"
                        name="moocs12WeeksFile"
                        onChange={handleChange}
                      />
                      {formData.moocs12WeeksFile && (
                        <CloseIcon
                          size={19}
                          color="white"
                          onClick={() => handleClearFile("moocs12WeeksFile")}
                          className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                        />
                      )}
                    </td>
                    <td className="border border-black text-center">
                      {data[0]?.subpoints[0]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center" rowSpan={4}>
                      {data[0]?.max}
                    </td>
                    <td className="border border-black text-center" rowSpan={4}>
                      {data[0]?.remain}
                      {/*remain point*/}
                    </td>
                    <td className="border border-black text-center" rowSpan={4}>
                      {data[0]?.already_acquired}
                    </td>{" "}
                  </tr>
                  <tr>
                    <td className="border-t border-black  px-2 py-1 flex flex-wrap">
                      b. For 8 weeks duration/30 Hours
                      <select
                        name="moocs8Weeks"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.moocs8Weeks}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                      </select>
                      <input
                        id="moocs8WeeksFile"
                        type="file"
                        className="fileInputBox"
                        name="moocs8WeeksFile"
                        ref={(el) => {
                          fileInputRefs.current["moocs8WeeksFile"] = el;
                        }}
                        onChange={handleChange}
                      />
                      {formData.moocs8WeeksFile && (
                        <CloseIcon
                          size={19}
                          color="white"
                          onClick={() => handleClearFile("moocs8WeeksFile")}
                          className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                        />
                      )}
                    </td>
                    <td className="border border-black text-center">
                      {data[0]?.subpoints[1]?.point_per_activity}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      c. For 4 weeks duration/20 Hours
                      <select
                        name="moocs4Weeks"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.moocs4Weeks}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="moocs4WeeksFile"
                        type="file"
                        className="fileInputBox"
                        name="moocs4WeeksFile"
                        ref={(el) => {
                          fileInputRefs.current["moocs4WeeksFile"] = el;
                        }}
                        onChange={handleChange}
                      />
                      {formData.moocs4WeeksFile && (
                        <CloseIcon
                          size={19}
                          color="white"
                          onClick={() => handleClearFile("moocs4WeeksFile")}
                          className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                        />
                      )}
                    </td>
                    <td className="border border-black text-center">
                      {data[0]?.subpoints[2]?.point_per_activity}
                    </td>
                    {/* <td className="border border-black text-center">{getRemainingPoints('moocs4Weeks')}</td> Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      d. For 2 weeks duration/10 Hours
                      <select
                        name="moocs2Weeks"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.moocs2Weeks}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                      </select>
                      <div className="flex">
                        <input
                          id="moocs2WeeksFile"
                          type="file"
                          className="fileInputBox"
                          name="moocs2WeeksFile"
                          onChange={handleChange}
                          ref={(el) => {
                            fileInputRefs.current["moocs2WeeksFile"] = el;
                          }}
                        />
                        {formData.moocs2WeeksFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() => handleClearFile("moocs2WeeksFile")}
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[0]?.subpoints[3]?.point_per_activity}
                    </td>
                  </tr>

                  {/* Tech Fest/Fest/Teachers Day/Fresher’s Welcome */}
                  <tr className="bg-yellow-300 text-black font-semibold">
                    <td
                      colSpan={5}
                      className="border-t border-black px-2 py-1 text-center"
                    >
                      2. Tech Fest/Fest/Teachers Day/Fresher’s Welcome
                    </td>{" "}
                    {/* Colspan adjusted */}
                  </tr>
                  <tr>
                    <td className="border-t  border-black px-2 py-1 flex flex-wrap">
                      a. Organizer
                      <select
                        name="techFestOrganizer"
                        className="pointsDropdown "
                        onChange={handleChange}
                        value={formData.techFestOrganizer}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      <div className="flex">
                        <input
                          id="techFestOrganizerFile"
                          type="file"
                          ref={(el) => {
                            fileInputRefs.current["techFestOrganizerFile"] = el;
                          }}
                          className="fileInputBox"
                          name="techFestOrganizerFile"
                          onChange={handleChange}
                        />
                        {formData.techFestOrganizerFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("techFestOrganizerFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[1]?.subpoints[0]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[1]?.subpoints[0]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[1]?.subpoints[0]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[1]?.subpoints[0]?.already_acquired}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      b. Participant
                      <select
                        name="techFestParticipant"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.techFestParticipant}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                      </select>
                      <div className="flex">
                        <input
                          ref={(el) => {
                            fileInputRefs.current["techFestParticipantFile"] =
                              el;
                          }}
                          id="techFestParticipantFile"
                          type="file"
                          className="fileInputBox"
                          name="techFestParticipantFile"
                          onChange={handleChange}
                        />
                        {formData.techFestParticipantFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("techFestParticipantFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[1]?.subpoints[1]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[1]?.subpoints[1]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[1]?.subpoints[1]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[1]?.subpoints[1]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Rural Reporting */}
                  <tr className="">
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      3. Rural Reporting
                      <select
                        name="ruralReporting"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.ruralReporting}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      <div className="flex">
                        <input
                          id="ruralReportingFile"
                          type="file"
                          className="fileInputBox"
                          name="ruralReportingFile"
                          ref={(el) => {
                            fileInputRefs.current["ruralReportingFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.ruralReportingFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("ruralReportingFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[2]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[2]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[2]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[2]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Tree Plantation */}
                  <tr className="">
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      4. Tree plantation and Up-keeping (per tree)
                      <select
                        name="treePlantation"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.treePlantation}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <div className="flex">
                        <input
                          id="treePlantationFile"
                          type="file"
                          className="fileInputBox"
                          name="treePlantationFile"
                          ref={(el) => {
                            fileInputRefs.current["treePlantationFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.treePlantationFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("treePlantationFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[3]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[3]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[3]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[3]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Relief/Charitable Activities */}
                  <tr className="bg-yellow-300 text-black font-semibold">
                    <td
                      colSpan={5}
                      className="border-t border-black px-2 py-1 text-center"
                    >
                      5. Relief/Charitable Activities
                    </td>{" "}
                    {/* Colspan adjusted */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      a. Collection of fund/materials for the Relief Camp or
                      Charitable Trusts
                      <select
                        name="reliefFundCollection"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.reliefFundCollection}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                      </select>
                      <div className="flex">
                        <input
                          id="reliefFundCollectionFile"
                          type="file"
                          className="fileInputBox"
                          name="reliefFundCollectionFile"
                          ref={(el) => {
                            fileInputRefs.current["reliefFundCollectionFile"] =
                              el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.reliefFundCollectionFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("reliefFundCollectionFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[4]?.subpoints[0]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center" rowSpan={2}>
                      {data[4]?.max}
                    </td>
                    <td className="border border-black text-center" rowSpan={2}>
                      {data[4]?.remain}
                    </td>
                    <td className="border border-black text-center" rowSpan={2}>
                      {data[4]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      b. To be a part of the Relief Work Team
                      <select
                        name="reliefWorkTeam"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.reliefWorkTeam}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                      <div className="flex">
                        <input
                          id="reliefWorkTeamFile"
                          type="file"
                          className="fileInputBox"
                          name="reliefWorkTeamFile"
                          ref={(el) => {
                            fileInputRefs.current["reliefWorkTeamFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.reliefWorkTeamFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("reliefWorkTeamFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[4]?.subpoints[1]?.point_per_activity}
                    </td>
                    {/* <td className="border border-black text-center">{getRemainingPoints('reliefWorkTeam')}</td> Remaining Points */}
                  </tr>

                  {/* Participation in Arts/Performing Arts */}
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      6. Participation in Debate/Group Discussion/Workshop/Tech
                      quiz/Music/Dance/Drama/Elocution/Quiz/Seminar
                      <br />
                      /Painting/any Performing Arts/Photography/Film Making/
                      <select
                        name="participationInArts"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.participationInArts}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="participationInArtsFile"
                          type="file"
                          className="fileInputBox"
                          name="participationInArtsFile"
                          ref={(el) => {
                            fileInputRefs.current["participationInArtsFile"] =
                              el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.participationInArtsFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("participationInArtsFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[5]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[5]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[5]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[5]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Publication */}
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      7. Publication in News Paper, Magazine, Wall Magazine &
                      Blogs
                      <select
                        name="publication"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.publication}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="publicationFile"
                          type="file"
                          className="fileInputBox"
                          name="publicationFile"
                          ref={(el) => {
                            fileInputRefs.current["publicationFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.publicationFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() => handleClearFile("publicationFile")}
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[6]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[6]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[6]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[6]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Research Publication */}
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      8. Research Publication (per publication)
                      <select
                        name="researchPublication"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.researchPublication}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                      </select>
                      <div className="flex">
                        <input
                          id="researchPublicationFile"
                          type="file"
                          className="fileInputBox"
                          name="researchPublicationFile"
                          ref={(el) => {
                            fileInputRefs.current["researchPublicationFile"] =
                              el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.researchPublicationFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("researchPublicationFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[7]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[7]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[7]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[7]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Innovative Projects */}
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      9. Innovative Projects (other than course curriculum)
                      <select
                        name="innovativeProjects"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.innovativeProjects}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                      </select>
                      <div className="flex">
                        <input
                          id="innovativeProjectsFile"
                          type="file"
                          className="fileInputBox"
                          name="innovativeProjectsFile"
                          ref={(el) => {
                            fileInputRefs.current["innovativeProjectsFile"] =
                              el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.innovativeProjectsFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("innovativeProjectsFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[8]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[8]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[8]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[8]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Blood Donation */}
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      10. Blood donation
                      <select
                        name="bloodDonation"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.bloodDonation}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="8">8</option>
                        <option value="16">16</option>
                      </select>
                      <div className="flex">
                        <input
                          id="bloodDonationFile"
                          type="file"
                          className="fileInputBox"
                          ref={(el) => {
                            fileInputRefs.current["bloodDonationFile"] = el;
                          }}
                          name="bloodDonationFile"
                          onChange={handleChange}
                        />
                        {formData.bloodDonationFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() => handleClearFile("bloodDonationFile")}
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[9]?.subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[9]?.subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[9]?.subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[9]?.subpoints[0].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      Blood Donation Camp Organization
                      <select
                        name="bloodDonationCampOrganization"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.bloodDonationCampOrganization}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="bloodDonationCampOrganizationFile"
                          type="file"
                          className="fileInputBox"
                          name="bloodDonationCampOrganizationFile"
                          ref={(el) => {
                            fileInputRefs.current[
                              "bloodDonationCampOrganizationFile"
                            ] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.bloodDonationCampOrganizationFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile(
                                "bloodDonationCampOrganizationFile"
                              )
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[9]?.subpoints[1].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[9]?.subpoints[1].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[9]?.subpoints[1].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[9]?.subpoints[1].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Sports/Games/Adventure Sports/Trekking/Yoga Camp */}
                  <tr className="bg-yellow-300 text-black font-semibold">
                    <td
                      colSpan={5}
                      className="border-t border-black px-2 py-1 text-center"
                    >
                      11. Sports/Games/Adventure Sports/Trekking/Yoga Camp
                    </td>{" "}
                    {/* Colspan adjusted */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      a. Personal Level
                      <select
                        name="sportsPersonal"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsPersonal}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="sportsPersonalFile"
                          type="file"
                          className="fileInputBox"
                          name="sportsPersonalFile"
                          ref={(el) => {
                            fileInputRefs.current["sportsPersonalFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.sportsPersonalFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("sportsPersonalFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[0].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      b. College Level
                      <select
                        name="sportsCollege"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsCollege}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      <div className="flex">
                        <input
                          id="sportsCollegeFile"
                          type="file"
                          className="fileInputBox"
                          name="sportsCollegeFile"
                          ref={(el) => {
                            fileInputRefs.current["sportsCollegeFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.sportsCollegeFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() => handleClearFile("sportsCollegeFile")}
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[1].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[1].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[1].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[1].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      c. University Level
                      <select
                        name="sportsUniversity"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsUniversity}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="sportsUniversityFile"
                          type="file"
                          className="fileInputBox"
                          ref={(el) => {
                            fileInputRefs.current["sportsUniversityFile"] = el;
                          }}
                          name="sportsUniversityFile"
                          onChange={handleChange}
                        />
                        {formData.sportsUniversityFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("sportsUniversityFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[2].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[2].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[2].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[2].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      d. District Level
                      <select
                        name="sportsDistrict"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsDistrict}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                      </select>
                      <div className="flex">
                        <input
                          id="sportsDistrictFile"
                          type="file"
                          className="fileInputBox"
                          name="sportsDistrictFile"
                          ref={(el) => {
                            fileInputRefs.current["sportsDistrictFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.sportsDistrictFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("sportsDistrictFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[3].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[3].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[3].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[3].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      e. State Level
                      <select
                        name="sportsState"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsState}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                      </select>
                      <div className="flex">
                        <input
                          id="sportsStateFile"
                          type="file"
                          className="fileInputBox"
                          name="sportsStateFile"
                          ref={(el) => {
                            fileInputRefs.current["sportsStateFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.sportsStateFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() => handleClearFile("sportsStateFile")}
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[4].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[4].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[4].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[4].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      f. National/International Level
                      <select
                        name="sportsNationalInternational"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsNationalInternational}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                      <div className="flex">
                        <input
                          id="sportsNationalInternationalFile"
                          type="file"
                          className="fileInputBox"
                          name="sportsNationalInternationalFile"
                          ref={(el) => {
                            fileInputRefs.current[
                              "sportsNationalInternationalFile"
                            ] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.sportsNationalInternationalFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("sportsNationalInternationalFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[5].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[5].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[5].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10]?.subpoints[5].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Activities in a Professional Society/Student Chapter */}
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      12. Activities in a Professional Society/Student Chapter
                      <select
                        name="professionalSocietyActivities"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.professionalSocietyActivities}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="professionalSocietyActivitiesFile"
                          type="file"
                          className="fileInputBox"
                          name="professionalSocietyActivitiesFile"
                          ref={(el) => {
                            fileInputRefs.current[
                              "professionalSocietyActivitiesFile"
                            ] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.professionalSocietyActivitiesFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile(
                                "professionalSocietyActivitiesFile"
                              )
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[11]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[11]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[11]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[11]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Relevant Industry Visit & Report/Hotel-Event Management Training & Report */}
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      13. Relevant Industry Visit & Report/Hotel-Event
                      Management Training & Report (Minimum 3 days with
                      submitted report)
                      <select
                        name="industryVisit"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.industryVisit}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="industryVisitFile"
                          type="file"
                          className="fileInputBox"
                          name="industryVisitFile"
                          ref={(el) => {
                            fileInputRefs.current["industryVisitFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.industryVisitFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() => handleClearFile("industryVisitFile")}
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[12]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[12]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[12]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[12]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Community Service & Allied Activities */}
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      14. Community Service & Allied Activities like: Caring for
                      the Senior Citizens, Under-privileged/Street Children/
                      Animal Care etc/ Training to Differently Able
                      <select
                        name="communityService"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.communityService}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="communityServiceFile"
                          type="file"
                          className="fileInputBox"
                          name="communityServiceFile"
                          ref={(el) => {
                            fileInputRefs.current["communityServiceFile"] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.communityServiceFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("communityServiceFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[13]?.point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[13]?.max}
                    </td>
                    <td className="border border-black text-center">
                      {data[13]?.remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[13]?.already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Self-Entrepreneurship Programme */}
                  <tr className="bg-yellow-300 text-black font-semibold">
                    <td
                      colSpan={5}
                      className="border-t border-black px-2 py-1 text-center"
                    >
                      15. Self-Entrepreneurship Programme
                    </td>{" "}
                    {/* Colspan adjusted */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      a. To organise entrepreneurship programmes and workshops
                      <select
                        name="entrepreneurshipOrganize"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipOrganize}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="entrepreneurshipOrganizeFile"
                          type="file"
                          className="fileInputBox"
                          ref={(el) => {
                            fileInputRefs.current[
                              "entrepreneurshipOrganizeFile"
                            ] = el;
                          }}
                          name="entrepreneurshipOrganizeFile"
                          onChange={handleChange}
                        />
                        {formData.entrepreneurshipOrganizeFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("entrepreneurshipOrganizeFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[0].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      b. To take part in entrepreneurship workshop and get
                      certificate
                      <select
                        name="entrepreneurshipParticipate"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipParticipate}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      <div className="flex">
                        <input
                          id="entrepreneurshipParticipateFile"
                          type="file"
                          className="fileInputBox"
                          ref={(el) => {
                            fileInputRefs.current[
                              "entrepreneurshipParticipateFile"
                            ] = el;
                          }}
                          name="entrepreneurshipParticipateFile"
                          onChange={handleChange}
                        />
                        {formData.entrepreneurshipParticipateFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("entrepreneurshipParticipateFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[1].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[0].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      c. Video film making on entrepreneurship
                      <select
                        name="entrepreneurshipVideo"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipVideo}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="entrepreneurshipVideoFile"
                          type="file"
                          className="fileInputBox"
                          name="entrepreneurshipVideoFile"
                          ref={(el) => {
                            fileInputRefs.current["entrepreneurshipVideoFile"] =
                              el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.entrepreneurshipVideoFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile("entrepreneurshipVideoFile")
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[2].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[2].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[2].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[2].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      d. Submit business plan on any project
                      <select
                        name="entrepreneurshipBusinessPlan"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipBusinessPlan}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <div className="flex">
                        <input
                          id="entrepreneurshipBusinessPlanFile"
                          type="file"
                          className="fileInputBox"
                          name="entrepreneurshipBusinessPlanFile"
                          ref={(el) => {
                            fileInputRefs.current[
                              "entrepreneurshipBusinessPlanFile"
                            ] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.entrepreneurshipBusinessPlanFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile(
                                "entrepreneurshipBusinessPlanFile"
                              )
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[3].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[3].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[3].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[3].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border-t border-black px-2 py-1 flex flex-wrap">
                      e. To work for start-up/as entrepreneur
                      <select
                        name="entrepreneurshipWorkForStartup"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipWorkForStartup}
                      >
                        <option value="0">-- Select Points --</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                      <div className="flex">
                        <input
                          id="entrepreneurshipWorkForStartupFile"
                          type="file"
                          className="fileInputBox"
                          name="entrepreneurshipWorkForStartupFile"
                          ref={(el) => {
                            fileInputRefs.current[
                              "entrepreneurshipWorkForStartupFile"
                            ] = el;
                          }}
                          onChange={handleChange}
                        />
                        {formData.entrepreneurshipWorkForStartupFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() =>
                              handleClearFile(
                                "entrepreneurshipWorkForStartupFile"
                              )
                            }
                            className="border border-gray-700 bg-green-700 cursor-pointer text-bold hover:bg-green-500"
                          />
                        )}
                      </div>
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[4].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[4].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[4].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14]?.subpoints[4].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <button
            type="submit"
            disabled={year < (currentyear ?? 0) || totalPoint == 0}
            onClick={handleSubmit}
            className={`mt-4 flex justify-center items-center gap-2 px-4 py-2 text-center rounded w-full transition-colors duration-200 ${
              year < (currentyear ?? 0) || totalPoint == 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            }`}
          >
            <Save />
            Submit <span>{totalPoint}</span> Point
          </button>
        </div>
      ) : (
        <div className="pt-1 sm:pt-6 px-6 pb-6 space-y-6 sm:space-y-8 ">
          <p className="text-red-600 font-semibold text-lg">
            You can't access this page now.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentYearlyDetails;
