// src/layouts/DashboardLayout.tsx
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import SalesDashboard from "./SalesDashboard";
import ManagerDashboard from "./ManagerDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = () => {
  const role = localStorage.getItem("role"); // 'sales_rep', 'manager', 'admin'
  const location = useLocation();

  // Redirect to login if no role found
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Decide which dashboard to render at /dashboard
  const renderDashboard = () => {
    switch (role) {
      case "sales_rep":
        return <SalesDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <SalesDashboard />; // fallback
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />

        {/* Page content */}
        <main style={{ padding: "16px", overflowY: "auto", flex: 1 }}>
          {/* Only render role-specific dashboard when path is exactly /dashboard */}
          {location.pathname === "/dashboard" ? renderDashboard() : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;