import React from 'react';

const TeacherDetails = () => {
    const studentData = [
        { year: "1st Year", count: 150, submit: 50, remain: 100 },
        { year: "2nd Year", count: 102, submit: 60, remain: 42 },
        { year: "3rd Year", count: 87, submit: 40, remain: 47 },
        { year: "4th Year", count: 95, submit: 70, remain: 25 },
    ];


    return (
        <div className="p-4 space-y-6">
            {/* Teacher Info Card */}
            <div className="bg-green-100 rounded-xl shadow p-6 w-full max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Teacher Information
                </h2>
                <div className="space-y-2 text-gray-700">
                    <p><strong>Name:</strong> Mr. Sekhar Ghosh</p>
                    <p><strong>Email:</strong> sekhar.ghosh@school.edu</p>
                    <p><strong>Department:</strong> Computer Science</p>

                </div>
            </div>

            {/* Student Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {studentData.map((item, index) => (
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

                {/* Instruction Box */}
                <div className="bg-red-50 border border-red-300 p-4 rounded-md mb-6 text-sm text-gray-700">
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
                    </ul>
                </div>

                <form className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Year Selector */}
                    <div className="flex flex-col w-full sm:w-1/2">
                        <label htmlFor="year" className="text-sm font-medium text-gray-700 mb-1">
                            Select Year
                        </label>
                        <select
                            id="year"
                            className="p-2 rounded border border-gray-300 bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-300"
                        >
                            <option value="">--Select--</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>

                    {/* File Input */}
                    <div className="flex flex-col w-full sm:w-1/2">
                        <label htmlFor="fileUpload" className="text-sm font-medium text-gray-700 mb-1">
                            Upload Excel File
                        </label>
                        <input
                            id="fileUpload"
                            type="file"
                            accept=".xlsx, .xls"
                            className="p-2 rounded border border-gray-300 bg-red-50 focus:ring-1 focus:ring-red-300"
                        />
                    </div>
                </form>
            </div>


        </div>
    );
};

export default TeacherDetails;
