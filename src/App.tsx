import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import StudentDetails from "./pages/student/StudentDetailsPage";
import Automate from "./pages/Automate";
import SuperAdminPage from "./pages/superadmin/SuperAdminPage";
import TeacherPage from "./pages/teacher/TeacherPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Administrator from "./pages/administrator/Index";
import LoginAdministrator from "./pages/administrator/LoginAdministrator";
import Home from "./pages/Landing/Home";
import BlogDetails from "./components/BlogDetails";
import Blog from "./components/Blog";

import TermCondition from "./pages/TermCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:title" element={<BlogDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms-and-conditions" element={<TermCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/automate" element={<Automate />} />
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute>
              <SuperAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <TeacherPage />
            </ProtectedRoute>
          }
        />
        <Route path="/adminLogin" element={<LoginAdministrator />} />

        <Route
          path="/administrator"
          element={
            <ProtectedRoute>
              <Administrator />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
