// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";

type Role = "sales_rep" | "manager" | "admin";

const Sidebar = () => {
  const role = localStorage.getItem("role") as Role | null;

  const sidebarConfig: Record<Role, { label: string; path: string }[]> = {
    sales_rep: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "My Leads", path: "/dashboard/leads" },
      { label: "Follow-ups", path: "/dashboard/followups" },
    ],
    manager: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "All Leads", path: "/dashboard/leads" },
      { label: "Team Performance", path: "/dashboard/team" },
    ],
    admin: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Users", path: "/dashboard/users" },
      { label: "Reports", path: "/dashboard/reports" },
    ],
  };

  const links = role ? sidebarConfig[role] : [];

  return (
    <aside
      style={{
        width: "220px",
        background: "#1e293b",
        color: "#fff",
        padding: "16px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>CRM</h2>

      {links.map((item) => (
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
            borderRadius: "4px",
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;