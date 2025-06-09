import React, { useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Adjust based on your setup
import { Button } from "@/components/ui/button";
import InputWithLabel from '@/components/InputWithLabel';
import AllPoints from '@/components/AllPoints';
import NewAllPoint from '@/components/NewAllPoint';
import StudentYearlyDetails from '@/components/StudentComponent/StudentYearlyDetails';
import { firstYear, secondYear } from '@/components/data/data';
import { X } from 'lucide-react';
interface SidebarContentProps {
    selectedYear: string;
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
}

const StudentDetails = () => {
    const [selectedYear, setSelectedYear] = useState("first");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar for Desktop */}
            <div className="hidden md:block bg-gray-800 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto">

                <SidebarContent selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            </div>

            {/* Sidebar for Mobile */}
            {isSidebarOpen && (
                <div className="flex absolute inset-0 bg-gray-900 text-white w-64 px-2 pt-2 md:hidden top-0 h-screen overflow-y-auto z-[999] flex-col">
                    <div className="flex justify-end p-2">
                        <button onClick={() => setIsSidebarOpen(false)} className="text-white hover:text-red-400">
                            <X size={24} />

                        </button>
                    </div>
                    <SidebarContent selectedYear={selectedYear} setSelectedYear={setSelectedYear} />

                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">

                {/* Top bar with menu icon */}
                <div className="flex justify-end p-4">
                    <Button
                        className="text-black bg-transparent hover:bg-gray-100 md:hidden block"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <IoReorderThree className="text-xl scale-150" />
                    </Button>
                </div>

                <div className="p-0">{/* <p>You are in {selectedYear} year</p> */}

                    {selectedYear === "first" && <div>

                    </div>}


                    {selectedYear === "first" &&
                        <div className="pt-1 sm:pt-6 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
                            <StudentYearlyDetails data={firstYear} />
                        </div>
                    }
                    {selectedYear === "second" &&
                        <div className="pt-1 sm:pt-6 px-6 pb-6 space-y-6 sm:space-y-8 overflow-y-auto">
                            <StudentYearlyDetails data={secondYear} />
                        </div>
                    }






                </div>
            </div>
        </div>
    );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ selectedYear, setSelectedYear }) => (
    <>
        <div className="flex items-center space-x-4 p-4 ">
            <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SG</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-lg font-semibold">Sekhar Ghosh</h2>
                <p className="text-sm text-gray-400">25300121026</p>
            </div>
        </div>

        <ul className="space-y-4 mt-4">
            <li className={`p-2 rounded cursor-pointer ${selectedYear === "details"
                ? "bg-black text-white"
                : "hover:bg-gray-700"
                }`}
                onClick={() => setSelectedYear("details")}>Details</li>
            {["first", "second", "third", "fourth"].map((year) => (
                <li
                    key={year}
                    className={`p-2 rounded cursor-pointer ${selectedYear === year
                        ? "bg-black text-white"
                        : "hover:bg-gray-700"
                        }`}
                    onClick={() => setSelectedYear(year)}
                >
                    {year.charAt(0).toUpperCase() + year.slice(1)} Year
                </li>
            ))}
        </ul>

        <div className="mt-auto text-center text-xs text-gray-400 py-4 border-t border-gray-700">
            © {new Date().getFullYear()} Semicolon Pvt Ltd
        </div>
    </>
);

export default StudentDetails;
