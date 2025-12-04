import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ---------------- Organizations ----------------
export const createOrganization = (data) => API.post("/organizations", data);

// ---------------- Departments ----------------
export const createDepartment = (data) => API.post("/departments", data);
export const getDepartments = () => API.get("/departments");

// ---------------- Users ----------------
export const createUser = (data) => API.post("/users", data);

// ---------------- Tickets ----------------
export const createTicket = (data) => API.post("/tickets", data);
export const getTickets = () => API.get("/tickets");
export const getTicketsByDept = (deptId) => API.get(`/tickets/department/${deptId}`);
export const updateTicketStatus =async  (id, data) => API.put(`/tickets/${id}/status`, data);

// ---------------- AI ----------------
export const aiPredict = (text) => API.post("/ai/predict", { text });

// ---------------- Auth ----------------
export const loginUser = (email, password) => API.post("/users/login", { email, password });

// ---------------- Reports ----------------
export const getReports = () => API.get("/reports/departments");
