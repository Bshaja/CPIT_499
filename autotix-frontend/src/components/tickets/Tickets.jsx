import React, { useState } from "react";
import { useTickets } from "../../contexts/TicketContext";
import { useNotifications } from "../../contexts/NotificationContext";

const Tickets = () => {
  const { tickets, createTicket } = useTickets();
  const { showToast } = useNotifications();

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  // نموذج البيانات الي نرسلها للباك اند
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  // الفلترة (open / in-progress / closed / all)
  const filteredTickets =
    filter === "all"
      ? tickets
      : tickets.filter((t) => t.status === filter);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTicket(formData);

    showToast("Ticket created successfully!", "success");

    setShowModal(false);

    // إعادة ضبط الفورم
    setFormData({
      title: "",
      description: "",
      priority: "medium",
    });
  };

  return (
    <div>
      {/* ===== Header ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, color: "#264653" }}>Tickets</h1>

        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "12px 24px",
            background: "#2A9D8F",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Create Ticket
        </button>
      </div>

      {/* ===== Filters ===== */}
      <div style={{ marginBottom: "20px" }}>
        {["all", "open", "in-progress", "closed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: "8px 16px",
              marginRight: "8px",
              background: filter === status ? "#2A9D8F" : "#f8f9fa",
              color: filter === status ? "white" : "#264653",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {status.charAt(0).toUpperCase() +
              status.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      {/* ===== Ticket List ===== */}
      <div style={{ display: "grid", gap: "16px" }}>
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: 0, color: "#264653" }}>
                {ticket.title}
              </h3>

              <span
                style={{
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
                  color:
                    ticket.priority === "high" ? "white" : "#2d3436",
                }}
              >
                {ticket.priority}
              </span>
            </div>

            <p
              style={{
                margin: "0 0 12px 0",
                color: "#6c757d",
              }}
            >
              {ticket.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                fontSize: "13px",
                color: "#6c757d",
              }}
            >
              <span>🆔 {ticket.id}</span>
              <span>📅 {new Date(ticket.created_at).toLocaleString()}</span>
              <span>🏷️ Status: {ticket.status}</span>
              <span>
                🏢 Department: {ticket.assigned_department}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Ticket Create Modal ===== */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "white",
              padding: "32px",
              borderRadius: "12px",
              width: "500px",
              maxWidth: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0 }}>Create New Ticket</h2>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  Title
                </label>

                <input
                  type="text"
                  value={formData.title}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  Description
                </label>

                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                />
              </div>

              {/* Priority */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  Priority
                </label>

                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 20px",
                    background: "#f8f9fa",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "#2A9D8F",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
