import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import LeadsPage from "./pages/dashboard/LeadsPage";
import type { ReactNode } from "react";
import LandingPage from "./pages/dashboard/LandingPage";
import LeadsData from "./pages/dashboard/LeadsData";
import AddLeads from "./pages/dashboard/AddLeads";
import Employees from "./pages/dashboard/Employees";




/**
 * Simple auth check
 * Later you can enhance with role-based checks
 */

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};


function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landingPage" element={<LandingPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested dashboard pages */}
          <Route path="leads" element={<LeadsPage />} />
          <Route path="employees" element={<Employees />} />
          <Route path="leadsdata" element={<LeadsData/>}/>
          <Route path="addleads" element={<AddLeads/>} />
          {/* later:
              /dashboard/users
              /dashboard/reports
              /dashboard/profile
          */}
        </Route>

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/landingpage" replace />} />
      </Routes>
    </>
  );
}

export default App;

