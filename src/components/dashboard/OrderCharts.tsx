import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Order } from '../../models/Order';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface OrderChartsProps {
  orders: Order[];
}

const OrderCharts: React.FC<OrderChartsProps> = ({ orders }) => {
  // Prepare data for status distribution pie chart
  const statusData = {
    labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [
          orders.filter(o => o.status === 'pending').length,
          orders.filter(o => o.status === 'confirmed').length,
          orders.filter(o => o.status === 'completed').length,
          orders.filter(o => o.status === 'cancelled').length,
        ],
        backgroundColor: [
          '#FFA726', // Orange for pending
          '#42A5F5', // Blue for confirmed
          '#66BB6A', // Green for completed
          '#EF5350', // Red for cancelled
        ],
      },
    ],
  };

  // Prepare data for monthly revenue bar chart
  const monthlyRevenue = orders.reduce((acc: { [key: string]: number }, order) => {
    const date = new Date(order.createdAt);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    acc[monthYear] = (acc[monthYear] || 0) + (order.totalAmount || 0);
    return acc;
  }, {});

  const revenueData = {
    labels: Object.keys(monthlyRevenue),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: Object.values(monthlyRevenue),
        backgroundColor: '#42A5F5',
      },
    ],
  };

  // Prepare data for popular activities bar chart
  const activityCounts = orders.reduce((acc: { [key: string]: number }, order) => {
    order.items.forEach(item => {
      acc[item.activityTitle] = (acc[item.activityTitle] || 0) + 1;
    });
    return acc;
  }, {});

  const activityData = {
    labels: Object.keys(activityCounts),
    datasets: [
      {
        label: 'Number of Orders',
        data: Object.values(activityCounts),
        backgroundColor: '#66BB6A',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="dashboard-charts">
      <div className="chart-container">
        <h3>Order Status Distribution</h3>
        <Pie data={statusData} options={chartOptions} />
      </div>
      <div className="chart-container">
        <h3>Monthly Revenue</h3>
        <Bar data={revenueData} options={chartOptions} />
      </div>
      <div className="chart-container">
        <h3>Popular Activities</h3>
        <Bar data={activityData} options={chartOptions} />
      </div>
    </div>
  );
};

export default OrderCharts; 