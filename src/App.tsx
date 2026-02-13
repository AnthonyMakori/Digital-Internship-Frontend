import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Auth
import Login from "./pages/auth/signin";
import Signup from "./pages/auth/signup";

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
import CompanyTeam from "./pages/company/Team";
import CompanySettings from "./pages/company/CompanySettings";


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

            <Route path="/" element={<Navigate to="/auth/signin" replace />} />

            <Route path="/auth/signin" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            {/* Student */}
            <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['Student']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/internships" element={<ProtectedRoute allowedRoles={['Student']}><StudentInternships /></ProtectedRoute>} />
            <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['Student']}><StudentApplications /></ProtectedRoute>} />
            <Route path="/student/attachment" element={<ProtectedRoute allowedRoles={['Student']}><StudentAttachment /></ProtectedRoute>} />
            <Route path="/student/logbook" element={<ProtectedRoute allowedRoles={['Student']}><StudentLogbook /></ProtectedRoute>} />
            <Route path="/student/final-report" element={<ProtectedRoute allowedRoles={['Student']}><StudentFinalReport /></ProtectedRoute>} />

            {/* Company */}
            <Route path="/company/dashboard" element={<ProtectedRoute allowedRoles={['Company']}><CompanyDashboard /></ProtectedRoute>} />
            <Route path="/company/vacancies" element={<ProtectedRoute allowedRoles={['Company']}><CompanyVacancies /></ProtectedRoute>} />
            <Route path="/company/applications" element={<ProtectedRoute allowedRoles={['Company']}><CompanyApplications /></ProtectedRoute>} />
            <Route path="/company/interns" element={<ProtectedRoute allowedRoles={['Company']}><CompanyInterns /></ProtectedRoute>} />
            <Route path="/company/logbooks" element={<ProtectedRoute allowedRoles={['Company']}><CompanyLogbooks /></ProtectedRoute>} />
            <Route path="/company/evaluations" element={<ProtectedRoute allowedRoles={['Company']}><CompanyEvaluations /></ProtectedRoute>} />
            <Route path="/company/team" element={<ProtectedRoute allowedRoles={['Company']}><CompanyTeam /></ProtectedRoute>} />
            <Route path="/company/settings" element={<ProtectedRoute allowedRoles={['Company']}><CompanySettings /></ProtectedRoute>} />

            

            {/* Lecturer */}
            <Route path="/lecturer/dashboard" element={<ProtectedRoute allowedRoles={['Lecturer']}><LecturerDashboard /></ProtectedRoute>} />
            <Route path="/lecturer/students" element={<ProtectedRoute allowedRoles={['Lecturer']}><LecturerStudents /></ProtectedRoute>} />
            <Route path="/lecturer/logbooks" element={<ProtectedRoute allowedRoles={['Lecturer']}><LecturerLogbooks /></ProtectedRoute>} />
            <Route path="/lecturer/evaluations" element={<ProtectedRoute allowedRoles={['Lecturer']}><LecturerEvaluations /></ProtectedRoute>} />

            {/* Admin */}
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
