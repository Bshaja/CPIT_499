import React from 'react';
import { useNotifications } from '../../contexts/NotificationContext';

const ToastContainer = () => {
  const { toasts } = useNotifications();

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: '16px 20px',
            background: toast.type === 'success' ? '#27ae60' :
                       toast.type === 'error' ? '#e74c3c' :
                       toast.type === 'warning' ? '#f39c12' : '#3498db',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '300px',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
