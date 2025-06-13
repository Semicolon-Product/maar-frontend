
import { useState } from 'react';
import loginIn from '../assets/login.jpg'
import { useNavigate } from 'react-router-dom';
import type { SuperAdminLoginForm, SuperAdminSignupApiPayload, SuperAdminSignupFormData } from '@/components/types/superadminType';
import { toast, ToastContainer } from 'react-toastify';
import { superAdminLogin, superAdminSignup } from '@/api/superAdminApi';
import { loginTeacher } from '@/api/teacherApi';


const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("student");

    ///-------------------------student function 

    const [studentData, setStudentData] = useState({
        roll: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setStudentData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (role === "student") {
            console.log("Role:", role);
            console.log("Student Data:", studentData);
        }

    };


    //-------------------------teacher function 
    const [teacherLogin, setTeacherLogin] = useState({
        userId: "",
        password: ""
    });
    const handleTeacherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setTeacherLogin((prev) => ({ ...prev, [id]: value }));
    };
    const handleTeacherLogin = async () => {
        const { userId, password } = teacherLogin;

        if (!userId || !password) {
            toast.error("Please fill in both fields");
            return;
        }

        try {
            const res = await loginTeacher(userId, password);
            console.log("LOGIN TEACHER:",res)
            if(res.status){
                //toast.success(res);

            //localStorage.setItem("token", res.token);
            localStorage.setItem("role", "teacher");

            navigate("/teacher");
            }
            
        } catch (err: any) {
            toast.error(err.message || "Login failed");
        }
    };


    //-------------------------superadmin function  

    const [superAdminSignupFormData, setSuperAdminSignUpFormData] = useState<SuperAdminSignupFormData>({
        email: '',
        password: '',
        collegeName: '',
        collegeCode: '',
    });
    const [superAdminLoginForm, setSuperAdminLoginForm] = useState<SuperAdminLoginForm>({
        email: '',
        password: '',
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setSuperAdminSignUpFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setSuperAdminLoginForm(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSuperadminLogin = async () => {
        const { email, password } = superAdminLoginForm;

        if (!email) {
            toast.error('Email is required!');
            return;
        }

        if (!password) {
            toast.error('Password is required!');
            return;
        }

        superAdminLogin(superAdminLoginForm)
            .then((response) => {
                if (response.status) {
                    toast.success(response.message || 'Login successful');
                    console.log('Sign-in successful:', response);
                    setTimeout(() => {
                        navigate('/superadmin');
                    }, 1000);
                } else {
                    toast.error(response.message || 'Login failed');
                }
            })
            .catch((error: any) => {
                console.error('Login error:', error);
                toast.error(error?.message || 'Login failed');
            });



    };

    const handleSuperAdminSignUp = async () => {
        const { email, password, collegeName, collegeCode } = superAdminSignupFormData;

        if (!email) {
            toast.error('Email is required!');
            return;
        }

        if (!password) {
            toast.error('Password is required!');
            return;
        }

        if (!collegeName) {
            toast.error('College Name is required!');
            return;
        }

        if (!collegeCode) {
            toast.error('College Code is required!');
            return;
        }
        const apiPayload: SuperAdminSignupApiPayload = {
            email,
            password,
            college_name: collegeName,
            college_code: collegeCode,
        };

        try {
            const response = await superAdminSignup(apiPayload);
            console.log('Signup successful:', response);
            toast.success(response.message);

        } catch (error: any) {
            console.error('Signup failed:', error);
            toast.error(error?.message || 'Signup failed');
        }


        console.log('Form Data:', superAdminSignupFormData);
    };
    const [superadminLogin, setSuperAdminLogin] = useState(false)
    return (
        <div className=" flex min-h-svh flex-col items-center justify-center p-0 md:p-4 sm:p-0">

            <div className="w-full max-w-sm md:max-w-3xl ">
                <ToastContainer position='top-right' />
                <div className=" min-h-screen flex flex-col items-center justify-center px-1">
                    <div className=" w-full border rounded-2xl p-4 md:p-0 sm:p-0 overflow-hidden shadow-sm ">
                        <div className="grid md:grid-cols-2 ">

                            <form onSubmit={handleSubmit} className="pr-4 md:p-4 flex flex-col gap-6  ">
                                <div className="text-center flex justify-center">
                                    <div className="flex items-center gap-6 md:gap-2 sm:gap-0 ">
                                        <label className="flex items-center gap-1 ">
                                            <input
                                                type="radio"
                                                name="user_role"
                                                value="student"
                                                checked={role === "student"}
                                                className=" w-4 h-4 mt-0.5 accent-blue-600 "
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <span >Student</span>
                                        </label>

                                        <label className="flex items-center gap-1 ">
                                            <input
                                                type="radio"
                                                name="user_role"
                                                value="teacher"
                                                checked={role === "teacher"}
                                                className=" w-4 h-4 mt-0.5 accent-blue-600"
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <span>Teacher</span>
                                        </label>

                                        <label className="flex items-center gap-1">
                                            <input
                                                type="radio"
                                                name="user_role"
                                                value="superadmin"
                                                className=" w-4 h-4 mt-0.5 accent-blue-600"
                                                checked={role === "superadmin"}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <span>Superadmin</span>
                                        </label>
                                    </div>



                                </div>

                                {role === "student" && (
                                    <div className=' flex flex-col gap-6'>
                                        <div className="text-center rounded-2xl p-1 bg-gray-200">Student</div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">University Roll No.</label>
                                            <input type="text" id="roll" placeholder="25300121000" className="border rounded-md px-3 py-2" required
                                                value={studentData.roll}
                                                onChange={handleChange} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Password</label>

                                            </div>
                                            <input type="password" id="password" className="border rounded-md px-3 py-2" required value={studentData.password}
                                                onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="bg-gray-800 text-white py-2 rounded-md cursor-pointer" onClick={() => { navigate("/student"); }}>Login</button>
                                    </div>)}
                                {role === "teacher" && (
                                    <div className=' flex flex-col gap-6'>
                                        <div className="text-center p-1 rounded-2xl bg-gray-200">Teacher</div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">User Name :</label>
                                            <input type="text" id="userId" placeholder="" className="border rounded-md px-3 py-2"
                                                value={teacherLogin.userId}
                                                onChange={handleTeacherInputChange} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Password :</label>
                                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
                                            </div>
                                            <input type="password" id="password" className="border rounded-md px-3 py-2" required
                                                value={teacherLogin.password}
                                                onChange={handleTeacherInputChange} />
                                        </div>
                                        <button type="submit" className="bg-black text-white py-2 rounded-md cursor-pointer" onClick={handleTeacherLogin}>Login</button>
                                    </div>)}
                                {role === "superadmin" && !superadminLogin && (
                                    <div className=' flex flex-col gap-2'>

                                        <div className="text-center p-1 rounded-2xl bg-gray-200">Superadmin</div>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-medium">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="me@example.com"
                                                    className="border rounded-md px-3 py-1"
                                                    required
                                                    value={superAdminSignupFormData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-sm font-medium">Password</label>
                                                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
                                                </div>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="border rounded-md px-3 py-1"
                                                    required
                                                    value={superAdminSignupFormData.password}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-medium">College Name</label>
                                                <input
                                                    type="text"
                                                    id="collegeName"
                                                    placeholder="Enter College Name"
                                                    className="border rounded-md px-3 py-1"
                                                    required
                                                    value={superAdminSignupFormData.collegeName}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-medium">College Code</label>
                                                <input
                                                    type="text"
                                                    id="collegeCode"
                                                    placeholder="Enter College Code"
                                                    className="border rounded-md px-3 py-1"
                                                    required
                                                    value={superAdminSignupFormData.collegeCode}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleSuperAdminSignUp}
                                                className="bg-black text-white py-2 rounded-md cursor-pointer"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                        <div className="text-center text-sm">
                                            Already have an account?
                                            <a href="#" className="text-blue-600 hover:underline" onClick={() => setSuperAdminLogin(!superadminLogin)}>Sign in</a>
                                        </div>
                                    </div>)}

                                {role === "superadmin" && superadminLogin && (
                                    <div className='flex flex-col gap-6'>
                                        <div className="text-center p-1 rounded-2xl bg-gray-200">Superadmin</div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="me@example.com"
                                                className="border rounded-md px-3 py-2"
                                                value={superAdminLoginForm.email}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Password</label>
                                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
                                            </div>
                                            <input
                                                type="password"
                                                id="password"
                                                className="border rounded-md px-3 py-2"
                                                value={superAdminLoginForm.password}
                                                onChange={handleLoginInputChange}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-black text-white py-2 rounded-md cursor-pointer"
                                            onClick={handleSuperadminLogin}
                                        >
                                            Login
                                        </button>
                                        <div className="text-center text-sm">
                                            Don't have an account?
                                            <a href="#" className="text-blue-600 hover:underline" onClick={() => setSuperAdminLogin(!superadminLogin)}>Sign up</a>
                                        </div>
                                    </div>)}



                            </form>


                            <div className="hidden md:block relative bg-gray-100">
                                <img src={loginIn} alt="Image" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-6 px-2">
                        By clicking continue, you agree to our
                        <a href="#" className="underline">Terms of Service</a>
                        and
                        <a href="#" className="underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
