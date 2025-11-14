import React, { useState } from "react";
import type { AutoSubmitToUniversityProps } from "../types/superadminType";
import { useToast } from "@/contexts/ToastContext";
import { postApi } from "@/api";

export interface YearData {
  students: any[];
  stats: {
    totalStudents: number;
    totalSubmitted: number;
    totalNotSubmitted: number;
    totalFullyVerified: number;
    totalNotVerified: number;
  };
}

const AutoSubmitToUniversity: React.FC<AutoSubmitToUniversityProps> = ({
  firstyear,
  secondyear,
  thirdyear,
  fourthyear,
}) => {
  const [selectedYear, setSelectedYear] = useState("first");
  const toast = useToast();
  const yearMap: Record<string, YearData | undefined> = {
    first: firstyear,
    second: secondyear,
    third: thirdyear,
    fourth: fourthyear,
  };

  const activeYear = yearMap[selectedYear];

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmitTeacherCredential = async (e: any) => {
    try {
      e.preventDefault();
      await postApi("teacher/university", credentials).then((res) => {
        toast.success(res?.message);
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* 🔵 Top Year Selection */}
      <div className="flex items-center justify-center gap-6 mb-8">
        {["first", "second", "third", "fourth"].map((year, idx) => (
          <label
            key={year}
            className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200"
          >
            <input
              type="radio"
              name="year"
              value={year}
              checked={selectedYear === year}
              onChange={() => setSelectedYear(year)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-semibold">
              {idx + 1} Year {idx === 1 ? "(2nd)" : ""}{" "}
              {idx === 2 ? "(3rd)" : ""} {idx === 3 ? "(4th)" : ""}
            </span>
          </label>
        ))}
      </div>

      {/* 🔵 Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Students", value: activeYear?.stats?.totalStudents },
          { label: "Submitted", value: activeYear?.stats?.totalSubmitted },
          {
            label: "Not Submitted",
            value: activeYear?.stats?.totalNotSubmitted,
          },
          { label: "Verified", value: activeYear?.stats?.totalFullyVerified },
          { label: "Not Verified", value: activeYear?.stats?.totalNotVerified },
        ].map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-lg shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {item.label}
            </p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* 🔵 Student Table */}
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Roll No</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Verified</th>
            </tr>
          </thead>

          <tbody>
            {activeYear?.students?.map((student) => {
              const verified = student.activities?.some(
                (act: any) => act.is_verified === true
              );

              return (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {student.name}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {student.roll_no}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {student.mobile_no}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {student.email}
                  </td>

                  <td className="px-4 py-3">
                    {verified ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ✔ Verified
                      </span>
                    ) : (
                      <span className="text-red-500 dark:text-red-400 font-semibold">
                        ✘ Not Verified
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔵 University Login Form */}
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
          Teacher University Credential
        </h2>
        <hr className="border-gray-300 dark:border-gray-600" />

        <form
          onSubmit={handleSubmitTeacherCredential}
          className="space-y-4 mt-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AutoSubmitToUniversity;
