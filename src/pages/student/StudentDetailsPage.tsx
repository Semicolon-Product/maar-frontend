import React, { useEffect, useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Adjust based on your setup
import { Button } from "@/components/ui/button";
/* import InputWithLabel from '@/components/InputWithLabel';
import AllPoints from '@/components/AllPoints';
import NewAllPoint from '@/components/NewAllPoint'; */
import StudentYearlyDetails from '@/components/StudentComponent/StudentYearlyDetails';
//import { studentdata } from '@/components/data/data';
import { LogOut, X } from 'lucide-react';
import { FaGraduationCap } from "react-icons/fa";
import { BookOpen, User2, CalendarCheck2, GraduationCap } from "lucide-react";

import StudentDetail from '@/components/StudentComponent/StudentDetail';
import { getApi } from '@/api';
import { useNavigate } from 'react-router-dom';
import type { StudentResponseofGetDetails, YearWiseActivityStructure } from '@/components/types/superadminType';
interface SidebarContentProps {

    selectedYear: string;
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
    student: StudentResponseofGetDetails;
}

const StudentDetails = () => {

    const navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState("details");
    const [studentdata, setStudentData] = useState<YearWiseActivityStructure>()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [studentDetails, setStudentDetails] = useState<StudentResponseofGetDetails>();


    const getProfileDetails = async () => {
        await getApi("student/getDetails").then((res) => {
            //console.log(" res in get student::", res)
            setStudentDetails(res?.data)
        })
    }

    const getActivityDetails = async () => {
        await getApi("student/getActivityDetails").then((res) => {
            //console.log("res activity details::", res)
            setStudentData(res?.data?.studentData)
        })
    }

    useEffect(() => {
        getActivityDetails();
        getProfileDetails();
    }, [])

    if (selectedYear === "logout") {
        localStorage.removeItem("token");
        navigate("/");
    }
    console.log(studentDetails)
    console.log("activity detail ", studentdata)

    return (
        <div className="flex h-[100vh] overflow-hidden"  >

            {/* Sidebar for Desktop */}
            <div className="hidden md:block bg-gray-800 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto" >

                {studentDetails && (
                    <SidebarContent
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        student={studentDetails}
                    />
                )}
            </div>

            {/* Sidebar for Mobile */}
            {isSidebarOpen && (
                <div className="flex absolute inset-0 bg-gray-900 text-white w-64 px-2 pt-2 md:hidden top-0 h-screen overflow-y-auto z-[999] flex-col">
                    <div className="flex justify-end p-2">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white hover:text-red-400">
                            <X size={24} />

                        </button>
                    </div>
                    <div onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {studentDetails && (
                            <SidebarContent
                                selectedYear={selectedYear}
                                setSelectedYear={setSelectedYear}
                                student={studentDetails}
                            />
                        )}</div>

                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto ">

                {/* Top bar with menu icon */}
                <div className="flex justify-end p-0 pb-0">
                    <Button
                        className="text-black bg-transparent hover:bg-gray-100 md:hidden block"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <IoReorderThree className="text-xl scale-150" />
                    </Button>
                </div>

                <div className="p-0  mt-0">{/* <p>You are in {selectedYear} year</p> */}

                    {selectedYear === "details" && <div>
                        <StudentDetail student={studentDetails} />
                    </div>}


                    {selectedYear === "first" &&
                        <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">

                            <StudentYearlyDetails data={studentdata?.firstyear} currentyear={studentDetails?.current_year} year={1} />
                        </div>
                    }
                    {selectedYear === "second" &&
                        <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
                            <StudentYearlyDetails data={studentdata?.secondyear} currentyear={studentDetails?.current_year} year={2} />
                        </div>
                    }
                    {selectedYear === "third" &&
                        <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
                            <StudentYearlyDetails data={studentdata?.thirdyear} currentyear={studentDetails?.current_year} year={3} />
                        </div>
                    }
                    {selectedYear === "fourth" &&
                        <div className="pt-1 sm:pt-4 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
                            <StudentYearlyDetails data={studentdata?.fourthyear} currentyear={studentDetails?.current_year} year={4} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ selectedYear, setSelectedYear, student }) => {
    console.log("Student in SidebarContent:", student);

    return (
        <>
            <div className="flex flex-col h-full">
                <div className="flex items-center space-x-4 p-4 ">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SG</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-semibold">{student?.name}</h2>
                        <p className="text-sm text-gray-400">{student?.roll_no}</p>
                    </div>
                </div>

                <ul className="space-y-4 mt-4">
                    <li
                        className={`p-2 rounded cursor-pointer flex items-center gap-2 font-bold ${selectedYear === "details"
                            ? " text-blue-600"
                            : "hover:text-blue-700"
                            }`}
                        onClick={() => setSelectedYear("details")}
                    >
                        <User2 className="w-4 h-4" />
                        Details
                    </li>

                    {["first", "second", "third", "fourth"].map((year, idx) => {
                        const icons = [
                            <BookOpen className="w-4 h-4" />,
                            <CalendarCheck2 className="w-4 h-4" />,
                            <GraduationCap className="w-4 h-4" />,
                            <FaGraduationCap className="w-4 h-4" />,

                        ];

                        return (
                            <li
                                key={year}
                                className={`p-2 rounded cursor-pointer flex items-center gap-2 font-bold ${selectedYear === year
                                    ? " text-blue-600"
                                    : "hover:text-blue-700"
                                    }`}
                                onClick={() => setSelectedYear(year)}
                            >
                                {icons[idx]}
                                {year.charAt(0).toUpperCase() + year.slice(1)} Year
                            </li>
                        );
                    })}

                    <li
                        className={`p-2 rounded cursor-pointer flex items-center gap-2 font-bold ${selectedYear === "logout"
                            ? " text-blue-600"
                            : "hover:text-blue-700"
                            }`}
                        onClick={() => setSelectedYear("logout")}
                    >
                        <LogOut className="w-4 h-4 mt-0.5" />
                        Log Out
                    </li>
                </ul>


                <div className="text-center text-xs mt-auto text-gray-400 py-4 border-t border-gray-400">
                    © {new Date().getFullYear()} Abc Pvt Ltd
                </div>
            </div>
        </>
    );
};
export default StudentDetails;
