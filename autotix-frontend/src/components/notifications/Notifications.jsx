import React from 'react';
import { useNotifications } from '../../contexts/NotificationContext';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#264653' }}>Notifications</h1>

      <div style={{ display: 'grid', gap: '12px' }}>
        {notifications.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            color: '#6c757d'
          }}>
            No notifications yet
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                background: notif.read ? '#f8f9fa' : 'white',
                padding: '16px 20px',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                borderLeft: `4px solid ${
                  notif.type === 'success' ? '#27ae60' :
                  notif.type === 'warning' ? '#f39c12' :
                  notif.type === 'error' ? '#e74c3c' : '#3498db'
                }`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 8px 0', color: '#264653', fontWeight: notif.read ? 'normal' : '600' }}>
                    {notif.message}
                  </p>
                  <span style={{ fontSize: '13px', color: '#6c757d' }}>
                    {new Date(notif.timestamp).toLocaleString()}
                  </span>
                </div>
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    style={{
                      padding: '6px 12px',
                      background: '#2A9D8F',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
