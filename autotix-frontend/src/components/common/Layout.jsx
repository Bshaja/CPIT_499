import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ToastContainer from '../notifications/ToastContainer';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <Sidebar isOpen={sidebarOpen} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Layout;
