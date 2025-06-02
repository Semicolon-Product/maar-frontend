import React, { useState } from 'react';
import { IoReorderThree } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface SidebarContentProps {
    selectedSection: string;
    setSelectedSection: React.Dispatch<React.SetStateAction<string>>;
}

const TeacherPage = () => {
    const [selectedSection, setSelectedSection] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar for Desktop */}
            <div className="hidden md:block bg-gray-900 text-white w-64 px-2 pt-2 h-screen sticky top-0 overflow-y-auto">
                <SidebarContent selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            </div>

            {/* Sidebar for Mobile */}
            {isSidebarOpen && (
                <div className="inset-0 bg-gray-900 text-white w-64 z-50 px-2 pt-2 md:hidden sticky top-0 h-screen overflow-y-auto">
                    <SidebarContent selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
                    <div className="text-right pr-4">
                        <Button
                            className="mt-4 bg-white text-black"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">

                {/* Top bar with menu icon */}
                <div className="flex justify-end p-4 md:hidden">
                    <Button
                        className="text-black bg-transparent hover:bg-gray-100 "
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <IoReorderThree className="text-xl scale-150" />
                    </Button>
                </div>

                <div className="p-4">
                    <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                    <p className="mt-2 text-gray-700">
                        You are viewing the <strong>{selectedSection}</strong> section.
                    </p>

                    {/* Render Section Content */}
                    <div className="mt-6">
                        {selectedSection === "dashboard" && (
                            <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Teacher Information</h2>
                                <div className="space-y-2 text-gray-700">
                                    <p><strong>Name:</strong> Mr. Sekhar Ghosh</p>
                                    <p><strong>Email:</strong> sekhar.ghosh@school.edu</p>
                                    <p><strong>Department:</strong> Computer Science</p>
                                    <p><strong>Subjects:</strong> Data Structures, Web Development, Algorithms</p>
                                </div>
                            </div>
                        )}

                        {selectedSection === "classes" && <p>Your classes will appear here.</p>}
                        {selectedSection === "attendance" && <p>Manage attendance records.</p>}
                        {selectedSection === "assignments" && <p>Create and review assignments.</p>}
                        {selectedSection === "messages" && <p>View and reply to messages.</p>}
                        {selectedSection === "logout" && <p>Logging out...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ selectedSection, setSelectedSection }) => (
    <>
        <div className="flex items-center space-x-4 p-4">
            <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>TP</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-lg font-semibold">Mr. Sharma</h2>
                <p className="text-sm text-gray-400">Teacher ID: TCH2025</p>
            </div>
        </div>

        <ul className="space-y-4 mt-4">
            {[
                { id: "dashboard", label: "Dashboard" },
                { id: "classes", label: "My Classes" },
                { id: "attendance", label: "Attendance" },
                { id: "assignments", label: "Assignments" },
                { id: "messages", label: "Messages" },
                { id: "logout", label: "Logout" },
            ].map(({ id, label }) => (
                <li
                    key={id}
                    className={`p-2 rounded cursor-pointer ${selectedSection === id
                        ? "bg-black text-white"
                        : "hover:bg-gray-700"
                        }`}
                    onClick={() => setSelectedSection(id)}
                >
                    {label}
                </li>
            ))}
        </ul>
    </>
);

export default TeacherPage;
