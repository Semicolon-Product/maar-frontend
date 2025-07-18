import { postApi } from '@/api/postApi';
import { getTeacherDetailsFromApi } from '@/api/teacherApi';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaCloudUploadAlt } from 'react-icons/fa';
import { MdOutlineSaveAlt } from "react-icons/md";
import { dummyStudents } from "@/components/data/data";
import { superadminStyle } from '../styles/style';


const TeacherDetails = () => {



    const [teacherDataApi, setTeacherDataApi] = useState();
    const [studentData, setStudentData] = useState<any[]>([
        {
            year: "1st Year",
            count: 120,
            submit: 95,
            remain: 25,
        },
        {
            year: "2nd Year",
            count: 110,
            submit: 100,
            remain: 10,
        },
        {
            year: "3rd Year",
            count: 105,
            submit: 90,
            remain: 15,
        },
        {
            year: "4th Year",
            count: 98,
            submit: 85,
            remain: 13,
        },
    ]);
    const getTeacherDetails = async () => {
        const res = await getTeacherDetailsFromApi();
        setTeacherDataApi(res.data.teacher)
        setStudentData(res.data.teacher.studentData)
        console.log("getTeacherDetailsFromApi==", res.data.teacher)
    }

    useEffect(() => {
        getTeacherDetails();
    }, [])
    /* const teacherData = [
        {
            teacher: {
                id:36,
                name: "Mr. Sekhar Ghosh",
                email: "sekhar.ghosh@school.edu",
                department: "Computer Science",
                signature: "https://th.bing.com/th/id/OIP.N-DME1_QlRohlzmTfDfkSQHaDb?rs=1&pid=ImgDetMain"
            },
            studentData: [
                { year: "1st Year", count: 150, submit: 50, remain: 100 },
                { year: "2nd Year", count: 102, submit: 60, remain: 42 },
                { year: "3rd Year", count: 87, submit: 40, remain: 47 },
                { year: "4th Year", count: 95, submit: 70, remain: 25 }
            ]
        }
    ]; */
    //const teacher = teacherData[0].teacher;

    //const studentData = teacher[0].studentData;

    const [year, setYear] = useState("1");
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [signatureFile, setSignatureFile] = useState<File | null>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        /*  if (!excelFile || !signatureFile) {
           alert("Please upload both Excel file and signature");
           return;
         } */

        const formData = new FormData();
        formData.append("year", year);
        formData.append("excel", excelFile);
        formData.append("signature", signatureFile);
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            const res = await postApi("uploadStudentsWithSignature",);
            console.log("res ==", res)

        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rollNo: "",
        mobileNo: "",
        year: "",
    });

    const [students, setStudents] = useState(dummyStudents);

    const [selectedYear, setSelectedYear] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitStudent = (e) => {
        e.preventDefault();
        const newStudent = { ...formData, id: students.length + 1 };
        setStudents([...students, newStudent]);
        console.log("submit data::",formData)
        setFormData({ name: "", email: "", rollNo: "", mobileNo: "", year: "" });
    };

    const filteredStudents = selectedYear
        ? students.filter((s) => s.year === selectedYear)
        : [];

    const uniqueYears = [...new Set(students.map((s) => s.year))];
    return (
        <div>
            <div className="p-4 space-y-8 bg-gray-50 min-h-screen">
                {/* Teacher Info Card */}
                <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto border border-green-200">
                    <h2 className="text-2xl font-semibold mb-6 text-green-800 border-b pb-2 flex gap-1"><FaChalkboardTeacher className="mt-2 " /> Teacher Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2  items-center ">
                        {/* Column 1: Teacher Info */}
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Name:</strong> {teacherDataApi?.name}</p>
                            <p><strong>Email:</strong> {teacherDataApi?.userId}</p>
                            <p><strong>Department:</strong> {teacherDataApi?.department}</p>
                        </div>

                        {/* Column 2: Signature */}
                        <div className="flex flex-col items-center md:items-end gap-2">
                            <div className="border-2 border-dotted border-green-400 p-2 rounded bg-white" style={{ height: "100px", width: "300px" }}>
                                {teacherDataApi?.signature ? (
                                    <img
                                        src={teacherDataApi.signature}
                                        alt="Signature"
                                        style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm">Please Upload Signature</span>
                                )}
                            </div>

                            {/* Signature Upload Field */}
                            <input
                                id="signatureUpload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSignatureFile(e.target.files[0])}
                                className="mt-2 w-full md:w-auto text-sm file:bg-green-500 file:text-white file:rounded file:px-4 file:py-1 file:border-0 file:cursor-pointer bg-green-100 rounded border border-green-300 p-1"
                            />
                        </div>
                    </div>
                </div>

                {/* Student Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {studentData?.map((item, index) => (
                        <div key={index} className="bg-yellow-100 rounded-xl shadow p-4 text-center space-y-2 border-1 border-yellow-300">
                            <h3 className="text-lg font-semibold text-gray-800">{item.year}</h3>
                            <p className="text-2xl font-bold text-blue-700">{item.count}</p>
                            <p className="text-sm text-green-700">Submitted: {item.submit}</p>
                            <p className="text-sm text-red-700">Remaining: {item.remain}</p>
                        </div>
                    ))}
                </div>

                {/* File Upload Section */}
                <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto border border-red-200">
                    <h2 className="text-2xl font-semibold mb-4 text-red-600 flex gap-2"><FaCloudUploadAlt className='mt-1' /> Upload Student Data</h2>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Instructions */}
                        <div className="bg-red-50 border border-red-300 p-4 rounded-md text-sm text-gray-800 md:w-2/5">
                            <h3 className="font-semibold mb-2">Excel File Format:</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Allowed formats: <strong>.xlsx</strong>, <strong>.xls</strong></li>
                                <li>Headers must be:
                                    <ul className="ml-4 list-disc">
                                        <li><code>Name</code></li>
                                        <li><code>Email</code></li>
                                        <li><code>University_Roll_No</code></li>
                                        <li><code>Mobile_No</code></li>
                                    </ul>
                                </li>
                                <li>Each student in a new row.</li>
                                <li>No blank required fields.</li>
                                <li>Check email & mobile formats.</li>
                            </ul>
                        </div>

                        {/* Form */}
                        <form className="flex flex-col gap-4 md:w-3/5" onSubmit={handleSubmit}>
                            {/* Year Dropdown */}
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Select Year</label>
                                <select
                                    id="year"
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full p-2 rounded border border-gray-300 bg-red-50 focus:ring-1 focus:ring-red-300"
                                >
                                    <option value="">--Select--</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </select>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-1">Upload Excel File</label>
                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={(e) => setExcelFile(e.target.files[0])}
                                    className="w-full p-2 rounded border border-gray-300 bg-red-50 focus:ring-1 focus:ring-red-300"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2"
                            >
                                <MdOutlineSaveAlt className="text-lg" />
                                Save
                            </button>
                        </form>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto p-6 space-y-6">
                    <form onSubmit={handleSubmitStudent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            type="text"
                            name="rollNo"
                            placeholder="University Roll No"
                            value={formData.rollNo}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            type="text"
                            name="mobileNo"
                            placeholder="Mobile No"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        >
                            <option value="">Select Admission Year</option>
                            {Array.from({ length: 5 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>


                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
                        >
                            Save
                        </button>

                    </form>

                    {students.length > 0 && (
                        <div className="flex justify-end">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="">Select Year</option>
                                {uniqueYears.map((year, i) => (
                                    <option key={i} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {filteredStudents.length > 0 && (
                        <Table className="mt-4">
                            <TableHead sx={{ ...superadminStyle.headerStyle, }}>
                                <TableRow>
                                    <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "15px", background: "#2a4045", color: "white", p: 1 }}>Name</TableCell>
                                    <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "15px", background: "#2a4045", color: "white", p: 1 }}>Email</TableCell>
                                    <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "15px", background: "#2a4045", color: "white", p: 1 }}>Roll No</TableCell>
                                    <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "15px", background: "#2a4045", color: "white", p: 1 }}>Mobile No</TableCell>
                                    <TableCell sx={{ ...superadminStyle.cellStyle, fontSize: "15px", background: "#2a4045", color: "white", p: 1 }}>Year</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredStudents.map((student, i) => (
                                    <TableRow key={i} sx={{ borderBottom: "1px solid black" }}>
                                        <TableCell sx={{ fontSize: "15px", p: 1, border: "1px solid #2a4045" }}>{student.name}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", p: 1, border: "1px solid #2a4045" }}>{student.email}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", p: 1, border: "1px solid #2a4045" }}>{student.rollNo}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", p: 1, border: "1px solid #2a4045" }}>{student.mobileNo}</TableCell>
                                        <TableCell sx={{ fontSize: "15px", p: 1, border: "1px solid #2a4045" }}>{student.year}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>

    );
};

export default TeacherDetails;
