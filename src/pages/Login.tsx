
import { useState } from 'react';
import loginIn from '../assets/login.jpg'
import { useNavigate } from 'react-router-dom';


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
    //-------------------------superadmin function  
    const handleSuperadminLogin =() =>{
        console.log("superadmin login ")
         navigate("/superadmin");
    }

    const [superadminLogin, setSuperAdminLogin] = useState(false)
    return (
        <div className=" flex min-h-svh flex-col items-center justify-center p-0 md:p-4 sm:p-0">
            <div className="w-full max-w-sm md:max-w-3xl ">
                <div className=" min-h-screen flex flex-col items-center justify-center px-1">
                    <div className=" w-full border rounded-2xl p-4 md:p-0 sm:p-0 overflow-hidden shadow-sm ">
                        <div className="grid md:grid-cols-2 ">

                            <form onSubmit={handleSubmit} className="pr-4 md:p-4 flex flex-col gap-6  ">
                                <div className="text-center">
                                    <div className="flex items-center gap-4 md:gap-2 sm:gap-0">
                                        <label className="flex items-center ">
                                            <input
                                                type="radio"
                                                name="user_role"
                                                value="student"
                                                checked={role === "student"}
                                                className=" w-4 h-4 "
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <span>Student</span>
                                        </label>

                                        <label className="flex items-center ">
                                            <input
                                                type="radio"
                                                name="user_role"
                                                value="teacher"
                                                checked={role === "teacher"}
                                                className=" w-4 h-4 "
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <span>Teacher</span>
                                        </label>

                                        <label className="flex items-center ">
                                            <input
                                                type="radio"
                                                name="user_role"
                                                value="superadmin"
                                                className=" w-4 h-4 "
                                                checked={role === "superadmin"}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <span>Superadmin</span>
                                        </label>
                                    </div>



                                </div>

                                {role === "student" && (
                                    <div className=' flex flex-col gap-6'>
                                        <div className="text-center p-1 bg-gray-200">Student</div>

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
                                        <button type="submit" className="bg-gray-800 text-white py-2 rounded-md cursor-pointer" onClick={()=>{navigate("/student");}}>Login</button>
                                    </div>)}
                                {role === "teacher" && (
                                    <div className=' flex flex-col gap-6'>
                                        <div className="text-center p-1 bg-gray-200">Teacher</div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input type="email" id="email" placeholder="me@example.com" className="border rounded-md px-3 py-2" required />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Password</label>
                                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
                                            </div>
                                            <input type="password" id="password" className="border rounded-md px-3 py-2" required />
                                        </div>
                                        <button type="submit" className="bg-black text-white py-2 rounded-md cursor-pointer" onClick={()=>{navigate("/teacher");}}>Login</button>
                                    </div>)}
                                {role === "superadmin" && !superadminLogin && (
                                    <div className=' flex flex-col gap-2'>
                                        <div className="text-center p-1 bg-gray-200">Superadmin</div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input type="email" id="email" placeholder="me@example.com" className="border rounded-md px-3 py-1" required />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Password</label>
                                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
                                            </div>
                                            <input type="password" id="password" className="border rounded-md px-3 py-1" required />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">College Name</label>
                                            <input type="email" id="email" placeholder="Enter College Name" className="border rounded-md px-3 py-1" required />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">College Code</label>
                                            <input type="email" id="email" placeholder="Enter College Code" className="border rounded-md px-3 py-1" required />
                                        </div>

                                        <button type="submit" className="bg-black text-white py-2 rounded-md cursor-pointer">Sign Up</button>
                                        <div className="text-center text-sm">
                                            Already have an account?
                                            <a href="#" className="text-blue-600 hover:underline" onClick={() => setSuperAdminLogin(!superadminLogin)}>Sign in</a>
                                        </div>
                                    </div>)}

                                {role === "superadmin" && superadminLogin && (
                                    <div className=' flex flex-col gap-6'>
                                        <div className="text-center p-1 bg-gray-200">Teacher</div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input type="email" id="email" placeholder="me@example.com" className="border rounded-md px-3 py-2"  />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium">Password</label>
                                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
                                            </div>
                                            <input type="password" id="password" className="border rounded-md px-3 py-2"  />
                                        </div>
                                        <button type="submit" className="bg-black text-white py-2 rounded-md cursor-pointer" onClick={handleSuperadminLogin}>Login</button>
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
