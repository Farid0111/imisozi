import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Order } from '../../models/Order';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Enregistrer les composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef);
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(ordersData);
      } catch (err) {
        setError('Erreur lors du chargement des commandes');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Préparer les données pour les graphiques
  const getMonthlyData = () => {
    const monthlyData = new Array(12).fill(0);
    const monthlyRevenue = new Array(12).fill(0);

    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const month = date.getMonth();
      monthlyData[month]++;
      monthlyRevenue[month] += order.totalAmount || 0;
    });

    return { orders: monthlyData, revenue: monthlyRevenue };
  };

  const getStatusData = () => {
    const statusCount = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0
    };

    orders.forEach(order => {
      statusCount[order.status]++;
    });

    return statusCount;
  };

  const getPaymentData = () => {
    const paymentCount = {
      pending: 0,
      paid: 0,
      refunded: 0
    };

    orders.forEach(order => {
      paymentCount[order.paymentStatus]++;
    });

    return paymentCount;
  };

  const monthlyData = getMonthlyData();
  const statusData = getStatusData();
  const paymentData = getPaymentData();

  // Configuration des graphiques
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  const ordersChartData = {
    labels: months,
    datasets: [
      {
        label: 'Nombre de commandes',
        data: monthlyData.orders,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      }
    ]
  };

  const revenueChartData = {
    labels: months,
    datasets: [
      {
        label: 'Revenus (RWF)',
        data: monthlyData.revenue,
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      }
    ]
  };

  const statusChartData = {
    labels: ['En attente', 'Confirmée', 'Terminée', 'Annulée'],
    datasets: [
      {
        data: [
          statusData.pending,
          statusData.confirmed,
          statusData.completed,
          statusData.cancelled
        ],
        backgroundColor: [
          'rgba(234, 179, 8, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(239, 68, 68, 0.5)'
        ],
        borderColor: [
          'rgb(234, 179, 8)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1
      }
    ]
  };

  const paymentChartData = {
    labels: ['En attente', 'Payée', 'Remboursée'],
    datasets: [
      {
        data: [
          paymentData.pending,
          paymentData.paid,
          paymentData.refunded
        ],
        backgroundColor: [
          'rgba(234, 179, 8, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(239, 68, 68, 0.5)'
        ],
        borderColor: [
          'rgb(234, 179, 8)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1
      }
    ]
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      }
    }
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      }
    }
  };

  const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="dashboard-charts">
      <div className="content-header">
        <h2>Statistiques</h2>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Évolution des commandes</h3>
          <Line data={ordersChartData} options={lineChartOptions} />
        </div>

        <div className="chart-container">
          <h3>Revenus mensuels</h3>
          <Bar data={revenueChartData} options={barChartOptions} />
        </div>

        <div className="chart-container">
          <h3>Statut des commandes</h3>
          <Pie data={statusChartData} options={pieChartOptions} />
        </div>

        <div className="chart-container">
          <h3>Statut des paiements</h3>
          <Pie data={paymentChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts; 