import React, { useState } from "react";
import axios from "axios";
const Automate = () => {
  const [studentData, setStudentData] = useState({
    roll: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/submit-form", {
        roll: studentData.roll,
        password: studentData.password,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error: " + error);
    }

    // console.log("Student Details:::=>>>", studentData);
  };

  return (
    <div className="w-[30%] m-20">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">University Roll No.</label>
        <input
          type="text"
          id="roll"
          placeholder="25300121000"
          className="border rounded-md px-3 py-2"
          required
          value={studentData.roll}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Password</label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </a>
        </div>
        <input
          type="password"
          id="password"
          className="border rounded-md px-3 py-2"
          required
          value={studentData.password}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white py-2 rounded-md cursor-pointer hover:bg-gray-600 mt-2 px-4"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
};

export default Automate;
