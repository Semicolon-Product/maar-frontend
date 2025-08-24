import { postApi } from "@/api";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginAdministrator = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Login Data:", formData);
        try {
            await postApi("admin/login", formData).then((res) => {
                console.log("res==>>", res);
                toast.success(res?.message)
                localStorage.setItem("token", res?.token)
                navigate("/administrator");

            })
        } catch (error:any) {
            toast.warning(error?.response?.data?.message)
            console.log("error", error?.response?.data?.message);

        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginAdministrator;
