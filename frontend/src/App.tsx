import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import LeadsPage from "./pages/dashboard/LeadsPage";
import Users from "./pages/dashboard/Users";



/**
 * Simple auth check
 * Later you can enhance with role-based checks
 */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

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
          <Route path="users" element={<Users />} />
          {/* later:
              /dashboard/users
              /dashboard/reports
              /dashboard/profile
          */}
        </Route>

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
