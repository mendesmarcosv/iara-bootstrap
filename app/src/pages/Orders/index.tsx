// Orders Page - Meus Pedidos
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Receipt, Calendar, CreditCard, QrCode, Barcode } from '@phosphor-icons/react';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import './Orders.css';

interface Order {
  id: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
  }>;
  total: number;
  customer: {
    name: string;
    email: string;
    cpf: string;
  };
  paymentMethod?: string;
  date: string;
}

const getPaymentMethodName = (method: string = 'card') => {
  const methods: Record<string, string> = {
    card: 'Cartão de Crédito',
    pix: 'PIX',
    boleto: 'Boleto',
  };
  return methods[method] || 'Cartão de Crédito';
};

const getPaymentMethodIcon = (method: string = 'card') => {
  switch (method) {
    case 'pix':
      return <QrCode size={20} weight="fill" />;
    case 'boleto':
      return <Barcode size={20} weight="fill" />;
    default:
      return <CreditCard size={20} weight="fill" />;
  }
};

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar pedidos do localStorage
    const loadOrders = () => {
      try {
        const ordersData = localStorage.getItem('orders_history');
        if (ordersData) {
          const parsedOrders = JSON.parse(ordersData);
          // Ordenar por data (mais recente primeiro)
          parsedOrders.sort((a: Order, b: Order) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setOrders(parsedOrders);
        }
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Carregando pedidos...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <Container>
          <div className="empty-orders">
            <div className="empty-icon">
              <Package size={120} weight="fill" />
            </div>
            <h2>Nenhum pedido encontrado</h2>
            <p>Você ainda não fez nenhuma compra. Explore nosso catálogo!</p>
            <Link to="/catalog">
              <Button size="lg">Explorar Catálogo</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <Container>
        <div className="orders-header">
          <h1 className="orders-title">Meus Pedidos</h1>
          <p className="orders-subtitle">
            Histórico completo das suas compras
          </p>
        </div>

        <div className="orders-stats">
          <div className="stat-card">
            <Receipt size={32} weight="fill" />
            <div className="stat-info">
              <span className="stat-value">{orders.length}</span>
              <span className="stat-label">Pedidos</span>
            </div>
          </div>
          <div className="stat-card">
            <Package size={32} weight="fill" />
            <div className="stat-info">
              <span className="stat-value">
                {orders.reduce((sum, order) => sum + order.items.length, 0)}
              </span>
              <span className="stat-label">Jogos</span>
            </div>
          </div>
          <div className="stat-card">
            <CreditCard size={32} weight="fill" />
            <div className="stat-info">
              <span className="stat-value">
                R$ {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </span>
              <span className="stat-label">Total Gasto</span>
            </div>
          </div>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-info-top">
                  <span className="order-id">Pedido #{order.id.split('-')[1]}</span>
                  <span className="order-status">
                    <span className="status-dot"></span>
                    Concluído
                  </span>
                </div>
                <div className="order-date-info">
                  <Calendar size={16} weight="fill" />
                  <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                  <span className="order-time">
                    {new Date(order.date).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-items-summary">
                  <h4>Itens ({order.items.length} {order.items.length === 1 ? 'jogo' : 'jogos'})</h4>
                  <div className="items-list">
                    {order.items.map((item, index) => (
                      <div key={item.id} className="order-item-mini">
                        <span className="item-number">{index + 1}.</span>
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">R$ {item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-card-footer">
                  <div className="payment-method-container">
                    <div className="payment-method-badge">
                      {getPaymentMethodIcon(order.paymentMethod)}
                      {getPaymentMethodName(order.paymentMethod)}
                    </div>
                    <button 
                      className="invoice-btn"
                      onClick={() => {
                        alert('Nota fiscal disponível em breve!');
                      }}
                      title="Nota Fiscal"
                    >
                      Nota Fiscal
                    </button>
                  </div>
                  <div className="order-total-info">
                    <span className="total-label">Total:</span>
                    <span className="total-value">R$ {order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

