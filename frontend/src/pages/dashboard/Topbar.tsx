// src/components/Topbar.tsx
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  const pageTitleMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/leads": "Leads",
    "/dashboard/users": "Users"
  };

  const title = pageTitleMap[location.pathname] || "CRM";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header
      style={{
        height: "60px",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <h3>{title}</h3>

      <div>
        <span style={{ marginRight: "12px" }}>{`${localStorage.getItem("name")} (${localStorage.getItem("role")})`}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Topbar;
