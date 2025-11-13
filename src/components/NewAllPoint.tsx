import { useEffect, useState } from "react";
import {
  initialStudentActivityFormData,
  type StudentActivityFormData,
} from "./types/superadminType";
import { maxPointsPerActivity } from "@/maxPointsConfig";
import { activity } from "./data/data";
const NewAllPoint = () => {
  const [totalPoint, setTotalPoint] = useState(0);
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
    let currentTotalPoints: number = 0;
    const pointKeys: Array<keyof StudentActivityFormData> = [
      "moocs12Weeks",
      "moocs8Weeks",
      "moocs4Weeks",
      "moocs2Weeks",
      "techFestOrganizer",
      "techFestParticipant",
      "ruralReporting",
      "treePlantation",
      "reliefFundCollection",
      "reliefWorkTeam",
      "participationInArts",
      "publication",
      "researchPublication",
      "innovativeProjects",
      "bloodDonation",
      "bloodDonationCampOrganization",
      "sportsPersonal",
      "sportsCollege",
      "sportsUniversity",
      "sportsDistrict",
      "sportsState",
      "sportsNationalInternational",
      "professionalSocietyActivities",
      "industryVisit",
      "communityService",
      "entrepreneurshipOrganize",
      "entrepreneurshipParticipate",
      "entrepreneurshipVideo",
      "entrepreneurshipBusinessPlan",
      "entrepreneurshipWorkForStartup",
    ];

    // Iterate only over the keys that contain point values
    pointKeys.forEach((key) => {
      // Access the value from formData.
      // We use `as string` because TypeScript knows `formData[key]` could be `File | null`
      // for some keys, but for the `pointKeys` we explicitly listed, it will be a string.
      const rawValue = formData[key];
      const value =
        typeof rawValue === "string" || typeof rawValue === "number"
          ? parseInt(rawValue.toString(), 10)
          : 0; // or your fallback

      if (!isNaN(value)) {
        currentTotalPoints += value;
      }
    });

    setTotalPoint(currentTotalPoints); // Make sure this matches your useState variable name
  }, [formData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //console.log("Form Data Submitted:", formData);
    // Here you would typically send this data to a backend or process it further
  };
  const getRemainingPoints = (key: keyof StudentActivityFormData): number => {
    const max = maxPointsPerActivity[key] || 0; // Get max points, default to 0 if not configured
    const rawValue = formData[key];

    const selected =
      typeof rawValue === "string" || typeof rawValue === "number"
        ? parseInt(rawValue.toString(), 10) || 0
        : 0;
    // Get selected points, default to 0 if not selected/NaN
    return Math.max(0, max - selected); // Ensure remaining points is not negative
  };
  return (
    <div className="max-h-[90vh] overflow-y-auto">
      Total Points: {totalPoint}
      <form onSubmit={handleSubmit}>
        <table className="table-auto border border-black w-full text-sm">
          <thead className="bg-gray-300 font-semibold text-center sticky top-0 z-10">
            <tr>
              <th className="border border-black border-right px-2 py-1 sticky top-0 z-10">
                Activity
              </th>
              <th className="border border-black px-2 py-1 sticky top-0 z-10">
                Points per Activity
              </th>
              <th className="border border-black px-2 py-1 sticky top-0 z-10">
                Permissible Points (max)
              </th>
              <th className="border border-black px-2 py-1 sticky top-0 z-10">
                Remain Point
              </th>
              <th className="border border-black px-2 py-1 sticky top-0 z-10">
                Already Aquire
              </th>
            </tr>
          </thead>
          <tbody>
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
                {Number(activity[0].moocs12Weeks?.points)}
              </td>
              <td className="border border-black text-center" rowSpan={4}>
                {activity[0].max}
              </td>
              <td className="border border-black text-center" rowSpan={4}>
                {Number(activity[0].max) -
                  (Number(activity[0].moocs12Weeks?.alreadyAcquired) +
                    Number(activity[0].moocs8Weeks?.alreadyAcquired) +
                    Number(activity[0].moocs4Weeks?.alreadyAcquired) +
                    Number(activity[0].moocs2Weeks?.alreadyAcquired))}
                {/*remain point*/}
              </td>
              <td className="border border-black text-center" rowSpan={4}>
                {Number(activity[0].moocs12Weeks?.alreadyAcquired) +
                  Number(activity[0].moocs8Weeks?.alreadyAcquired) +
                  Number(activity[0].moocs4Weeks?.alreadyAcquired) +
                  Number(activity[0].moocs2Weeks?.alreadyAcquired)}
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
                {Number(activity[0].moocs8Weeks?.points)}
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
                {Number(activity[0].moocs4Weeks?.points)}
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
                {Number(activity[0].moocs2Weeks?.points)}
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
              <td className="border border-black px-2 py-1">
                a. Organizer
                <select
                  name="techFestOrganizer"
                  className="pointsDropdown"
                  onChange={handleChange}
                  value={formData.techFestOrganizer}
                >
                  <option value="0">-- Select --</option>

                  {[5, 10].map((value) => {
                    const isDisabled =
                      Number(activity[1].techFestOrganizer?.points) >
                      Number(activity[1].max) -
                        (Number(
                          activity[1].techFestOrganizer?.alreadyAcquired
                        ) +
                          Number(formData.techFestOrganizer));

                    return (
                      <option
                        key={value}
                        value={value}
                        disabled={isDisabled}
                        className={
                          isDisabled
                            ? "cursor-not-allowed bg-gray-200 text-gray-400"
                            : ""
                        }
                      >
                        {value}
                      </option>
                    );
                  })}
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
                {Number(activity[1].techFestOrganizer?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[1].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[1].max) -
                  (Number(activity[1].techFestOrganizer?.alreadyAcquired) +
                    Number(formData.techFestOrganizer))}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("techFestOrganizer")}
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
                {Number(activity[2].techFestParticipant?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[2].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[2].max) -
                  Number(activity[2].techFestParticipant?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("techFestParticipant")}
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
                {Number(activity[3].ruralReporting?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[3].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[3].max) -
                  Number(activity[3].ruralReporting?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("ruralReporting")}
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
                {Number(activity[4].treePlantation?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[4].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[4].max) -
                  Number(activity[4].treePlantation?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("treePlantation")}
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
                {Number(activity[5].reliefFundCollection?.points)}
              </td>
              <td className="border border-black text-center" rowSpan={2}>
                {activity[5].max}
              </td>
              <td className="border border-black text-center" rowSpan={2}>
                {Number(activity[5].max) -
                  Number(activity[5].reliefFundCollection?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center" rowSpan={2}>
                {getRemainingPoints("reliefFundCollection")}
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
                {Number(activity[5].reliefWorkTeam?.points)}
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
                {Number(activity[6].participationInArts?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[6].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[6].max) -
                  Number(activity[6].participationInArts?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("participationInArts")}
              </td>{" "}
              {/* Remaining Points */}
            </tr>

            {/* Publication */}
            <tr>
              <td className="border border-black px-2 py-1">
                7. Publication in News Paper, Magazine, Wall Magazine & Blogs
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
                {Number(activity[7].publication?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[7].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[7].max) -
                  Number(activity[7].publication?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("publication")}
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
                {Number(activity[8].researchPublication?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[8].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[8].max) -
                  Number(activity[8].researchPublication?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("researchPublication")}
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
                {Number(activity[9].innovativeProjects?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[9].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[9].max) -
                  Number(activity[9].innovativeProjects?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("innovativeProjects")}
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
                {Number(activity[10].bloodDonation?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[10].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[10].max) -
                  Number(activity[10].bloodDonation?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("bloodDonation")}
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
                {Number(activity[11].bloodDonationCampOrganization?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[11].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[11].max) -
                  Number(
                    activity[11].bloodDonationCampOrganization?.alreadyAcquired
                  )}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("bloodDonationCampOrganization")}
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
                {Number(activity[12].sportsPersonal?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[12].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[12].max) -
                  Number(activity[12].sportsPersonal?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("sportsPersonal")}
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
                {Number(activity[13].sportsCollege?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[13].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[13].max) -
                  Number(activity[13].sportsCollege?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("sportsCollege")}
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
                {Number(activity[14].sportsUniversity?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[14].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[14].max) -
                  Number(activity[14].sportsUniversity?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("sportsUniversity")}
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
                {Number(activity[15].sportsDistrict?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[15].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[15].max) -
                  Number(activity[15].sportsDistrict?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("sportsDistrict")}
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
                {Number(activity[16].sportsState?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[16].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[16].max) -
                  Number(activity[16].sportsState?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("sportsState")}
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
                {Number(activity[17].sportsNationalInternational?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[17].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[17].max) -
                  Number(
                    activity[17].sportsNationalInternational?.alreadyAcquired
                  )}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("sportsNationalInternational")}
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
                {Number(activity[18].professionalSocietyActivities?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[18].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[18].max) -
                  Number(
                    activity[18].professionalSocietyActivities?.alreadyAcquired
                  )}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("professionalSocietyActivities")}
              </td>{" "}
              {/* Remaining Points */}
            </tr>

            {/* Relevant Industry Visit & Report/Hotel-Event Management Training & Report */}
            <tr>
              <td className="border border-black px-2 py-1">
                13. Relevant Industry Visit & Report/Hotel-Event Management
                Training & Report (Minimum 3 days with submitted report)
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
                {Number(activity[19].industryVisit?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[19].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[19].max) -
                  Number(activity[19].industryVisit?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("industryVisit")}
              </td>{" "}
              {/* Remaining Points */}
            </tr>

            {/* Community Service & Allied Activities */}
            <tr>
              <td className="border border-black px-2 py-1">
                14. Community Service & Allied Activities like: Caring for the
                Senior Citizens, Under-privileged/Street Children/ Animal Care
                etc/ Training to Differently Able
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
                {Number(activity[20].communityService?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[20].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[20].max) -
                  Number(activity[20].communityService?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("communityService")}
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
                {Number(activity[21].entrepreneurshipOrganize?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[21].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[21].max) -
                  Number(
                    activity[21].entrepreneurshipOrganize?.alreadyAcquired
                  )}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("entrepreneurshipOrganize")}
              </td>{" "}
              {/* Remaining Points */}
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">
                b. To take part in entrepreneurship workshop and get certificate
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
                {Number(activity[22].entrepreneurshipParticipate?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[22].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[22].max) -
                  Number(
                    activity[22].entrepreneurshipParticipate?.alreadyAcquired
                  )}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("entrepreneurshipParticipate")}
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
                {Number(activity[23].entrepreneurshipVideo?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[23].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[23].max) -
                  Number(activity[23].entrepreneurshipVideo?.alreadyAcquired)}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("entrepreneurshipVideo")}
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
                {Number(activity[24].entrepreneurshipBusinessPlan?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[24].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[24].max) -
                  Number(
                    activity[24].entrepreneurshipBusinessPlan?.alreadyAcquired
                  )}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("entrepreneurshipBusinessPlan")}
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
                {Number(activity[25].entrepreneurshipWorkForStartup?.points)}
              </td>
              <td className="border border-black text-center">
                {activity[25].max}
              </td>
              <td className="border border-black text-center">
                {Number(activity[25].max) -
                  Number(
                    activity[25].entrepreneurshipWorkForStartup?.alreadyAcquired
                  )}
              </td>
              <td className="border border-black text-center">
                {getRemainingPoints("entrepreneurshipWorkForStartup")}
              </td>{" "}
              {/* Remaining Points */}
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewAllPoint;
