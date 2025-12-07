import React from "react";
import { useTickets } from "../../contexts/TicketContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { updateTicketStatus } from "../../api";

const Dashboard = () => {
  const { tickets, setTickets } = useTickets();
  const { showToast } = useNotifications();

  // ------- Dashboard Stats -------
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p style={{ margin: 0, color: "#6c757d", fontSize: "14px" }}>
            {title}
          </p>
          <h3
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: "bold",
              color: "#264653",
            }}
          >
            {value}
          </h3>
        </div>

        <div
          style={{
            fontSize: "32px",
            background: `${color}20`,
            borderRadius: "12px",
            width: "56px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  // ------- UPDATE STATUS -------
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await updateTicketStatus(ticketId, { status: newStatus });

      // Update frontend instantly
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId ? { ...t, status: newStatus } : t
        )
      );

      showToast("Status updated successfully!", "success");
    } catch (err) {
      console.log(err);
      showToast("Failed to update status", "error");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "24px", color: "#264653" }}>Dashboard</h1>

      {/* -------- Stats Cards -------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <StatCard
          title="Total Tickets"
          value={stats.total}
          icon="🎫"
          color="#3498db"
        />
        <StatCard
          title="Open Tickets"
          value={stats.open}
          icon="📂"
          color="#e74c3c"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon="⏳"
          color="#f39c12"
        />
        <StatCard
          title="Closed Tickets"
          value={stats.closed}
          icon="✅"
          color="#27ae60"
        />
      </div>

      {/* -------- Recent Tickets -------- */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#264653",
            fontSize: "20px",
          }}
        >
          Recent Tickets
        </h2>

        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            style={{
              padding: "16px",
              borderBottom: "1px solid #f1f3f5",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {/* Title */}
            <h4 style={{ margin: 0, color: "#264653", fontSize: "18px" }}>
              {ticket.title}
            </h4>

            {/* Description */}
            <p style={{ margin: 0, color: "#6c757d", fontSize: "14px" }}>
              {ticket.description || "No description provided."}
            </p>

            {/* Meta data */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                fontSize: "13px",
                color: "#6c757d",
              }}
            >
              <span>🆔 {ticket.id}</span>
              <span>
                📅{" "}
                {ticket.created_at
                  ? new Date(ticket.created_at).toLocaleString()
                  : "-"}
              </span>
              <span>🏢 {ticket.assigned_department || "None"}</span>
              <span>🏷️ Status: {ticket.status}</span>
            </div>

            {/* Priority Badge */}
            <span
              style={{
                alignSelf: "flex-start",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600",
                background:
                  ticket.priority === "high"
                    ? "#ff7675"
                    : ticket.priority === "medium"
                    ? "#fdcb6e"
                    : "#dfe6e9",
                color: ticket.priority === "high" ? "white" : "#2d3436",
              }}
            >
              {ticket.priority}
            </span>

            {/* Status Dropdown */}
            <select
              value={ticket.status}
              onChange={(e) =>
                handleStatusChange(ticket.id, e.target.value)
              }
              style={{
                padding: "6px 12px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                cursor: "pointer",
                marginTop: "8px",
                alignSelf: "flex-start",
              }}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
