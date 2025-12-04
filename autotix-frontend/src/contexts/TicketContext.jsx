import React, { createContext, useContext, useEffect, useState } from "react";
import { createTicket as apiCreateTicket, getTickets as apiGetTickets } from "../api";

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  // Load all tickets from backend
  const loadTickets = async () => {
    try {
      const res = await apiGetTickets();
      setTickets(res.data);
    } catch (err) {
      console.log("Error loading tickets:", err);
    }
  };

  const createTicket = async (ticket) => {
    try {
      const res = await apiCreateTicket({
        title: ticket.title,
        description: ticket.description,
        email: "",
        priority: ticket.priority
      });

      // Add returned ticket
      setTickets((prev) => [...prev, res.data.ticket]);
    } catch (err) {
      console.log("Error creating ticket:", err);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <TicketContext.Provider value={{ tickets, setTickets, createTicket }}>
      {children}
    </TicketContext.Provider>
  );
};