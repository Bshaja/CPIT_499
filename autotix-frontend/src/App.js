import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TicketProvider } from './contexts/TicketContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AppRouter from './router/AppRouter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TicketProvider>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
