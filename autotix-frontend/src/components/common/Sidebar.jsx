import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();
  const role = user?.role || "user"; // fallback for safety

  // 🔥 Build menu items based on role
  const menuItems = [];

  // ----- Staff + Admin -----
  if (role === "admin" || role === "staff") {
    menuItems.push({ path: "/dashboard", icon: "📊", label: "Dashboard" });
  }

  // ----- Everyone -----
  menuItems.push({ path: "/tickets", icon: "🎫", label: "Tickets" });
  menuItems.push({ path: "/notifications", icon: "🔔", label: "Notifications" });

  // ----- Admin Only -----
  if (role === "admin") {
    menuItems.push({ path: "/reports", icon: "📈", label: "Reports" });
  }

  // ----- Everyone -----
  menuItems.push({ path: "/settings", icon: "⚙️", label: "Settings" });

  return (
    <div
      style={{
        width: isOpen ? "250px" : "0",
        background: "#264653",
        color: "white",
        transition: "width 0.3s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
          AutoTix
        </h2>
        <p style={{ margin: "5px 0 0 0", fontSize: "12px", opacity: 0.7 }}>
          IT Support System
        </p>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "20px 0" }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              color: "white",
              textDecoration: "none",
              transition: "background 0.2s",
              background: isActive
                ? "rgba(42, 157, 143, 0.3)"
                : "transparent",
              borderLeft: isActive
                ? "4px solid #2A9D8F"
                : "4px solid transparent",
            })}
          >
            <span style={{ fontSize: "20px", marginRight: "12px" }}>
              {item.icon}
            </span>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;