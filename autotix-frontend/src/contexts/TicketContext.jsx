import React, { createContext, useContext, useEffect, useState } from "react";
import { createTicket as apiCreateTicket, getTickets as apiGetTickets } from "../api";
import { useAuth } from '../contexts/AuthContext';



const TicketContext = createContext();


export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);


const { user } = useAuth();


  // Load all tickets from backend
  const loadTickets = async () => {
    try {
      const res = await apiGetTickets();

      // If logged user is normal user → show only his tickets
      if (user?.role === "user") {
        setTickets(res.data.filter(t => t.email === user.email));
      } else {
        // staff + admin see all tickets
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
        email:  user.email,
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