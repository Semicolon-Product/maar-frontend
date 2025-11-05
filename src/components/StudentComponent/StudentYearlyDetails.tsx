import { useEffect, useRef, useState } from "react";

import {
  initialStudentActivityFormData,
  type StudentActivityFormData,
  type StudentYearlyDetailsProps,
} from "../types/superadminType";

import { Save } from "lucide-react";
import "./tableStyle.css";
import { FileUpload, postApi } from "@/api";
import CloseIcon from "../CloseIcon";
import { useToast } from "@/contexts/ToastContext";
import CustomDropdown from "../CustomDropdown";
import ConfirmModal from "./ConfirmModal";

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

  const handleConfirm = async () => {
    await postApi("student/activitySubmit", { formData, totalPoint }).then(
      (res) => {
        toast.success(res.message);
      }
    );
    setOpen(false);
    // Add your form submission logic here
  };

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const uploadActivityFileToS3 = async (fieldName: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fieldName", fieldName);

    try {
      const res = await FileUpload("student/individualFile", formData);

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
  const inputBoxStyle = `border text-xs border-gray-400 dark:border-gray-700 rounded px-2 py-[4px]
          bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
          cursor-pointer select-none truncate`;

  const crossIconStyle = `cursor-pointer rounded h-[25px] w-7 bg-red-600 hover:bg-red-700 
             dark:border-red-500 dark:bg-red-500 dark:hover:bg-red-600 
              transition-colors duration-200`;

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

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log("Confirmed!");
          handleConfirm();
          setOpen(false);
        }}
      />

      {year <= (currentyear ?? 0) ? (
        <div className="relative ">
          {/* <span className="bg-green-200 text-center">
            Total Points: {totalPoint}
          </span> */}
          <div className="flex flex-col ">
            <div
              className="max-h-[88vh] lg:max-h-[88vh] overflow-y-auto border-l border-gray-300 dark:border-gray-600 "
              style={{
                scrollbarWidth: "thin", // Firefox
                scrollbarColor: "rgba(156, 163, 175, 0.7) transparent", // gray-400 thumb
              }}
            >
              <form className="">
                <table className="table-auto  w-full text-sm ">
                  <thead className="sticky top-0 bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold text-center shadow-sm z-10">
                    <tr>
                      <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-tl-lg">
                        Activity
                      </th>
                      <th className="px-3 py-2 border border-gray-300 dark:border-gray-600">
                        Points per Activity
                      </th>
                      <th className="px-3 py-2 border border-gray-300 dark:border-gray-600">
                        Permissible Points (max)
                      </th>
                      <th className="px-3 py-2 border border-gray-300 dark:border-gray-600">
                        Remaining Points
                      </th>
                      <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-tr-lg">
                        Already Acquired
                      </th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {/* MOOCS */}
                    <tr className="bg-yellow-300 dark:bg-yellow-500/60 text-gray-900 dark:text-yellow-100 font-semibold">
                      <td
                        colSpan={5}
                        className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center "
                      >
                        1. MOOCS (SWAYAM / NPTEL / Spoken Tutorial / any
                        technical or non-technical course) (per course)
                      </td>
                    </tr>

                    <tr>
                      <td className=" px-2 py-1 flex flex-wrap">
                        a. For 12 weeks duration/40 Hours
                        <CustomDropdown
                          name="moocs12Weeks"
                          value={formData.moocs12Weeks}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "20", value: "20" },
                            { label: "40", value: "40" },
                          ]}
                        />
                        <input
                          id="moocs12WeeksFile"
                          ref={(el) => {
                            fileInputRefs.current["moocs12WeeksFile"] = el;
                          }}
                          type="file"
                          className={`${inputBoxStyle}`}
                          name="moocs12WeeksFile"
                          onChange={handleChange}
                        />
                        {formData.moocs12WeeksFile && (
                          <CloseIcon
                            size={19}
                            color="white"
                            onClick={() => handleClearFile("moocs12WeeksFile")}
                            className={`${crossIconStyle}`}
                          />
                        )}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[0]?.subpoints[0]?.point_per_activity}
                      </td>
                      <td
                        className="border-l border-gray-400 dark:border-gray-700 text-center"
                        rowSpan={4}
                      >
                        {data[0]?.max}
                      </td>
                      <td
                        className="border-l border-gray-400 dark:border-gray-700 text-center"
                        rowSpan={4}
                      >
                        {data[0]?.remain}
                        {/*remain point*/}
                      </td>
                      <td
                        className="border-l border-r border-gray-400 dark:border-gray-700 text-center"
                        rowSpan={4}
                      >
                        {data[0]?.already_acquired}
                      </td>{" "}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700  px-2 py-1 flex flex-wrap">
                        b. For 8 weeks duration/30 Hours
                        <CustomDropdown
                          name="moocs8Weeks"
                          value={formData.moocs8Weeks}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "15", value: "15" },
                            { label: "30", value: "30" },
                          ]}
                        />
                        <input
                          id="moocs8WeeksFile"
                          type="file"
                          className={`${inputBoxStyle}`}
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
                            className={`${crossIconStyle}`}
                          />
                        )}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[0]?.subpoints[1]?.point_per_activity}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        c. For 4 weeks duration/20 Hours
                        <CustomDropdown
                          name="moocs4Weeks"
                          value={formData.moocs4Weeks}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <input
                          id="moocs4WeeksFile"
                          type="file"
                          className={`${inputBoxStyle}`}
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
                            className={`${crossIconStyle}`}
                          />
                        )}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[0]?.subpoints[2]?.point_per_activity}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        d. For 2 weeks duration/10 Hours
                        <CustomDropdown
                          name="moocs2Weeks"
                          value={formData.moocs2Weeks}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "5", value: "5" },
                            { label: "10", value: "10" },
                            { label: "15", value: "15" },
                            { label: "20", value: "20" },
                            { label: "25", value: "25" },
                            { label: "30", value: "30" },
                            { label: "35", value: "35" },
                            { label: "40", value: "40" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="moocs2WeeksFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[0]?.subpoints[3]?.point_per_activity}
                      </td>
                    </tr>

                    {/* Tech Fest/Fest/Teachers Day/Fresher’s Welcome */}
                    <tr className="bg-yellow-300 dark:bg-yellow-500/60 text-gray-900 dark:text-yellow-100 font-semibold">
                      <td
                        colSpan={5}
                        className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center "
                      >
                        2. Tech Fest / Fest / Teachers Day / Fresher’s Welcome
                      </td>
                    </tr>

                    <tr>
                      <td className="  border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        a. Organizer
                        <CustomDropdown
                          name="techFestOrganizer"
                          value={formData.techFestOrganizer}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "5", value: "5" },
                            { label: "10", value: "10" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="techFestOrganizerFile"
                            type="file"
                            ref={(el) => {
                              fileInputRefs.current["techFestOrganizerFile"] =
                                el;
                            }}
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[1]?.subpoints[0]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[1]?.subpoints[0]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[1]?.subpoints[0]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[1]?.subpoints[0]?.already_acquired}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        b. Participant
                        <CustomDropdown
                          name="techFestParticipant"
                          value={formData.techFestParticipant}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "3", value: "3" },
                            { label: "6", value: "6" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            ref={(el) => {
                              fileInputRefs.current["techFestParticipantFile"] =
                                el;
                            }}
                            id="techFestParticipantFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[1]?.subpoints[1]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[1]?.subpoints[1]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[1]?.subpoints[1]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[1]?.subpoints[1]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Rural Reporting */}
                    <tr className="">
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        3. Rural Reporting
                        <CustomDropdown
                          name="ruralReporting"
                          value={formData.ruralReporting}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "5", value: "5" },
                            { label: "10", value: "10" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="ruralReportingFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[2]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[2]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[2]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[2]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Tree Plantation */}
                    <tr className="">
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        4. Tree plantation and Up-keeping (per tree)
                        <CustomDropdown
                          name="treePlantation"
                          value={formData.treePlantation}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "1", value: "1" },
                            { label: "2", value: "2" },
                            { label: "3", value: "3" },
                            { label: "4", value: "4" },
                            { label: "5", value: "5" },
                            { label: "6", value: "6" },
                            { label: "7", value: "7" },
                            { label: "8", value: "8" },
                            { label: "9", value: "9" },
                            { label: "10", value: "10" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="treePlantationFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[3]?.point_per_activity}
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[3]?.max}
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[3]?.remain}
                      </td>
                      <td className="border-l border-r border-gray-400 dark:border-gray-700 text-center">
                        {data[3]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Relief/Charitable Activities */}
                    <tr className="bg-yellow-300 dark:bg-yellow-500/60 text-gray-900 dark:text-yellow-100 font-semibold">
                      <td
                        colSpan={5}
                        className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center "
                      >
                        5. Relief/Charitable Activities
                      </td>{" "}
                      {/* Colspan adjusted */}
                    </tr>
                    <tr>
                      <td className=" border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        a. Collection of fund/materials for the Relief Camp or
                        Charitable Trusts
                        <CustomDropdown
                          name="reliefFundCollection"
                          value={formData.reliefFundCollection}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "5", value: "5" },
                            { label: "10", value: "10" },
                            { label: "15", value: "15" },
                            { label: "20", value: "20" },
                            { label: "25", value: "25" },
                            { label: "30", value: "30" },
                            { label: "35", value: "35" },
                            { label: "40", value: "40" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="reliefFundCollectionFile"
                            type="file"
                            className={`${inputBoxStyle}`}
                            name="reliefFundCollectionFile"
                            ref={(el) => {
                              fileInputRefs.current[
                                "reliefFundCollectionFile"
                              ] = el;
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[4]?.subpoints[0]?.point_per_activity}
                      </td>
                      <td
                        className="border border-gray-400 dark:border-gray-700 text-center"
                        rowSpan={2}
                      >
                        {data[4]?.max}
                      </td>
                      <td
                        className="border border-gray-400 dark:border-gray-700 text-center"
                        rowSpan={2}
                      >
                        {data[4]?.remain}
                      </td>
                      <td
                        className="border border-gray-400 dark:border-gray-700 text-center"
                        rowSpan={2}
                      >
                        {data[4]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        b. To be a part of the Relief Work Team
                        <CustomDropdown
                          name="reliefWorkTeam"
                          value={formData.reliefWorkTeam}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "20", value: "20" },
                            { label: "40", value: "40" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="reliefWorkTeamFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[4]?.subpoints[1]?.point_per_activity}
                      </td>
                      {/* <td className="border border-gray-400 dark:border-gray-700 text-center">{getRemainingPoints('reliefWorkTeam')}</td> Remaining Points */}
                    </tr>

                    {/* Participation in Arts/Performing Arts */}
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        6. Participation in Debate/Group
                        Discussion/Workshop/Tech
                        quiz/Music/Dance/Drama/Elocution/Quiz/Seminar
                        <br />
                        /Painting/any Performing Arts/Photography/Film Making/
                        <CustomDropdown
                          name="participationInArts"
                          value={formData.participationInArts}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="participationInArtsFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[5]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[5]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[5]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[5]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Publication */}
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        7. Publication in News Paper, Magazine, Wall Magazine &
                        Blogs
                        <CustomDropdown
                          name="publication"
                          value={formData.publication}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="publicationFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[6]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[6]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[6]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[6]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Research Publication */}
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        8. Research Publication (per publication)
                        <CustomDropdown
                          name="researchPublication"
                          value={formData.researchPublication}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "15", value: "15" },
                            { label: "30", value: "30" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="researchPublicationFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[7]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[7]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[7]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[7]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Innovative Projects */}
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        9. Innovative Projects (other than course curriculum)
                        <CustomDropdown
                          name="innovativeProjects"
                          value={formData.innovativeProjects}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "30", value: "30" },
                            { label: "60", value: "60" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="innovativeProjectsFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[8]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[8]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[8]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[8]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Blood Donation */}
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        10. Blood donation
                        <CustomDropdown
                          name="bloodDonation"
                          value={formData.bloodDonation}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "8", value: "8" },
                            { label: "16", value: "16" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="bloodDonationFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              onClick={() =>
                                handleClearFile("bloodDonationFile")
                              }
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[9]?.subpoints[0].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[9]?.subpoints[0].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[9]?.subpoints[0].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[9]?.subpoints[0].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        Blood Donation Camp Organization
                        <CustomDropdown
                          name="bloodDonationCampOrganization"
                          value={formData.bloodDonationCampOrganization}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="bloodDonationCampOrganizationFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[9]?.subpoints[1].point_per_activity}
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[9]?.subpoints[1].max}
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[9]?.subpoints[1].remain}
                      </td>
                      <td className="border-l border-r border-gray-400 dark:border-gray-700 text-center">
                        {data[9]?.subpoints[1].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Sports/Games/Adventure Sports/Trekking/Yoga Camp */}
                    <tr className="bg-yellow-300 dark:bg-yellow-500/60 text-gray-900 dark:text-yellow-100 font-semibold">
                      <td
                        colSpan={5}
                        className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center "
                      >
                        11. Sports/Games/Adventure Sports/Trekking/Yoga Camp
                      </td>{" "}
                      {/* Colspan adjusted */}
                    </tr>
                    <tr>
                      <td className=" border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        a. Personal Level
                        <CustomDropdown
                          name="sportsPersonal"
                          value={formData.sportsPersonal}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="sportsPersonalFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[0].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[0].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[0].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[0].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        b. College Level
                        <CustomDropdown
                          name="sportsCollege"
                          value={formData.sportsCollege}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "5", value: "5" },
                            { label: "10", value: "10" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="sportsCollegeFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              onClick={() =>
                                handleClearFile("sportsCollegeFile")
                              }
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[1].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[1].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[1].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[1].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        c. University Level
                        <CustomDropdown
                          name="sportsUniversity"
                          value={formData.sportsUniversity}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="sportsUniversityFile"
                            type="file"
                            className={`${inputBoxStyle}`}
                            ref={(el) => {
                              fileInputRefs.current["sportsUniversityFile"] =
                                el;
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[2].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[2].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[2].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[2].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        d. District Level
                        <CustomDropdown
                          name="sportsDistrict"
                          value={formData.sportsDistrict}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "12", value: "12" },
                            { label: "24", value: "24" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="sportsDistrictFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[3].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[3].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[3].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[3].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        e. State Level
                        <CustomDropdown
                          name="sportsState"
                          value={formData.sportsState}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "15", value: "15" },
                            { label: "30", value: "30" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="sportsStateFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[4].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[4].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[4].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[4].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        f. National/International Level
                        <CustomDropdown
                          name="sportsNationalInternational"
                          value={formData.sportsNationalInternational}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "20", value: "20" },
                            { label: "40", value: "40" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="sportsNationalInternationalFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                                handleClearFile(
                                  "sportsNationalInternationalFile"
                                )
                              }
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[5].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[5].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[5].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[10]?.subpoints[5].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Activities in a Professional Society/Student Chapter */}
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        12. Activities in a Professional Society/Student Chapter
                        <CustomDropdown
                          name="professionalSocietyActivities"
                          value={formData.professionalSocietyActivities}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="professionalSocietyActivitiesFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[11]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[11]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[11]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[11]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Relevant Industry Visit & Report/Hotel-Event Management Training & Report */}
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        13. Relevant Industry Visit & Report/Hotel-Event
                        Management Training & Report (Minimum 3 days with
                        submitted report)
                        <CustomDropdown
                          name="industryVisit"
                          value={formData.industryVisit}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="industryVisitFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              onClick={() =>
                                handleClearFile("industryVisitFile")
                              }
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[12]?.point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[12]?.max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[12]?.remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[12]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Community Service & Allied Activities */}
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        14. Community Service & Allied Activities like: Caring
                        for the Senior Citizens, Under-privileged/Street
                        Children/ Animal Care etc/ Training to Differently Able
                        <CustomDropdown
                          name="communityService"
                          value={formData.communityService}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="communityServiceFile"
                            type="file"
                            className={`${inputBoxStyle}`}
                            name="communityServiceFile"
                            ref={(el) => {
                              fileInputRefs.current["communityServiceFile"] =
                                el;
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[13]?.point_per_activity}
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[13]?.max}
                      </td>
                      <td className="border-l border-gray-400 dark:border-gray-700 text-center">
                        {data[13]?.remain}
                      </td>
                      <td className="border-l border-r border-gray-400 dark:border-gray-700 text-center">
                        {data[13]?.already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>

                    {/* Self-Entrepreneurship Programme */}
                    <tr className="bg-yellow-300 dark:bg-yellow-500/60 text-gray-900 dark:text-yellow-100 font-semibold">
                      <td
                        colSpan={5}
                        className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center "
                      >
                        15. Self-Entrepreneurship Programme
                      </td>{" "}
                      {/* Colspan adjusted */}
                    </tr>
                    <tr>
                      <td className=" border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        a. To organise entrepreneurship programmes and workshops
                        <CustomDropdown
                          name="entrepreneurshipOrganize"
                          value={formData.entrepreneurshipOrganize}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="entrepreneurshipOrganizeFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[0].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[0].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[0].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[0].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        b. To take part in entrepreneurship workshop and get
                        certificate
                        <CustomDropdown
                          name="entrepreneurshipParticipate"
                          value={formData.entrepreneurshipParticipate}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "5", value: "5" },
                            { label: "10", value: "10" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="entrepreneurshipParticipateFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                                handleClearFile(
                                  "entrepreneurshipParticipateFile"
                                )
                              }
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[1].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[0].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[0].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[0].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        c. Video film making on entrepreneurship
                        <CustomDropdown
                          name="entrepreneurshipVideo"
                          value={formData.entrepreneurshipVideo}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="entrepreneurshipVideoFile"
                            type="file"
                            className={`${inputBoxStyle}`}
                            name="entrepreneurshipVideoFile"
                            ref={(el) => {
                              fileInputRefs.current[
                                "entrepreneurshipVideoFile"
                              ] = el;
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[2].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[2].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[2].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[2].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        d. Submit business plan on any project
                        <CustomDropdown
                          name="entrepreneurshipBusinessPlan"
                          value={formData.entrepreneurshipBusinessPlan}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="entrepreneurshipBusinessPlanFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                              className={`${crossIconStyle}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[3].point_per_activity}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[3].max}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[3].remain}
                      </td>
                      <td className="border border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[3].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                    <tr>
                      <td className="border-t  border-gray-400 dark:border-gray-700 px-2 py-1 flex flex-wrap">
                        e. To work for start-up/as entrepreneur
                        <CustomDropdown
                          name="entrepreneurshipWorkForStartup"
                          value={formData.entrepreneurshipWorkForStartup}
                          onChange={handleChange}
                          options={[
                            { label: "-- Select Points --", value: "0" },
                            { label: "20", value: "20" },
                            { label: "40", value: "40" },
                          ]}
                        />
                        <div className="flex">
                          <input
                            id="entrepreneurshipWorkForStartupFile"
                            type="file"
                            className={`${inputBoxStyle}`}
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
                      <td className="border-l border-t border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[4].point_per_activity}
                      </td>
                      <td className="border-l border-t border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[4].max}
                      </td>
                      <td className="border-l border-t border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[4].remain}
                      </td>
                      <td className="border-l border-r border-t border-gray-400 dark:border-gray-700 text-center">
                        {data[14]?.subpoints[4].already_acquired}
                      </td>{" "}
                      {/* Remaining Points */}
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
            <div className=" border-t  border-gray-400 dark:border-gray-700 ">
              <button
                type="submit"
                disabled={year < (currentyear ?? 0) || totalPoint == 0}
                onClick={handleSubmit}
                className={`mt-4 flex justify-center items-center gap-2 px-4 py-2 text-center rounded w-full transition-colors duration-200 ${
                  year < (currentyear ?? 0) || totalPoint == 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-indigo-500 hover:to-blue-700 text-white cursor-pointer"
                }`}
              >
                <Save />
                Submit <span>{totalPoint}</span> Point
              </button>
            </div>
          </div>
          {year < (currentyear ?? 0) && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] rounded-lg cursor-not-allowed flex items-center justify-center select-none">
              <span className="text-gray-300 text-sm font-medium">
                🔒 Locked (Past Year)
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg flex items-center justify-center">
          <div className="pt-1 sm:pt-6 px-6 pb-6 space-y-6 sm:space-y-8 text-center my-auto">
            <p className="text-red-500 font-semibold text-lg sm:text-xl">
              🚫 You can’t access this page yet.
            </p>
            <p className="text-gray-300 text-sm">
              This section will be available once the selected year begins.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentYearlyDetails;
