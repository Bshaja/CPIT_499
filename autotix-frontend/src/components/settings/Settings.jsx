import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';

const Settings = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    showToast('Setting updated successfully', 'success');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#264653' }}>Settings</h1>

      <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>Account Information</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', color: '#6c757d' }}>Name</label>
            <p style={{ margin: 0, fontSize: '16px', color: '#264653', fontWeight: '500' }}>{user?.name}</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', color: '#6c757d' }}>Email</label>
            <p style={{ margin: 0, fontSize: '16px', color: '#264653', fontWeight: '500' }}>{user?.email}</p>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', color: '#6c757d' }}>Role</label>
            <p style={{ margin: 0, fontSize: '16px', color: '#264653', fontWeight: '500' }}>{user?.role}</p>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>Notification Preferences</h2>

          {Object.entries(settings).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid #f1f3f5'
              }}
            >
              <span style={{ fontSize: '15px', color: '#264653' }}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
              <button
                onClick={() => handleToggle(key)}
                style={{
                  width: '50px',
                  height: '24px',
                  borderRadius: '24px',
                  border: 'none',
                  background: value ? '#2A9D8F' : '#ccc',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                <span style={{
                  position: 'absolute',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'white',
                  top: '3px',
                  left: value ? '29px' : '3px',
                  transition: 'left 0.3s'
                }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
