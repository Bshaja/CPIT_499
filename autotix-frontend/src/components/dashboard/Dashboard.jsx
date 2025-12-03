import React from 'react';
import { useTickets } from '../../contexts/TicketContext';

const Dashboard = () => {
  const { tickets } = useTickets();

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ margin: '0 0 8px 0', color: '#6c757d', fontSize: '14px' }}>
            {title}
          </p>
          <h3 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#264653' }}>
            {value}
          </h3>
        </div>
        <div style={{
          fontSize: '32px',
          background: `${color}20`,
          borderRadius: '12px',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 style={{ marginBottom: '24px', color: '#264653' }}>Dashboard</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <StatCard title="Total Tickets" value={stats.total} icon="🎫" color="#3498db" />
        <StatCard title="Open Tickets" value={stats.open} icon="📂" color="#e74c3c" />
        <StatCard title="In Progress" value={stats.inProgress} icon="⏳" color="#f39c12" />
        <StatCard title="Closed" value={stats.closed} icon="✅" color="#27ae60" />
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#264653', fontSize: '20px' }}>
          Recent Tickets
        </h2>
        <div>
          {tickets.slice(0, 5).map((ticket) => (
            <div key={ticket.id} style={{
              padding: '16px',
              borderBottom: '1px solid #f1f3f5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: '#264653' }}>{ticket.title}</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#6c757d' }}>
                  {ticket.id} • {ticket.assignee}
                </p>
              </div>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                background: ticket.priority === 'high' ? '#ff7675' :
                          ticket.priority === 'medium' ? '#fdcb6e' : '#dfe6e9',
                color: ticket.priority === 'high' ? 'white' : '#2d3436'
              }}>
                {ticket.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
