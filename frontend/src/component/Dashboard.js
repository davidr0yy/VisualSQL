import React from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Engagement',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: '#9570FF',
        borderColor: '#9570FF',
      },
    ],
  };

  const viewTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Average View Time (mins)',
        data: [10, 20, 15, 25, 30, 20, 15],
        fill: false,
        backgroundColor: '#34C759',
        borderColor: '#34C759',
      },
    ],
  };

  const scoresData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Average Scores',
        data: [75, 80, 85, 90, 95, 70, 85],
        fill: false,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Analytics',
      },
    },
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">Hello, John Doe! </div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Account</li>
            <li>Stats</li>
            <li>Support</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Hello, Panji Satrya</h1>
        </header>
        <section className="widgets">
          <div className="widget card">
            <h3>Analytics</h3>
            <Line data={engagementData} options={options} />
          </div>
          <div className="widget card">
            <h3>Average View Time</h3>
            <Line data={viewTimeData} options={options} />
          </div>
          <div className="widget card">
            <h3>Average Scores</h3>
            <Line data={scoresData} options={options} />
          </div>
          <div className="widget card">
            <h3>Detected Signs of Pessimism</h3>
            {/* Add your data visualization for pessimism here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
