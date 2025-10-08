import { useState } from 'react';
import loginIn from '../assets/login.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { postApi } from '@/api';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import type{ loginError,  SuperAdminLoginForm, SuperAdminSignupFormData,SuperAdminFormErrors } from '@/components/types/superadminType';
const Login = () => {
    const navigate = useNavigate();

    const [role, setRole] = useState("student");
    const [superadminLogin, setSuperAdminLogin] = useState(false);
    const [show, setShow] = useState(false);
    const [studentData, setStudentData] = useState({ roll: '', password: '' });
    const [teacherLogin, setTeacherLogin] = useState({ email: '', password: '' });
    const [superAdminSignupFormData, setSuperAdminSignUpFormData] = useState<SuperAdminSignupFormData>({
        name: '',
        email: '',
        password: '',
        collegeName: '',
        collegeCode: '',
    });
    const [superAdminLoginForm, setSuperAdminLoginForm] = useState({
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState<SuperAdminFormErrors>();

    const handleStudentLogInSubmit = async (e:any) => {
        e.preventDefault();
        const errors:loginError = {};
        if (!studentData.roll.trim()) errors.roll = 'University Roll No is required';
        if (!studentData.password.trim()) errors.password = 'Password is required';
        setFormError(errors);
        if (Object.keys(errors).length > 0) return;
        try {
            const res = await postApi("student/loginStudent", studentData);
            console.log("res== in student", res);

            toast.success(res?.message);
            if (res.status == 200)
                setTimeout(() => {
                    navigate("/student");
                }, 1000);
            // Optionally, handle redirection or storing token here
        } catch (error:any) {
            console.error("Login error", error);
            const errorMessage =
                error?.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        }

    };

    const handleTeacherLoginSubmit = async (e:any) => {
        e.preventDefault();
        const errors:loginError = {};
        if (!teacherLogin.email.trim()) errors.email = 'Email is required';
        if (!teacherLogin.password.trim()) errors.password = 'Password is required';
        setFormError(errors);
        if (Object.keys(errors).length > 0) return;
        console.log("teacher data::", teacherLogin)
        try {
            const res = await postApi("teacher/login", teacherLogin);
            toast.success(res?.message);

            if (res.status === 200) {
                setTimeout(() => {
                    navigate("/teacher");
                }, 1000);
            }

            console.log("res in teacher::", res);
        } catch (error:any) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        }

    };

    const handleSuperAdminSignupSubmit = async (e:any) => {
        e.preventDefault();
        const errors:SuperAdminFormErrors = {};
        if (!superAdminSignupFormData.name.trim()) errors.name = 'Name is required';
        if (!superAdminSignupFormData.email.trim()) errors.email = 'Email is required';
        if (!superAdminSignupFormData.password.trim()) errors.password = 'Password is required';
        if (!superAdminSignupFormData.collegeName.trim()) errors.collegeName = 'Institute name is required';
        if (!superAdminSignupFormData.collegeCode.trim()) errors.collegeCode = 'Institute code is required';
        setFormError(errors);

        if (Object.keys(errors).length > 0) return;
        console.log("Role: superadmin - signup", superAdminSignupFormData);
        const payload = { name: superAdminSignupFormData.name, email: superAdminSignupFormData.email, password: superAdminSignupFormData.password, college_code: superAdminSignupFormData.collegeCode, college_name: superAdminSignupFormData.collegeName }


        try {
            const res = await postApi("superadmin/register", payload);
            console.log("res", res);
            toast.success(res.message || "Signup successful");

        } catch (error:any) {
            console.log("Signup Error:", error);
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "An unexpected error occurred"
            );
        }
    };

    const handleSuperAdminLoginSubmit = async (e:any) => {
        e.preventDefault();
        const errors:SuperAdminLoginForm = {};
        if (!superAdminLoginForm.email.trim()) errors.email = 'Email is required';
        if (!superAdminLoginForm.password.trim()) errors.password = 'Password is required';
        setFormError(errors);
        if (Object.keys(errors).length > 0) return;

        console.log("Role: superadmin - login", superAdminLoginForm);
        try {
            await postApi("superadmin/login", superAdminLoginForm).then((res) => {
                console.log("res", res);
                toast.success(res.message || "Signin successful");
                setTimeout(() => {
                    navigate("/superAdmin");
                }, 1000);
            })

        } catch (error:any) {
            console.log("Sigin Error:", error);
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "An unexpected error occurred"
            );
        }

    };

    const getGradientByRole = (role:string) => {
  switch (role) {
    case 'superadmin':
      return 'bg-gradient-to-br from-[#fef2e8] via-white to-[#ffd9cf]';
    case 'teacher':
      return 'bg-gradient-to-br from-[#e6f4ea] via-white to-[#c9f3d3]';
    case 'student':
      return 'bg-gradient-to-br from-[#fffbe6] via-white to-[#fff0b3]';
    default:
      return 'bg-white';
  }
};

    return (
        <div
            className="flex bg-blue-100 min-h-screen items-center justify-center px-4"
            style={{
                backgroundImage: "url('./bg.svg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >

            <ToastContainer position="top-right" />
            <div className={`w-full  max-w-3xl ${getGradientByRole(role)} border border-gray-500 rounded-2xl  shadow p-6 grid md:grid-cols-2 gap-4`}>
                <form className="flex flex-col gap-6">
                    <div className="flex justify-center gap-4">
                        {['student', 'teacher', 'superadmin'].map((r) => (
                            <label key={r} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value={r}
                                    className='mt-1'
                                    checked={role === r}
                                    onChange={() => {
                                        setRole(r);
                                        setFormError({});
                                    }}
                                />
                                <span className="capitalize dark:text-black">{r}.</span>
                            </label>
                        ))}
                    </div>

                    {role === 'student' && (
                        <>
                            <div>
                                <label className="block">University Roll No.</label>
                                <input
                                    type="text"
                                     
                                    value={studentData.roll}
                                    onChange={(e) => {
                                        setStudentData({ ...studentData, roll: e.target.value });
                                        setFormError((prev) => ({ ...prev, roll: '' }));
                                    }}
                                    className={`w-full border ${formError?.roll ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2 `}
                                />
                                {formError?.roll && <p className="text-red-600 text-sm">{formError?.roll}</p>}
                            </div>
                            <div>
                                <label className="block">Password</label>
                                 <div className="relative w-full">
                                    <input
                                        type={show ? 'text' : 'password'}
                                    value={studentData.password}
                                    onChange={(e) => {
                                        setStudentData({ ...studentData, password: e.target.value });
                                        setFormError((prev) => ({ ...prev, password: '' }));
                                    }}
                                    className={`w-full border ${formError?.password ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                <button
                                        type="button"
                                        onClick={() => setShow((prev) => !prev)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {formError?.password && <p className="text-red-600 text-sm">{formError?.password}</p>}
                            </div>
                            <button onClick={handleStudentLogInSubmit} className="bg-yellow-600 text-white py-2 rounded cursor-pointer">Login</button>
                             <p className="text-sm text-center text-gray-700">
                                Don’t have an account? Contact to Department Teacher
                            </p>
                        </>
                    )}

                    {role === 'teacher' && (
                        <>
                            <div>
                                <label className="block">Email</label>
                                <input
                                    type="email"
                                    value={teacherLogin.email}
                                    onChange={(e) => {
                                        setTeacherLogin({ ...teacherLogin, email: e.target.value });
                                        setFormError((prev) => ({ ...prev, email: '' }));
                                    }}
                                    className={`w-full border ${formError?.email ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />

                                {formError?.email && <p className="text-red-600 text-sm">{formError?.email}</p>}
                            </div>
                            <div>
                                <label className="block">Password</label>
                                 <div className="relative w-full">
                                    <input
                                        type={show ? 'text' : 'password'}
                                    value={teacherLogin.password}
                                    onChange={(e) => {
                                        setTeacherLogin({ ...teacherLogin, password: e.target.value });
                                        setFormError((prev) => ({ ...prev, password: '' }));
                                    }}
                                    className={`w-full border ${formError?.password ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                <button
                                        type="button"
                                        onClick={() => setShow((prev) => !prev)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {formError?.password && <p className="text-red-600 text-sm">{formError?.password}</p>}
                            </div>
                            <button onClick={handleTeacherLoginSubmit} className="bg-green-600 text-white py-2 rounded cursor-pointer">Login</button>
                            <p className="text-sm text-center text-gray-700">
                                Don’t have an account? Contact to Institute Admin
                            </p>
                        </>
                    )}

                    {role === 'superadmin' && !superadminLogin && (
                        <>
                            <div>
                                <label className="block">Name</label>
                                <input
                                    type="text"
                                    value={superAdminSignupFormData.name}
                                    onChange={(e) => {
                                        setSuperAdminSignUpFormData({ ...superAdminSignupFormData, name: e.target.value });
                                        setFormError((prev) => ({ ...prev, name: '' }));
                                    }}
                                    className={`w-full border ${formError?.name ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError?.name && <p className="text-red-600 text-sm">{formError?.name}</p>}
                            </div>
                            <div>
                                <label className="block">Email</label>
                                <input
                                    type="email"
                                    value={superAdminSignupFormData.email}
                                    onChange={(e) => {
                                        setSuperAdminSignUpFormData({ ...superAdminSignupFormData, email: e.target.value });
                                        setFormError((prev) => ({ ...prev, email: '' }));
                                    }}
                                    className={`w-full border ${formError?.email ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError?.email && <p className="text-red-600 text-sm">{formError?.email}</p>}
                            </div>
                            <div>
                                <label className="block">Password</label>
                                <input
                                    type="password"
                                    value={superAdminSignupFormData.password}
                                    onChange={(e) => {
                                        setSuperAdminSignUpFormData({ ...superAdminSignupFormData, password: e.target.value });
                                        setFormError((prev) => ({ ...prev, password: '' }));
                                    }}
                                    className={`w-full border ${formError?.password ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError?.password && <p className="text-red-600 text-sm">{formError?.password}</p>}
                            </div>
                            <div>
                                <label className="block">Institute Name</label>
                                <input
                                    type="text"
                                    value={superAdminSignupFormData.collegeName}
                                    onChange={(e) => {
                                        setSuperAdminSignUpFormData({ ...superAdminSignupFormData, collegeName: e.target.value });
                                        setFormError((prev) => ({ ...prev, collegeName: '' }));
                                    }}
                                    className={`w-full border ${formError?.collegeName ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError?.collegeName && <p className="text-red-600 text-sm">{formError?.collegeName}</p>}
                            </div>
                            <div>
                                <label className="block">Institute Code</label>
                                <input
                                    type="text"
                                    value={superAdminSignupFormData.collegeCode}
                                    onChange={(e) => {
                                        setSuperAdminSignUpFormData({ ...superAdminSignupFormData, collegeCode: e.target.value });
                                        setFormError((prev) => ({ ...prev, collegeCode: '' }));
                                    }}
                                    className={`w-full border ${formError?.collegeCode ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError?.collegeCode && <p className="text-red-600 text-sm">{formError?.collegeCode}</p>}
                            </div>
                            <button onClick={handleSuperAdminSignupSubmit} className="bg-black text-white py-2 rounded">Sign Up</button>
                            <p className="text-sm text-center">
                                Already have an account?{' '}
                                <a href="#" onClick={() => setSuperAdminLogin(true)} className="text-blue-600 underline">
                                    Sign in
                                </a>
                            </p>
                        </>
                    )}

                    {role === 'superadmin' && superadminLogin && (
                        <>
                            <div>
                                <label className="block">Email</label>
                                <input
                                    type="email"
                                    value={superAdminLoginForm.email}
                                    onChange={(e) => {
                                        setSuperAdminLoginForm({ ...superAdminLoginForm, email: e.target.value });
                                        setFormError((prev) => ({ ...prev, email: '' }));
                                    }}
                                    className={`w-full border ${formError?.email ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError?.email && <p className="text-red-600 text-sm">{formError?.email}</p>}
                            </div>
                            <div>
                                <label className="block">Password</label>
                                <div className="relative w-full">
                                    <input
                                        type={show ? 'text' : 'password'}
                                        value={superAdminLoginForm.password}
                                        onChange={(e) => {
                                            setSuperAdminLoginForm({ ...superAdminLoginForm, password: e.target.value });
                                            setFormError((prev) => ({ ...prev, password: '' }));
                                        }}
                                        className={`w-full border ${formError?.password ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow((prev) => !prev)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {formError?.password && <p className="text-red-600 text-sm">{formError?.password}</p>}
                            </div>
                            <button onClick={handleSuperAdminLoginSubmit} className="bg-red-700 text-white py-2 rounded">Login</button>
                            <p className="text-sm text-center">
                                Don’t have an account?{' '}
                                <a href="#" onClick={() => setSuperAdminLogin(false)} className="text-blue-600 underline">
                                    Sign up
                                </a>
                            </p>
                        </>
                    )}
                </form>

                <div className="hidden md:block">
                    <img src={loginIn} alt="Illustration" className="w-full h-full object-cover rounded-r-2xl" />
                </div>
            </div>
        </div>
    );
};

export default Login;
