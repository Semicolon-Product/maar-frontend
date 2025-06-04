

const AllPoints = () => {
    return (
        <div>
            <table className="pointTable">
                <tr className="tableHeader">
                    <th >Activity Points</th>
                    <th className="headText">Pointsper Activity</th>
                    <th className="headText">Permissible Points(max)</th>
                    <th className="headText">Remain Point</th>
                </tr>
                <tr className="ponitHeadingRow">
                    <td className="pointHeadeing" colSpan={4}>1. MOOCS (SWAYAM/NPTEL/Spoken Tutorial etc.)</td>

                </tr>
                <tr className="subheadingRow">
  <td colSpan={2} className="p-2">
    a. 12 weeks / 40 Hours
    <input
      type="number"
      placeholder="Enter Points"
      className="border rounded-[4px] px-2 w-[100px] ml-2"
    />
  </td>
  <td className="p-2">20</td>
  <td className="p-2">40</td>
  <td className="p-2">12</td>
</tr>




                <div>
                    <div>

                        <div className="space-y-2 flex flex-col ml-5">


                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />

                            <label htmlFor="">b. 8 weeks / 30 Hours</label>
                            <input
                                type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                            <label htmlFor="">c. 4 weeks / 20 Hours</label>
                            <input
                                type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                            <label htmlFor="">d. 2 weeks / 10 Hours</label>
                            <input
                                type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />


                        </div>
                    </div>

                    {/* 2. Fest Participation */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">2. TechFest / Teachers Day / Fresher’s Welcome</h3>
                        <div className="space-y-2 flex flex-col ml-5">

                            <label htmlFor="">a. Organizer</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">b. Participant</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                        </div>

                    </div>

                    {/* 3. Rural Reporting */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">3. Rural Reporting</h3>
                        <div className="space-y-2 flex flex-col ml-5">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>
                    </div>


                    {/* 4. Tree plantation */}

                    <div>
                        <h3 className="text-xl font-semibold mb-2">4. Tree plantation and Up-keeping(per tree)</h3>
                        <div className="space-y-2 flex flex-col ml-5 formHeading">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>
                    </div>

                    {/* 5. Relief/Charitable Activities */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">5. Relief / Charitable Activities</h3>
                        <div className="space-y-2 flex flex-col ml-5">

                            <label htmlFor="">a. Collection of fund/materials</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">b. Part of the relief work team</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                        </div>

                    </div>

                    {/* 6. Cultural Activities */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">6. Participation in Debate / GroupDiscussion / Workshop / Techquiz <br /> / Music / Dance / Drama / Elocution / Quiz / Seminar /Painting<br /> / any Performing Arts / Photography / FilmMaking/</h3>
                        <div className="space-y-2 flex flex-col ml-5">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>
                    </div>

                    {/* 7. Publications */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">7 .Publication in NewsPaper,Magazine,WallMagazine&Blogs</h3>
                        <div className="space-y-2 flex flex-col ml-5">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>
                    </div>

                    {/* 8. Research Publication */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">8. Research Publication (per publication)</h3>
                        <div className="space-y-2 flex flex-col ml-5">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>
                    </div>

                    {/* 9. Innovative Projects */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">9. Innovative Projects (other than curriculum)</h3>
                        <div className="space-y-2 flex flex-col ml-5">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>
                    </div>

                    {/* 10. Blood Donation */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading" >10. Blood Donation</h3>
                        <div className="space-y-2 flex flex-col ml-5">

                            <label htmlFor="">a. Blood Donation</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">b. Blood Donation Camp Organization</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                        </div>

                    </div>



                    {/* 11. Sports */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">11. Sports / Games / Yoga</h3>
                        <div className="space-y-2 flex flex-col ml-5">

                            <label htmlFor="">a. Personal Level</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">b. College Level</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">c. University Level</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">d. District Level</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">e. State Level</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">f. National / International Level</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                        </div>


                    </div>

                    {/* 12. Professional Society */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">12. Activities in a Professional Society / Student Chapter</h3>
                        <div className="space-y-2 flex flex-col ml-5">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>

                    </div>


                    {/* 13. Industry Visit */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">13. Relevant Industry Visit / Event Training with Report</h3>
                        <div className="space-y-2 flex flex-col ml-5">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>

                    </div>


                    {/* 14. Community Service */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">14. Community Service & Allied Activities</h3>
                        <div className="space-y-2 flex flex-col ml-5">
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"
                            />
                        </div>

                    </div>


                    {/* 15. Entrepreneurship */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 formHeading">11. Sports / Games / Yoga</h3>
                        <div className="space-y-2 flex flex-col ml-5">

                            <label htmlFor="">a. To organise entrepreneurship programmes and workshops</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">b.To take part in entrepreneurship workshop and get certificate</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">c. Video film making on entrepreneurship</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">d. Submit business plan on any project</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />
                            <label htmlFor="">e. To work for start-up / as entrepreneur</label>
                            <input type="number"
                                placeholder="Enter Points"
                                className="border rounded-[4px] px-2 w-[20%]"

                            />

                        </div>


                    </div>

                </div>
            </table>
        </div>
    )
}

export default AllPoints
