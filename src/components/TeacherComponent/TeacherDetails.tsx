import { postApi } from '@/api/postApi';
import { getTeacherDetailsFromApi } from '@/api/teacherApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineSaveAlt } from "react-icons/md";


const TeacherDetails = () => {



    const [teacherDataApi, setTeacherDataApi] = useState();
    const [studentData, setStudentData] = useState<any[]>([]);
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
      console.log("res ==",res)
      
    } catch (err) {
      console.error("Upload failed", err);
    }
  };
    return (
        <div className="p-4 space-y-6">
            {/* Teacher Info Card */}
            <div className="bg-green-100 rounded-xl shadow p-6 w-full max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Teacher Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Column 1: Teacher Info */}
                    <div className="space-y-2 text-gray-700">
                        <p><strong>Name:</strong> {teacherDataApi?.name}</p>
                        <p><strong>Email:</strong> {teacherDataApi?.userId}</p>
                        <p><strong>Department:</strong>{teacherDataApi?.department}</p>
                    </div>

                    {/* Column 2: Signature */}
                    <div className="flex flex-col items-center md:items-end">

                        <div className="border-2 border-dotted border-green-400 p-2 rounded">
                            <img
                                src={teacherDataApi?.signature}
                                alt="Signature"
                                className="h-20 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* Student Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {studentData?.map((item, index) => (
                    <div
                        key={index}
                        className="bg-yellow-100 rounded-xl shadow p-4 flex flex-col justify-between text-center"
                    >
                        <h3 className="text-lg font-medium text-gray-800 mb-2">{item.year}</h3>
                        <p className="text-2xl font-bold text-blue-600">{item.count}</p>
                        <p className="text-sm text-green-600 mt-2">Submitted: {item.submit}</p>
                        <p className="text-sm text-red-600">Remaining: {item.remain}</p>
                    </div>
                ))}

            </div>
            {/* File Upload Section */}
            <div className="bg-red-100 rounded-xl shadow p-6 w-full max-w-4xl mx-auto mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Student</h2>

                {/* Responsive 2-column layout on md+ */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Instruction Box - takes ~40% width on md+ */}
                    <div className="bg-red-50 border border-red-300 p-4 rounded-md text-sm text-gray-700 md:w-4/5">
                        <h3 className="font-medium mb-2">📋 Excel File Format Instructions:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Only upload <strong>.xlsx</strong> or <strong>.xls</strong> files.</li>
                            <li>Ensure the first row contains headers with these exact column names:</li>
                            <ul className="list-disc list-inside ml-4 text-gray-800">
                                <li><code>Name</code></li>
                                <li><code>Email</code></li>
                                <li><code>University_Roll_No</code></li>
                                <li><code>Mobile_No</code></li>
                            </ul>
                            <li>Each student record should be placed in a new row under the corresponding headers.</li>
                            <li>Do not leave any mandatory field blank.</li>
                            <li>Double-check email and mobile number formats before uploading.</li>
                            <li className='text-red-600'>Upload Signature one time.</li>
                        </ul>
                    </div>

                    {/* Input Fields - takes ~60% width on md+ */}
                    <form className="flex flex-col gap-4 md:w-3/5 mt-1" onSubmit={handleSubmit}>
                        {/* Year Selector */}
                        <div className="flex flex-col">
                            <label htmlFor="year" className="text-sm font-medium text-gray-700 mb-1">
                                Select Year
                            </label>
                            <select
                                id="year"
                                className="p-2 rounded border border-gray-300 bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-300"
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">--Select--</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>

                        {/* Excel File Upload */}
                        <div className="flex flex-col">
                            <label htmlFor="fileUpload" className="text-sm font-medium text-gray-700 mb-1">
                                Upload Excel File
                            </label>
                            <input
                                id="fileUpload"
                                type="file"
                                accept=".xlsx, .xls"
                                className="p-2 rounded border border-gray-300 bg-red-50 focus:ring-1 focus:ring-red-300"
                                onChange={(e) => setExcelFile(e.target.files[0])}
                            />
                        </div>

                        {/* Signature Upload */}
                        <div className="flex flex-col">
                            <label htmlFor="signatureUpload" className="text-sm font-medium text-gray-700 mb-1">
                                Upload Signature (Image)
                            </label>
                            <input
                                id="signatureUpload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSignatureFile(e.target.files[0])}
                                className="p-2 rounded border border-gray-300 bg-red-50 focus:ring-1 focus:ring-red-300"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-2 flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white font-medium rounded-md p-2 transition duration-200"
                        >
                            <MdOutlineSaveAlt className="text-lg" />
                            Save
                        </button>


                    </form>
                </div>
            </div>



        </div>
    );
};

export default TeacherDetails;
