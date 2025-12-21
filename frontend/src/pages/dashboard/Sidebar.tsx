// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // TEMP: later this comes from auth state
  const role = localStorage.getItem("role");

  const sidebarConfig = {
    sales_rep: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "My Leads", path: "/dashboard/leads" },
      { label: "Follow-ups", path: "/dashboard/followups" }
    ],
    manager: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "All Leads", path: "/dashboard/leads" },
      { label: "Team Performance", path: "/dashboard/team" }
    ],
    admin: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Users", path: "/dashboard/users" },
      { label: "Reports", path: "/dashboard/reports" }
    ]
  };

  return (
    <aside
      style={{
        width: "220px",
        background: "#1e293b",
        color: "#fff",
        padding: "16px"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>CRM</h2>

      {sidebarConfig[role].map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: "block",
            padding: "10px",
            marginBottom: "8px",
            color: "#fff",
            textDecoration: "none",
            background: isActive ? "#334155" : "transparent",
            borderRadius: "4px"
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
