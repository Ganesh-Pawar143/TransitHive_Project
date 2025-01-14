import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaCalendarCheck, 
  FaUserClock,
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const MetricCard = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change >= 0;
  
  return (
    <div className={`metric-card ${color}`}>
      <div className="metric-icon">
        <Icon size={24} />
      </div>
      <div className="metric-content">
        <h3 className="metric-value">{value}</h3>
        <p className="metric-title">{title}</p>
        <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <FaArrowUp /> : <FaArrowDown />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const [metrics, setMetrics] = useState({
    users: { total: 0, change: 0 },
    bookings: { total: 0, change: 0 },
    activeUsers: { total: 0, change: 0 },
    revenue: { total: 0, change: 0 }
  });

  useEffect(() => {
    // Simulated data - replace with actual API calls
    const fetchMetrics = () => {
      setMetrics({
        users: { total: 1250, change: 12.5 },
        bookings: { total: 856, change: 8.3 },
        activeUsers: { total: 420, change: -5.2 },
        revenue: { total: 125000, change: 15.7 }
      });
    };

    fetchMetrics();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="dashboard-stats">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      
      <div className="metrics-grid">
        <MetricCard
          title="Total Users"
          value={formatNumber(metrics.users.total)}
          change={metrics.users.change}
          icon={FaUsers}
          color="blue"
        />
        
        <MetricCard
          title="Total Bookings"
          value={formatNumber(metrics.bookings.total)}
          change={metrics.bookings.change}
          icon={FaCalendarCheck}
          color="green"
        />
        
        <MetricCard
          title="Active Users"
          value={formatNumber(metrics.activeUsers.total)}
          change={metrics.activeUsers.change}
          icon={FaUserClock}
          color="purple"
        />
        
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(metrics.revenue.total)}
          change={metrics.revenue.change}
          icon={FaChartLine}
          color="orange"
        />
      </div>
    </div>
  );
};

export default DashboardStats;