import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createTicket as apiCreateTicket,
  getTickets as apiGetTickets,
  deleteTicket as apiDeleteTicket,
} from "../api";
import { useAuth } from "../contexts/AuthContext";

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();

  // Load all tickets from backend
  const loadTickets = async () => {
    try {
      const res = await apiGetTickets();

      console.log("API Tickets:", res.data);

      if (user?.role === "user") {
        setTickets(res.data.filter((t) => t.email === user.email));
      } else {
        setTickets(res.data);
      }
    } catch (err) {
      console.log("Error loading tickets:", err);
    }
  };

  const createTicket = async (ticket) => {
    try {
      const res = await apiCreateTicket({
        title: ticket.title,
        description: ticket.description,
        email: user.email,
        priority: ticket.priority,
      });

      setTickets((prev) => [...prev, res.data.ticket]);
    } catch (err) {
      console.log("Error creating ticket:", err);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await apiDeleteTicket(id);

      setTickets((prev) =>
        prev.filter((t) => (t.id || t.ticket_id) !== id)
      );
    } catch (err) {
      console.log("Error deleting ticket:", err);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <TicketContext.Provider
      value={{ tickets, setTickets, createTicket, deleteTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
};