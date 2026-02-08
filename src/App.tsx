import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Auth
import Login from "./pages/auth/signin";

// Student
import StudentDashboard from "./pages/student/Dashboard";
import StudentInternships from "./pages/student/Internships";
import StudentApplications from "./pages/student/Applications";
import StudentAttachment from "./pages/student/Attachment";
import StudentLogbook from "./pages/student/Logbook";
import StudentFinalReport from "./pages/student/FinalReport";

// Company
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyVacancies from "./pages/company/Vacancies";
import CompanyApplications from "./pages/company/Applications";
import CompanyInterns from "./pages/company/Interns";
import CompanyLogbooks from "./pages/company/Logbooks";
import CompanyEvaluations from "./pages/company/Evaluations";

// Lecturer
import LecturerDashboard from "./pages/lecturer/Dashboard";
import LecturerStudents from "./pages/lecturer/Students";
import LecturerLogbooks from "./pages/lecturer/Logbooks";
import LecturerEvaluations from "./pages/lecturer/Evaluations";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<Login />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/internships" element={<ProtectedRoute allowedRoles={['student']}><StudentInternships /></ProtectedRoute>} />
            <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['student']}><StudentApplications /></ProtectedRoute>} />
            <Route path="/student/attachment" element={<ProtectedRoute allowedRoles={['student']}><StudentAttachment /></ProtectedRoute>} />
            <Route path="/student/logbook" element={<ProtectedRoute allowedRoles={['student']}><StudentLogbook /></ProtectedRoute>} />
            <Route path="/student/final-report" element={<ProtectedRoute allowedRoles={['student']}><StudentFinalReport /></ProtectedRoute>} />

            {/* Company Routes */}
            <Route path="/company/dashboard" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboard /></ProtectedRoute>} />
            <Route path="/company/vacancies" element={<ProtectedRoute allowedRoles={['company']}><CompanyVacancies /></ProtectedRoute>} />
            <Route path="/company/applications" element={<ProtectedRoute allowedRoles={['company']}><CompanyApplications /></ProtectedRoute>} />
            <Route path="/company/interns" element={<ProtectedRoute allowedRoles={['company']}><CompanyInterns /></ProtectedRoute>} />
            <Route path="/company/logbooks" element={<ProtectedRoute allowedRoles={['company']}><CompanyLogbooks /></ProtectedRoute>} />
            <Route path="/company/evaluations" element={<ProtectedRoute allowedRoles={['company']}><CompanyEvaluations /></ProtectedRoute>} />

            {/* Lecturer Routes */}
            <Route path="/lecturer/dashboard" element={<ProtectedRoute allowedRoles={['lecturer']}><LecturerDashboard /></ProtectedRoute>} />
            <Route path="/lecturer/students" element={<ProtectedRoute allowedRoles={['lecturer']}><LecturerStudents /></ProtectedRoute>} />
            <Route path="/lecturer/logbooks" element={<ProtectedRoute allowedRoles={['lecturer']}><LecturerLogbooks /></ProtectedRoute>} />
            <Route path="/lecturer/evaluations" element={<ProtectedRoute allowedRoles={['lecturer']}><LecturerEvaluations /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
