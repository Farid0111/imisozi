import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, orderService } from '../../services/orderService';
import { auth } from '../../utils/firebase';
import '../../styles/Dashboard.css';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setError('Vous devez être connecté pour voir les commandes.');
        return;
      }

      const fetchedOrders = await orderService.getAll();
      setOrders(fetchedOrders);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des commandes:', err);
      setError('Erreur lors du chargement des commandes. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  const handlePaymentStatusChange = async (orderId: string, newPaymentStatus: Order['paymentStatus']) => {
    try {
      await orderService.updatePaymentStatus(orderId, newPaymentStatus);
      fetchOrders();
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut de paiement:', err);
      setError('Erreur lors de la mise à jour du statut de paiement');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des commandes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={fetchOrders}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="content-header">
        <h2>Gestion des Commandes</h2>
        <button onClick={fetchOrders} className="refresh-btn">
          Rafraîchir
        </button>
      </div>

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>Aucune commande trouvée</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Commande #{order.id}</h3>
                <div className="status-badges">
                  <span className={`status-badge ${order.status}`}>
                    {order.status === 'pending' && 'En attente'}
                    {order.status === 'confirmed' && 'Confirmée'}
                    {order.status === 'completed' && 'Terminée'}
                    {order.status === 'cancelled' && 'Annulée'}
                  </span>
                  {order.paymentStatus && (
                    <span className={`payment-badge ${order.paymentStatus}`}>
                      {order.paymentStatus === 'pending' && 'Paiement en attente'}
                      {order.paymentStatus === 'paid' && 'Payé'}
                      {order.paymentStatus === 'refunded' && 'Remboursé'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="order-details">
                <p><strong>Client:</strong> {order.fullName}</p>
                <p><strong>Email:</strong> {order.email}</p>
                {order.phone && <p><strong>Téléphone:</strong> {order.phone}</p>}
                <p><strong>Date de création:</strong> {order.createdAt.toLocaleDateString()}</p>
                <p><strong>Dernière mise à jour:</strong> {order.updatedAt.toLocaleDateString()}</p>
                <p><strong>Montant:</strong> {order.totalAmount} {order.currency || 'USD'}</p>
                <p><strong>Personnes:</strong> {order.numPersons}</p>
                <p><strong>Jours:</strong> {order.numDays}</p>
                {order.specialRequests && (
                  <p><strong>Demandes spéciales:</strong> {order.specialRequests}</p>
                )}
                {order.items && order.items.length > 0 && (
                  <div className="order-items">
                    <h4>Activités commandées:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="activity-details">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.activityTitle} 
                              className="activity-image"
                              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                          )}
                          <div className="activity-info">
                            <p><strong>Activité:</strong> {item.activityTitle}</p>
                            <p><strong>ID:</strong> {item.activityId}</p>
                            <p><strong>Nombre de personnes:</strong> {item.numPersons}</p>
                            {item.price && (
                              <p><strong>Prix unitaire:</strong> {item.price} {order.currency || 'USD'}</p>
                            )}
                            {item.price && item.numPersons && (
                              <p><strong>Prix total:</strong> {item.price * item.numPersons} {order.currency || 'USD'}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="order-summary">
                      <p><strong>Nombre total d'activités:</strong> {order.items.length}</p>
                      <p><strong>Montant total de la commande:</strong> {order.totalAmount} {order.currency || 'USD'}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="order-actions">
                {order.status === 'pending' && (
                  <>
                    <button 
                      className="confirm-btn"
                      onClick={() => handleStatusChange(order.id, 'confirmed')}
                    >
                      Confirmer
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={() => handleStatusChange(order.id, 'cancelled')}
                    >
                      Annuler
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <button 
                    className="complete-btn"
                    onClick={() => handleStatusChange(order.id, 'completed')}
                  >
                    Marquer comme terminée
                  </button>
                )}
                {order.paymentStatus === 'pending' && (
                  <button 
                    className="payment-btn"
                    onClick={() => handlePaymentStatusChange(order.id, 'paid')}
                  >
                    Marquer comme payé
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

export default Orders;