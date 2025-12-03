import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/tickets', icon: '🎫', label: 'Tickets' },
    { path: '/notifications', icon: '🔔', label: 'Notifications' },
    { path: '/reports', icon: '📈', label: 'Reports' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <div style={{
      width: isOpen ? '250px' : '0',
      background: '#264653',
      color: 'white',
      transition: 'width 0.3s',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>AutoTix</h2>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', opacity: 0.7 }}>IT Support System</p>
      </div>

      <nav style={{ flex: 1, padding: '20px 0' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              padding: '12px 20px',
              color: 'white',
              textDecoration: 'none',
              transition: 'background 0.2s',
              background: isActive ? 'rgba(42, 157, 143, 0.3)' : 'transparent',
              borderLeft: isActive ? '4px solid #2A9D8F' : '4px solid transparent'
            })}
          >
            <span style={{ fontSize: '20px', marginRight: '12px' }}>{item.icon}</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
