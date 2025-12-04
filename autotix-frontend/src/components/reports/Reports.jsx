import React, { useEffect, useState } from "react";
import { getReports } from "../../api";

const Reports = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await getReports();
      setDepartments(res.data);
    } catch (err) {
      console.log("Error loading reports", err);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "24px", color: "#264653" }}>
        Reports & Analytics
      </h1>

      <div style={{ display: "grid", gap: "20px" }}>
        {departments.map((dept) => {
          const resolvedPercent = dept.total_tickets
            ? ((dept.resolved_tickets / dept.total_tickets) * 100).toFixed(1)
            : 0;

          return (
            <div
              key={dept.department}
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "16px",
                  color: "#264653",
                }}
              >
                {dept.department}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "20px",
                }}
              >
                <div>
                  <p style={{ margin: 0, color: "#6c757d" }}>
                    Total Tickets
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#264653",
                    }}
                  >
                    {dept.total_tickets}
                  </p>
                </div>

                <div>
                  <p style={{ margin: 0, color: "#6c757d" }}>Resolved</p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#27ae60",
                    }}
                  >
                    {dept.resolved_tickets}
                  </p>
                </div>

                <div>
                  <p style={{ margin: 0, color: "#6c757d" }}>
                    Resolution Rate
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#3498db",
                    }}
                  >
                    {resolvedPercent}%
                  </p>
                </div>

                <div>
                  <p style={{ margin: 0, color: "#6c757d" }}>
                    Avg Response Time
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#f39c12",
                    }}
                  >
                    {dept.resolution_rate}
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  background: "#f8f9fa",
                  borderRadius: "8px",
                  height: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${resolvedPercent}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #27ae60, #2ecc71)",
                    transition: "width 0.5s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;