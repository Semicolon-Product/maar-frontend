
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useEffect, useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';

import { superadminStyle } from '../styles/style';
import { getApi, postApi } from '@/api';
import { toast } from 'react-toastify';
import type { StudentBasicInfo, StudentYearData, StudentYearDataArray, Teacher, YearlyStudentData } from '../types/superadminType';


const TeacherDetails = (teacherDetails: any) => {

    //console.log("from props::",teacherDetails.data.studentData)


    const [teacherDataApi, setTeacherDataApi] = useState<Teacher>();
    const [studentData, setStudentData] = useState<StudentYearDataArray>();

    useEffect(() => {
        setTeacherDataApi(teacherDetails?.data?.teacher)
        setStudentData(teacherDetails?.data?.studentData)
    }, [teacherDetails])




    //const [year, setYear] = useState("1");
    // const [excelFile, setExcelFile] = useState<File | null>(null);
    const [signatureFile, setSignatureFile] = useState<File | null>(null);

    /* const handleSubmit = async (e) => {
        e.preventDefault();

         if (!excelFile || !signatureFile) {
           alert("Please upload both Excel file and signature");
           return;
         }

        const formData = new FormData();
        formData.append("year", year);
        formData.append("excel", excelFile);
        formData.append("signature", signatureFile);
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }


    }; */

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rollNo: "",
        mobileNo: "",
        year: "",
    });

    const [students, setStudents] = useState<YearlyStudentData>();


    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitStudent = async (e: any) => {
        e.preventDefault();

        console.log("submit data::", formData)
        //setFormData({ name: "", email: "", rollNo: "", mobileNo: "", year: "" });
        await postApi("student/createIndividual", formData)
            .then((res) => {
                console.log("res in create", res);
                toast.success(res.message);
                getAllStudent();
            })
            .catch((err) => {
                console.log("Error creating student:", err.response.data.error);
                toast.error(err.response.data.error)
            });
    };

    const getAllStudent = async () => {
        await getApi("student/getAllStudents").then((res) => {
            console.log("res all studetn", res)
            setStudents(res?.data)

        });
    }
    useEffect(() => {
        getAllStudent();
    }, [])

    const [selectedYear, setSelectedYear] = useState<string>("");

    // Extract years from object keys like 1, 2, 3, 4
    const availableYears = Object.keys(students ?? {}).sort((a: any, b: any) => a - b);


    // Optional: convert 1 → 1st Year, 2 → 2nd Year, etc.
    const formatYear = (year: number) => {
        const suffix = ["th", "st", "nd", "rd", "th"];
        const v = year % 100;
        return `${year}${suffix[(v - 20) % 10] || suffix[v] || suffix[0]} Year`;
    };
    console.log("students all", students)
    console.log("students all", typeof (students))
    console.log("selected::::", typeof (selectedYear))

    const [fileError, setFileError] = useState(false);
    const handleSignatureUpload = async () => {
        if (!signatureFile) {
            setFileError(true)
            return;
        }
        const formData = new FormData();
        formData.append('signature', signatureFile);
        await postApi("/upload-signature", formData).then((res)=>{
            console.log("res of upload==>>",res)
        })

        console.log("signatureFile==>>>>", signatureFile)
    }
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
                            <p><strong>Email:</strong> {teacherDataApi?.email}</p>
                            <p><strong>Department:</strong> {teacherDataApi?.department}</p>
                        </div>

                        {/* Column 2: Signature */}
                        <div className="flex flex-col items-center md:items-end gap-3">
                            {/* Signature Preview Box */}
                            <div className="border-2 border-dotted border-green-400 p-2 rounded bg-white shadow-sm" style={{ height: "100px", width: "300px" }}>
                                {teacherDataApi?.signature ? (
                                    <img
                                        src={teacherDataApi.signature}
                                        alt="Signature"
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                        Please Upload Signature
                                    </div>
                                )}
                            </div>

                            {/* Upload Input + Button */}
                            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                                <input
                                    id="signatureUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setSignatureFile(e.target.files[0])}
                                    className="text-sm file:bg-green-600 file:text-white file:rounded file:px-4 file:py-1 file:border-0 file:cursor-pointer bg-green-100 rounded border border-green-300 p-1 w-full sm:w-auto"
                                />

                                <button
                                    type="button"
                                    onClick={handleSignatureUpload}
                                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded shadow"
                                >
                                    Upload
                                </button>

                            </div>
                            {fileError && !signatureFile && (
                                <span className='text-red-500 text-[15px]'>Please Select File!</span>
                            )}


                        </div>

                    </div>
                </div>

                {/* Student Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto ">
                    {studentData?.map((item: StudentYearData, index: number) => (
                        <div key={index} className="bg-blue-50 rounded-xl shadow p-4 text-center space-y-2 border-1 border-blue-300">
                            <h3 className="text-lg font-semibold text-gray-800">{item.year}</h3>
                            <p className="text-2xl font-bold text-blue-700">{item.count}</p>
                            <p className="text-sm text-green-700 font-semibold">Submitted: {item.submit}</p>
                            <p className="text-sm text-red-700 font-semibold">Remaining: {item.remain}</p>
                        </div>
                    ))}
                </div>


                {/*  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto border border-red-200">
                    <h2 className="text-2xl font-semibold mb-4 text-red-600 flex gap-2"><FaCloudUploadAlt className='mt-1' /> Upload Student Data</h2>

                    <div className="flex flex-col md:flex-row gap-6">
                        
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

                       
                        <form className="flex flex-col gap-4 md:w-3/5" onSubmit={handleSubmit}>
                           
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

                           
                            <button
                                type="submit"
                                className="mt-2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2"
                            >
                                <MdOutlineSaveAlt className="text-lg" />
                                Save
                            </button>
                        </form>
                    </div>
                </div> */}

                <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gradient-to-br from-[#fef2e8] via-white to-[#ffd9cf] rounded-xl">
                    <form onSubmit={handleSubmitStudent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full bg-white"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 rounded w-full bg-white"
                            required
                        />
                        <input
                            type="text"
                            name="rollNo"
                            placeholder="University Roll No"
                            value={formData.rollNo}
                            onChange={handleChange}
                            className="border p-2 rounded w-full bg-white"
                            required
                        />
                        <input
                            type="text"
                            name="mobileNo"
                            placeholder="Mobile No"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            className="border p-2 rounded w-full bg-white"
                            required
                        />
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="border p-2 rounded w-full bg-white"
                            required
                        >
                            <option value="">Select Admission Year</option>
                            <option value="1">1st Year </option>
                            <option value="2">2nd Year </option>
                            <option value="3">3rd Year </option>
                            <option value="4">4th Year </option>

                        </select>


                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
                        >
                            Save
                        </button>

                    </form>

                    {availableYears.length > 0 && (
                        <div className="flex justify-end mb-4">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="border p-2 rounded bg-white"
                            >
                                <option value="">Select Year</option>
                                {availableYears.map((year) => (
                                    <option key={year} value={year}>
                                        {formatYear(parseInt(year))}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {selectedYear && students?.[selectedYear] && (
                        <TableContainer component={Paper}>
                            <Table sx={{ fontSize: "22px" }}>
                                <TableHead >
                                    <TableRow sx={{ backgroundColor: "#2a4054", height: "30px" }}>
                                        <TableCell sx={superadminStyle.headerStyle}>Name</TableCell>
                                        <TableCell sx={superadminStyle.headerStyle}>Email</TableCell>
                                        <TableCell sx={superadminStyle.headerStyle}>Roll No</TableCell>
                                        <TableCell sx={superadminStyle.headerStyle}>Mobile No</TableCell>
                                        <TableCell sx={superadminStyle.headerStyle}>Year</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students[selectedYear]?.map((student: StudentBasicInfo, index: number) => (
                                        <TableRow key={index} sx={{
                                            background: index % 2 ? "#eceff1" : "white",
                                        }}>
                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: { xs: "10px", sm: "4px", } }}>{student.name}</TableCell>
                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: { xs: "10px", sm: "4px", } }}>{student.email}</TableCell>
                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: { xs: "10px", sm: "4px", } }}>{student.roll_no}</TableCell>
                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: { xs: "10px", sm: "4px", } }}>{student.mobile_no}</TableCell>
                                            <TableCell sx={{ ...superadminStyle.cellStyle, py: { xs: "10px", sm: "4px", } }}>{student.admission_year}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>)}

                </div>
            </div>
        </div>

    );
};

export default TeacherDetails;
