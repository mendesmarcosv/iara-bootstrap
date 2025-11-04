// PIX Payment Page
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Copy, CheckCircle } from '@phosphor-icons/react';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import { generatePix } from '../../utils/pixGenerator';
import './PixPayment.css';

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
    phone?: string;
  };
  paymentMethod: string;
  date: string;
}

export const PixPayment: React.FC = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [pixData, setPixData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar pedido pendente do localStorage
    const pendingOrder = localStorage.getItem('pending_order');
    if (!pendingOrder) {
      // Se não houver pedido pendente, redirecionar para cart
      navigate('/cart');
      return;
    }

    const orderData = JSON.parse(pendingOrder);
    setOrder(orderData);

    // Gerar dados do PIX
    generatePix(orderData.total, orderData.id).then((pix) => {
      setPixData(pix);
      setLoading(false);
    }).catch((error) => {
      console.error('Erro ao gerar PIX:', error);
      setLoading(false);
    });
  }, [navigate]);

  const handleCopyPix = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePaymentConfirmed = () => {
    if (!order) return;

    // Marcar PIX como pago
    const paidOrder = {
      ...order,
      pixPaid: true,
    };

    // Salvar pedido no histórico
    const ordersHistory = JSON.parse(localStorage.getItem('orders_history') || '[]');
    ordersHistory.push(paidOrder);
    localStorage.setItem('orders_history', JSON.stringify(ordersHistory));

    // Remover pedido pendente
    localStorage.removeItem('pending_order');

    // Redirecionar para página de sucesso com orderId na URL
    navigate(`/success?orderId=${paidOrder.id}`);
  };

  if (loading || !order || !pixData) {
    return (
      <div className="pix-payment-page">
        <Container>
          <div className="loading-container">
            <div className="spinner" />
            <p>Carregando pagamento PIX...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pix-payment-page">
      <Container>
        <div className="pix-header">
          <div className="pix-icon">
            <QrCode size={48} weight="fill" />
          </div>
          <h1>Pagamento PIX</h1>
          <p>Escaneie o QR Code ou copie o código para pagar</p>
        </div>

        <div className="pix-card">
          <div className="pix-info">
            <div className="pix-row">
              <span className="pix-label">Beneficiário:</span>
              <span className="pix-value">Iara Games LTDA</span>
            </div>
            <div className="pix-row">
              <span className="pix-label">Chave PIX:</span>
              <span className="pix-value">{pixData.pixKey}</span>
            </div>
            <div className="pix-row">
              <span className="pix-label">Valor:</span>
              <span className="pix-value pix-value-highlight">
                R$ {pixData.value}
              </span>
            </div>
            <div className="pix-row">
              <span className="pix-label">Validade:</span>
              <span className="pix-value">{pixData.expiresIn} minutos</span>
            </div>
          </div>

          <div className="pix-divider" />

          <div className="pix-qrcode-section">
            <label>QR Code PIX</label>
            <div className="qrcode-container">
              <img src={pixData.qrCode} alt="QR Code PIX" className="pix-qrcode" />
            </div>
          </div>

          <div className="pix-payload">
            <label>Código PIX (Copiar e Colar)</label>
            <div className="payload-container">
              <code className="pix-payload-code">{pixData.payload}</code>
              <button
                className="copy-btn"
                onClick={handleCopyPix}
                title="Copiar código PIX"
              >
                <Copy size={20} />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>

        <div className="pix-confirm-section">
          <div className="confirm-icon">
            <CheckCircle size={48} weight="fill" />
          </div>
          <h2>Já realizou o pagamento?</h2>
          <p>Confirme o pagamento para finalizar seu pedido</p>
          <Button
            size="lg"
            onClick={handlePaymentConfirmed}
            className="confirm-payment-btn"
          >
            <CheckCircle size={24} weight="fill" />
            Já Paguei
          </Button>
        </div>

        <div className="pix-help">
          <h3>Como pagar com PIX:</h3>
          <ol>
            <li>Abra o aplicativo do seu banco</li>
            <li>Selecione a opção "PIX" ou "Pagar com PIX"</li>
            <li>Escaneie o QR Code ou cole o código PIX</li>
            <li>Confirme o pagamento</li>
            <li>Volte aqui e clique em "Já Paguei"</li>
          </ol>
        </div>
      </Container>
    </div>
  );
};

