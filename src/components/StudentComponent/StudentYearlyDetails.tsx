import { useEffect, useState } from "react";

import {
  initialStudentActivityFormData,
  type StudentActivityFormData,
  type StudentYearlyDetailsProps,
} from "../types/superadminType";
import { toast, ToastContainer } from "react-toastify";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Save } from "lucide-react";
import './tableStyle.css'
const StudentYearlyDetails: React.FC<StudentYearlyDetailsProps> = ({ data, currentyear, year }) => {
  const [totalPoint, setTotalPoint] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<StudentActivityFormData>(
    initialStudentActivityFormData
  );

  const handleChange = (e: any) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the actual File object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //------------------------------Calculate Total Points-----------------------
  useEffect(() => {
    let currentTotalPoints = 0;

    for (const key in formData) {
      // Skip file fields
      if (key.toLowerCase().includes("file")) continue;

      const value = formData[key];

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
      toast.error("1. MOOCs can't be greater than 40");
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
    }
    else {
      setOpen(true);
      console.log("Form Data Submitted:", formData, totalMoocs);
    }


  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    // Add your form submission logic here
    
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: '', // Light green background
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Confirm Submission
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit the data?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={handleClose}
            sx={{textTransform:"none",py:"0.25em", backgroundColor: '#f44336', color: '#fff', '&:hover': { backgroundColor: '#d32f2f' } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            sx={{textTransform:"none",py:"0.25em", backgroundColor: '#4caf50', color: '#fff', '&:hover': { backgroundColor: '#388e3c' } }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {year <= currentyear ? (
        <div className="h-screen flex flex-col">

          Total Points: {totalPoint}
          <div className="max-h-[83vh] overflow-y-auto myForm">
            <ToastContainer position="top-right" />

            <form>
              <table className="table-auto border border-black w-full text-sm ">
                <thead className="bgHead font-semibold text-center top-0 sticky mythead">
                  <tr className="">
                    <th className="border border-black border-right px-2 py-1 ">
                      Activity
                    </th>
                    <th className="border border-black px-2 py-1 ">
                      Points per Activity
                    </th>
                    <th className="border border-black px-2 py-1 ">
                      Permissible Points (max)
                    </th>
                    <th className="border border-black px-2 py-1 ">
                      Remain Point
                    </th>
                    <th className="border border-black px-2 py-1 ">
                      Already Aquire
                    </th>
                  </tr>
                </thead>
                <tbody className="mytbody">
                  {/* MOOCS */}
                  <tr className="bg-yellow-300 font-semibold">
                    <td colSpan={5} className="border border-black px-2 py-1">
                      {" "}
                      {/* Colspan adjusted */}
                      1. MOOCS (SWAYAM/NPTEL/Spoken Tutorial/any technical,
                      non-technical course) (per course)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 ">
                      a. For 12 weeks duration/40 Hours
                      <select
                        name="moocs12Weeks"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.moocs12Weeks}
                      >
                        <option value="0">-- Select --</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                      <input
                        id="moocs12WeeksFile"
                        type="file"
                        className="fileInputBox"
                        name="moocs12WeeksFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[0].subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center" rowSpan={4}>
                      {data[0].max}
                    </td>
                    <td className="border border-black text-center" rowSpan={4}>
                      {data[0].remain}
                      {/*remain point*/}
                    </td>
                    <td className="border border-black text-center" rowSpan={4}>
                      {data[0].already_acquired}
                    </td>{" "}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      b. For 8 weeks duration/30 Hours
                      <select
                        name="moocs8Weeks"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.moocs8Weeks}
                      >
                        <option value="0">-- Select --</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                      </select>
                      <input
                        id="moocs8WeeksFile"
                        type="file"
                        className="fileInputBox"
                        name="moocs8WeeksFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[0].subpoints[1].point_per_activity}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      c. For 4 weeks duration/20 Hours
                      <select
                        name="moocs4Weeks"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.moocs4Weeks}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="moocs4WeeksFile"
                        type="file"
                        className="fileInputBox"
                        name="moocs4WeeksFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[0].subpoints[2].point_per_activity}
                    </td>
                    {/* <td className="border border-black text-center">{getRemainingPoints('moocs4Weeks')}</td> Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      d. For 2 weeks duration/10 Hours
                      <select
                        name="moocs2Weeks"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.moocs2Weeks}
                      >
                        <option value="0">-- Select --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                      </select>
                      <input
                        id="moocs2WeeksFile"
                        type="file"
                        className="fileInputBox"
                        name="moocs2WeeksFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[0].subpoints[3].point_per_activity}
                    </td>
                  </tr>

                  {/* Tech Fest/Fest/Teachers Day/Fresher’s Welcome */}
                  <tr className="bg-yellow-300 font-semibold">
                    <td colSpan={5} className="border border-black px-2 py-1">
                      2. Tech Fest/Fest/Teachers Day/Fresher’s Welcome
                    </td>{" "}
                    {/* Colspan adjusted */}
                  </tr>
                  <tr>
                    <td className="border  border-black px-2 py-1">
                      a. Organizer
                      <select
                        name="techFestOrganizer"
                        className="pointsDropdown "
                        onChange={handleChange}
                        value={formData.techFestOrganizer}
                      >
                        <option value="0">-- Select --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      <input
                        id="techFestOrganizerFile"
                        type="file"
                        className="fileInputBox"
                        name="techFestOrganizerFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[1].subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[1].subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[1].subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[1].subpoints[0].already_acquired}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      b. Participant
                      <select
                        name="techFestParticipant"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.techFestParticipant}
                      >
                        <option value="0">-- Select --</option>
                        <option value="3">3</option>
                        <option value="6">6</option>
                      </select>
                      <input
                        id="techFestParticipantFile"
                        type="file"
                        className="fileInputBox"
                        name="techFestParticipantFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[1].subpoints[1].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[1].subpoints[1].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[1].subpoints[1].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[1].subpoints[1].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Rural Reporting */}
                  <tr className=" font-semibold">
                    <td className="border border-black px-2 py-1 ">
                      3. Rural Reporting
                      <select
                        name="ruralReporting"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.ruralReporting}
                      >
                        <option value="0">-- Select --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      <input
                        id="ruralReportingFile"
                        type="file"
                        className="fileInputBox"
                        name="ruralReportingFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[2].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[2].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[2].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[2].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Tree Plantation */}
                  <tr className=" font-semibold">
                    <td className="border border-black px-2 py-1">
                      4. Tree plantation and Up-keeping (per tree)
                      <select
                        name="treePlantation"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.treePlantation}
                      >
                        <option value="0">-- Select --</option>
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
                      <input
                        id="treePlantationFile"
                        type="file"
                        className="fileInputBox"
                        name="treePlantationFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[3].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[3].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[3].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[3].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Relief/Charitable Activities */}
                  <tr className="bg-yellow-300 font-semibold">
                    <td colSpan={5} className="border border-black px-2 py-1">
                      5. Relief/Charitable Activities
                    </td>{" "}
                    {/* Colspan adjusted */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      a. Collection of fund/materials for the Relief Camp or
                      Charitable Trusts
                      <select
                        name="reliefFundCollection"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.reliefFundCollection}
                      >
                        <option value="0">-- Select --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                      </select>
                      <input
                        id="reliefFundCollectionFile"
                        type="file"
                        className="fileInputBox"
                        name="reliefFundCollectionFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[4].subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center" rowSpan={2}>
                      {data[4].max}
                    </td>
                    <td className="border border-black text-center" rowSpan={2}>
                      {data[4].remain}
                    </td>
                    <td className="border border-black text-center" rowSpan={2}>
                      {data[4].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      b. To be a part of the Relief Work Team
                      <select
                        name="reliefWorkTeam"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.reliefWorkTeam}
                      >
                        <option value="0">-- Select --</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                      <input
                        id="reliefWorkTeamFile"
                        type="file"
                        className="fileInputBox"
                        name="reliefWorkTeamFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[4].subpoints[1].point_per_activity}
                    </td>
                    {/* <td className="border border-black text-center">{getRemainingPoints('reliefWorkTeam')}</td> Remaining Points */}
                  </tr>

                  {/* Participation in Arts/Performing Arts */}
                  <tr>
                    <td className="border border-black px-2 py-1">
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
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="participationInArtsFile"
                        type="file"
                        className="fileInputBox"
                        name="participationInArtsFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[5].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[5].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[5].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[5].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Publication */}
                  <tr>
                    <td className="border border-black px-2 py-1">
                      7. Publication in News Paper, Magazine, Wall Magazine &
                      Blogs
                      <select
                        name="publication"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.publication}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="publicationFile"
                        type="file"
                        className="fileInputBox"
                        name="publicationFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[6].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[6].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[6].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[6].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Research Publication */}
                  <tr>
                    <td className="border border-black px-2 py-1">
                      8. Research Publication (per publication)
                      <select
                        name="researchPublication"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.researchPublication}
                      >
                        <option value="0">-- Select --</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                      </select>
                      <input
                        id="researchPublicationFile"
                        type="file"
                        className="fileInputBox"
                        name="researchPublicationFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[7].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[7].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[7].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[7].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Innovative Projects */}
                  <tr>
                    <td className="border border-black px-2 py-1">
                      9. Innovative Projects (other than course curriculum)
                      <select
                        name="innovativeProjects"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.innovativeProjects}
                      >
                        <option value="0">-- Select --</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                      </select>
                      <input
                        id="innovativeProjectsFile"
                        type="file"
                        className="fileInputBox"
                        name="innovativeProjectsFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[8].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[8].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[8].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[8].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Blood Donation */}
                  <tr>
                    <td className="border border-black px-2 py-1">
                      10. Blood donation
                      <select
                        name="bloodDonation"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.bloodDonation}
                      >
                        <option value="0">-- Select --</option>
                        <option value="8">8</option>
                        <option value="16">16</option>
                      </select>
                      <input
                        id="bloodDonationFile"
                        type="file"
                        className="fileInputBox"
                        name="bloodDonationFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[9].subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[9].subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[9].subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[9].subpoints[0].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      Blood Donation Camp Organization
                      <select
                        name="bloodDonationCampOrganization"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.bloodDonationCampOrganization}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="bloodDonationCampOrganizationFile"
                        type="file"
                        className="fileInputBox"
                        name="bloodDonationCampOrganizationFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[9].subpoints[1].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[9].subpoints[1].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[9].subpoints[1].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[9].subpoints[1].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Sports/Games/Adventure Sports/Trekking/Yoga Camp */}
                  <tr className="bg-yellow-300 font-semibold">
                    <td colSpan={5} className="border border-black px-2 py-1">
                      11. Sports/Games/Adventure Sports/Trekking/Yoga Camp
                    </td>{" "}
                    {/* Colspan adjusted */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      a. Personal Level
                      <select
                        name="sportsPersonal"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsPersonal}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="sportsPersonalFile"
                        type="file"
                        className="fileInputBox"
                        name="sportsPersonalFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[0].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      b. College Level
                      <select
                        name="sportsCollege"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsCollege}
                      >
                        <option value="0">-- Select --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      <input
                        id="sportsCollegeFile"
                        type="file"
                        className="fileInputBox"
                        name="sportsCollegeFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[1].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[1].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[1].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[1].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      c. University Level
                      <select
                        name="sportsUniversity"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsUniversity}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="sportsUniversityFile"
                        type="file"
                        className="fileInputBox"
                        name="sportsUniversityFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[2].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[2].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[2].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[2].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      d. District Level
                      <select
                        name="sportsDistrict"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsDistrict}
                      >
                        <option value="0">-- Select --</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                      </select>
                      <input
                        id="sportsDistrictFile"
                        type="file"
                        className="fileInputBox"
                        name="sportsDistrictFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[3].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[3].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[3].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[3].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      e. State Level
                      <select
                        name="sportsState"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsState}
                      >
                        <option value="0">-- Select --</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                      </select>
                      <input
                        id="sportsStateFile"
                        type="file"
                        className="fileInputBox"
                        name="sportsStateFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[4].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[4].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[4].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[4].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      f. National/International Level
                      <select
                        name="sportsNationalInternational"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.sportsNationalInternational}
                      >
                        <option value="0">-- Select --</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                      <input
                        id="sportsNationalInternationalFile"
                        type="file"
                        className="fileInputBox"
                        name="sportsNationalInternationalFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[5].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[5].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[5].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[10].subpoints[5].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Activities in a Professional Society/Student Chapter */}
                  <tr>
                    <td className="border border-black px-2 py-1">
                      12. Activities in a Professional Society/Student Chapter
                      <select
                        name="professionalSocietyActivities"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.professionalSocietyActivities}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="professionalSocietyActivitiesFile"
                        type="file"
                        className="fileInputBox"
                        name="professionalSocietyActivitiesFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[11].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[11].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[11].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[11].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Relevant Industry Visit & Report/Hotel-Event Management Training & Report */}
                  <tr>
                    <td className="border border-black px-2 py-1">
                      13. Relevant Industry Visit & Report/Hotel-Event
                      Management Training & Report (Minimum 3 days with
                      submitted report)
                      <select
                        name="industryVisit"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.industryVisit}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="industryVisitFile"
                        type="file"
                        className="fileInputBox"
                        name="industryVisitFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[12].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[12].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[12].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[12].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Community Service & Allied Activities */}
                  <tr>
                    <td className="border border-black px-2 py-1">
                      14. Community Service & Allied Activities like: Caring for
                      the Senior Citizens, Under-privileged/Street Children/
                      Animal Care etc/ Training to Differently Able
                      <select
                        name="communityService"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.communityService}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="communityServiceFile"
                        type="file"
                        className="fileInputBox"
                        name="communityServiceFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[13].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[13].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[13].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[13].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>

                  {/* Self-Entrepreneurship Programme */}
                  <tr className="bg-yellow-300 font-semibold">
                    <td colSpan={5} className="border border-black px-2 py-1">
                      15. Self-Entrepreneurship Programme
                    </td>{" "}
                    {/* Colspan adjusted */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      a. To organise entrepreneurship programmes and workshops
                      <select
                        name="entrepreneurshipOrganize"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipOrganize}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="entrepreneurshipOrganizeFile"
                        type="file"
                        className="fileInputBox"
                        name="entrepreneurshipOrganizeFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[0].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[0].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      b. To take part in entrepreneurship workshop and get
                      certificate
                      <select
                        name="entrepreneurshipParticipate"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipParticipate}
                      >
                        <option value="0">-- Select --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      <input
                        id="entrepreneurshipParticipateFile"
                        type="file"
                        className="fileInputBox"
                        name="entrepreneurshipParticipateFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[1].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[0].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[0].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[0].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      c. Video film making on entrepreneurship
                      <select
                        name="entrepreneurshipVideo"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipVideo}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="entrepreneurshipVideoFile"
                        type="file"
                        className="fileInputBox"
                        name="entrepreneurshipVideoFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[2].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[2].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[2].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[2].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      d. Submit business plan on any project
                      <select
                        name="entrepreneurshipBusinessPlan"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipBusinessPlan}
                      >
                        <option value="0">-- Select --</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                      <input
                        id="entrepreneurshipBusinessPlanFile"
                        type="file"
                        className="fileInputBox"
                        name="entrepreneurshipBusinessPlanFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[3].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[3].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[3].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[3].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">
                      e. To work for start-up/as entrepreneur
                      <select
                        name="entrepreneurshipWorkForStartup"
                        className="pointsDropdown"
                        onChange={handleChange}
                        value={formData.entrepreneurshipWorkForStartup}
                      >
                        <option value="0">-- Select --</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </select>
                      <input
                        id="entrepreneurshipWorkForStartupFile"
                        type="file"
                        className="fileInputBox"
                        name="entrepreneurshipWorkForStartupFile"
                        onChange={handleChange}
                      />
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[4].point_per_activity}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[4].max}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[4].remain}
                    </td>
                    <td className="border border-black text-center">
                      {data[14].subpoints[4].already_acquired}
                    </td>{" "}
                    {/* Remaining Points */}
                  </tr>
                </tbody>
              </table>

            </form>
          </div>
          <button
            type="submit"
            className="mt-4 flex gap-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer w-30 hover:bg-blue-600 transition-colors duration-200"
            onClick={handleSubmit}
          >
            <Save/>
            Submit
          </button>
        </div>
      ) : (
        <div className="pt-1 sm:pt-6 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
          <p className="text-red-600 font-semibold text-lg">
            You can't access this page now.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentYearlyDetails;
