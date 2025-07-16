import { useState } from 'react';
import loginIn from '../assets/login.jpg';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [role, setRole] = useState("student");
    const [superadminLogin, setSuperAdminLogin] = useState(false);

    const [studentData, setStudentData] = useState({ roll: '', password: '' });
    const [teacherLogin, setTeacherLogin] = useState({ email: '', password: '' });
    const [superAdminSignupFormData, setSuperAdminSignUpFormData] = useState({
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
    const [formError, setFormError] = useState({});

    const handleStudentLogInSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!studentData.roll.trim()) errors.roll = 'University Roll No is required';
        if (!studentData.password.trim()) errors.password = 'Password is required';
        setFormError(errors);
        if (Object.keys(errors).length === 0) {
            console.log("Role: student", studentData);
        }
    };

    const handleTeacherLoginSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!teacherLogin.email.trim()) errors.email = 'Email is required';
        if (!teacherLogin.password.trim()) errors.password = 'Password is required';
        setFormError(errors);
        if (Object.keys(errors).length === 0) {
            console.log("Role: teacher", teacherLogin);
        }
    };

    const handleSuperAdminSignupSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!superAdminSignupFormData.name.trim()) errors.name = 'Name is required';
        if (!superAdminSignupFormData.email.trim()) errors.email = 'Email is required';
        if (!superAdminSignupFormData.password.trim()) errors.password = 'Password is required';
        if (!superAdminSignupFormData.collegeName.trim()) errors.collegeName = 'Institute name is required';
        if (!superAdminSignupFormData.collegeCode.trim()) errors.collegeCode = 'Institute code is required';
        setFormError(errors);
        if (Object.keys(errors).length === 0) {
            console.log("Role: superadmin - signup", superAdminSignupFormData);
        }
    };

    const handleSuperAdminLoginSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!superAdminLoginForm.email.trim()) errors.email = 'Email is required';
        if (!superAdminLoginForm.password.trim()) errors.password = 'Password is required';
        setFormError(errors);
        if (Object.keys(errors).length === 0) {
            console.log("Role: superadmin - login", superAdminLoginForm);
        }
    };

    return (
        <div
            className="flex min-h-screen items-center justify-center px-4"
            style={{
                backgroundImage: 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOulwteOOo8lVZv2MdQ_s8b9mtmt9FDLtsOsD7veS9wyerLCL1BOLVWlHiGtiLT_UijNtNBsH-GDT761dM7jhBjpKJREBzN9nvBIRsCTzTQU3p5h8ywB8rGX9RvlXA_fk6kohDcCRfRYiKXlOV2JtwfVR8trU2TBZxtVDEL-AbjIjzwK6RwYIXP_oRtohS/s1400/Design%20455.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >

            <ToastContainer position="top-right" />
            <div className="w-full max-w-4xl bg-white border border-gray-500 rounded-2xl shadow p-6 grid md:grid-cols-2 gap-4">
                <form className="flex flex-col gap-6">
                    <div className="flex justify-center gap-4">
                        {['student', 'teacher', 'superadmin'].map((r) => (
                            <label key={r} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value={r}
                                    checked={role === r}
                                    onChange={() => {
                                        setRole(r);
                                        setFormError({});
                                    }}
                                />
                                <span className="capitalize">{r}</span>
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
                                    className={`w-full border ${formError.roll ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.roll && <p className="text-red-600 text-sm">{formError.roll}</p>}
                            </div>
                            <div>
                                <label className="block">Password</label>
                                <input
                                    type="password"
                                    value={studentData.password}
                                    onChange={(e) => {
                                        setStudentData({ ...studentData, password: e.target.value });
                                        setFormError((prev) => ({ ...prev, password: '' }));
                                    }}
                                    className={`w-full border ${formError.password ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.password && <p className="text-red-600 text-sm">{formError.password}</p>}
                            </div>
                            <button onClick={handleStudentLogInSubmit} className="bg-blue-600 text-white py-2 rounded">Login</button>
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
                                    className={`w-full border ${formError.email ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.email && <p className="text-red-600 text-sm">{formError.email}</p>}
                            </div>
                            <div>
                                <label className="block">Password</label>
                                <input
                                    type="password"
                                    value={teacherLogin.password}
                                    onChange={(e) => {
                                        setTeacherLogin({ ...teacherLogin, password: e.target.value });
                                        setFormError((prev) => ({ ...prev, password: '' }));
                                    }}
                                    className={`w-full border ${formError.password ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.password && <p className="text-red-600 text-sm">{formError.password}</p>}
                            </div>
                            <button onClick={handleTeacherLoginSubmit} className="bg-blue-600 text-white py-2 rounded">Login</button>
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
                                    className={`w-full border ${formError.name ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.name && <p className="text-red-600 text-sm">{formError.name}</p>}
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
                                    className={`w-full border ${formError.email ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.email && <p className="text-red-600 text-sm">{formError.email}</p>}
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
                                    className={`w-full border ${formError.password ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.password && <p className="text-red-600 text-sm">{formError.password}</p>}
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
                                    className={`w-full border ${formError.collegeName ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.collegeName && <p className="text-red-600 text-sm">{formError.collegeName}</p>}
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
                                    className={`w-full border ${formError.collegeCode ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.collegeCode && <p className="text-red-600 text-sm">{formError.collegeCode}</p>}
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
                                    className={`w-full border ${formError.email ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.email && <p className="text-red-600 text-sm">{formError.email}</p>}
                            </div>
                            <div>
                                <label className="block">Password</label>
                                <input
                                    type="password"
                                    value={superAdminLoginForm.password}
                                    onChange={(e) => {
                                        setSuperAdminLoginForm({ ...superAdminLoginForm, password: e.target.value });
                                        setFormError((prev) => ({ ...prev, password: '' }));
                                    }}
                                    className={`w-full border ${formError.password ? 'border-red-600' : 'border-gray-300'} rounded px-3 py-2`}
                                />
                                {formError.password && <p className="text-red-600 text-sm">{formError.password}</p>}
                            </div>
                            <button onClick={handleSuperAdminLoginSubmit} className="bg-black text-white py-2 rounded">Login</button>
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
