// Success Page
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Envelope, GameController, Copy, Download, Printer } from '@phosphor-icons/react';
import Barcode from 'react-barcode';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import { generatePix } from '../../utils/pixGenerator';
import { generateBoleto } from '../../utils/boletoGenerator';
import './Success.css';

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
  boletoPaid?: boolean;
  pixPaid?: boolean;
}

const getPaymentMethodName = (method: string = 'card') => {
  const methods: Record<string, string> = {
    card: 'Cartão de Crédito',
    pix: 'PIX',
    boleto: 'Boleto Bancário',
  };
  return methods[method] || 'Cartão de Crédito';
};

export const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [pixData, setPixData] = useState<any>(null);
  const [boletoData, setBoletoData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Buscar orderId na URL
    const orderId = searchParams.get('orderId');
    
    if (!orderId) {
      // Se não houver orderId na URL, tentar usar último pedido como fallback
      const lastOrder = localStorage.getItem('last_order');
      if (lastOrder) {
        const orderData = JSON.parse(lastOrder);
        setOrder(orderData);
        loadOrderData(orderData);
      }
      return;
    }

    // Buscar pedido no histórico pelo ID
    const ordersHistory = JSON.parse(localStorage.getItem('orders_history') || '[]');
    const foundOrder = ordersHistory.find((o: Order) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
      loadOrderData(foundOrder);
    }
  }, [searchParams]);

  const loadOrderData = (orderData: Order) => {
    // Se pagamento for PIX E não foi pago ainda, gerar QR Code
    if (orderData.paymentMethod === 'pix' && !orderData.pixPaid) {
      generatePix(orderData.total, orderData.id).then((pix) => {
        setPixData(pix);
      });
    }

    // Se pagamento for Boleto E não foi pago ainda, gerar dados do boleto
    if (orderData.paymentMethod === 'boleto' && !orderData.boletoPaid) {
      const boleto = generateBoleto({
        value: orderData.total,
        orderId: orderData.id,
        customerName: orderData.customer.name,
        customerCpf: orderData.customer.cpf,
      });
      setBoletoData(boleto);
    }
  };

  const handleCopyPix = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyBoleto = () => {
    if (boletoData) {
      navigator.clipboard.writeText(boletoData.digitableLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrintBoleto = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="success-page">
        <Container>
          <div className="success-card">
            <div className="success-icon warning">
              <Check size={32} weight="bold" />
            </div>
            <h1>Pedido não encontrado</h1>
            <p>Não foi possível encontrar as informações do pedido.</p>
            <Link to="/catalog">
              <Button size="lg">Voltar ao Catálogo</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="success-page">
      <Container maxWidth="md">
        <div className="success-card">
          <div className="success-icon">
            <Check size={32} weight="bold" />
          </div>
          
          <h1 className="success-title">✨ Pedido realizado com sucesso! ✨</h1>
          
          <p className="success-message">
            Parabéns! Seu pedido foi confirmado e os jogos já estão disponíveis
            na sua biblioteca. Aproveite!
          </p>

          <div className="order-details">
            <div className="order-header">
              <h2>Detalhes do Pedido</h2>
              <span className="order-id">#{order.id}</span>
            </div>

            <div className="order-date">
              <span className="label">Data:</span>
              <span className="value">
                {new Date(order.date).toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="order-payment-method">
              <span className="label">Forma de Pagamento:</span>
              <span className="value">
                {getPaymentMethodName(order.paymentMethod)}
              </span>
            </div>

            <div className="order-items">
              <h3>Itens Comprados ({order.items.length} {order.items.length === 1 ? 'jogo' : 'jogos'}):</h3>
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="order-item-info">
                    <span className="item-name">{item.name}</span>
                  </div>
                  <span className="item-price">
                    R$ {item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span>Total Pago:</span>
              <span className="total-value">R$ {order.total.toFixed(2)}</span>
            </div>

            <div className="customer-info">
              <h3>Informações do Cliente:</h3>
              <div className="info-row">
                <span className="info-label">Nome:</span>
                <span className="info-value">{order.customer.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">E-mail:</span>
                <span className="info-value">{order.customer.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">CPF:</span>
                <span className="info-value">{order.customer.cpf}</span>
              </div>
            </div>

            {/* Mensagem de confirmação quando PIX foi pago */}
            {order.paymentMethod === 'pix' && order.pixPaid && (
              <div className="pix-paid-section">
                <div className="pix-paid-icon">
                  <Check size={24} weight="bold" />
                </div>
                <h3>PIX Confirmado</h3>
                <p className="pix-paid-message">
                  Seu pagamento via PIX foi confirmado! Seus jogos já estão disponíveis na sua biblioteca.
                </p>
              </div>
            )}

            {/* Seção PIX - Só aparece se pagamento foi via PIX E ainda não foi pago */}
            {order.paymentMethod === 'pix' && !order.pixPaid && pixData && (
              <div className="pix-section">
                <h3>Pagamento via PIX</h3>
                <p className="pix-instructions">
                  Escaneie o QR Code abaixo ou copie o código PIX para finalizar o pagamento:
                </p>

                <div className="pix-qrcode-container">
                  <img src={pixData.qrCode} alt="QR Code PIX" className="pix-qrcode" />
                </div>

                <div className="pix-info">
                  <div className="pix-detail">
                    <span className="pix-label">Chave PIX:</span>
                    <span className="pix-value">{pixData.pixKey}</span>
                  </div>
                  <div className="pix-detail">
                    <span className="pix-label">Valor:</span>
                    <span className="pix-value">R$ {pixData.value}</span>
                  </div>
                  <div className="pix-detail">
                    <span className="pix-label">Validade:</span>
                    <span className="pix-value">{pixData.expiresIn} minutos</span>
                  </div>
                </div>

                <button onClick={handleCopyPix} className="copy-pix-btn">
                  <Copy size={20} weight="fill" />
                  {copied ? 'Código Copiado!' : 'Copiar Código PIX'}
                </button>

                <div className="pix-alert">
                  <p>⚠️ Após o pagamento, seus jogos serão liberados automaticamente em alguns minutos.</p>
                </div>
              </div>
            )}

            {/* Mensagem de confirmação quando boleto foi pago */}
            {order.paymentMethod === 'boleto' && order.boletoPaid && (
              <div className="boleto-paid-section">
                <div className="boleto-paid-icon">
                  <Check size={24} weight="bold" />
                </div>
                <h3>Boleto Confirmado</h3>
                <p className="boleto-paid-message">
                  Seu pagamento via boleto foi confirmado! Seus jogos serão liberados em até 2 dias úteis.
                </p>
              </div>
            )}

            {/* Seção Boleto - Só aparece se pagamento foi via Boleto E ainda não foi pago */}
            {order.paymentMethod === 'boleto' && !order.boletoPaid && boletoData && (
              <div className="boleto-section">
                <h3>Boleto Bancário</h3>
                <p className="boleto-instructions">
                  Pague o boleto até a data de vencimento para confirmar sua compra:
                </p>

                <div className="boleto-info-grid">
                  <div className="boleto-info-item">
                    <span className="boleto-label">Beneficiário:</span>
                    <span className="boleto-value">{boletoData.recipient}</span>
                  </div>
                  <div className="boleto-info-item">
                    <span className="boleto-label">CNPJ:</span>
                    <span className="boleto-value">{boletoData.cnpj}</span>
                  </div>
                  <div className="boleto-info-item">
                    <span className="boleto-label">Vencimento:</span>
                    <span className="boleto-value boleto-due-date">{boletoData.dueDate}</span>
                  </div>
                  <div className="boleto-info-item">
                    <span className="boleto-label">Valor:</span>
                    <span className="boleto-value boleto-amount">R$ {boletoData.value}</span>
                  </div>
                </div>

                <div className="boleto-barcode-container">
                  <p className="barcode-label">Código de Barras:</p>
                  <Barcode 
                    value={boletoData.barcode} 
                    height={60}
                    displayValue={false}
                    background="#ffffff"
                    lineColor="#000000"
                  />
                </div>

                <div className="boleto-digitable-line">
                  <p className="digitable-label">Linha Digitável:</p>
                  <div className="digitable-code">
                    {boletoData.digitableLine}
                  </div>
                </div>

                <div className="boleto-actions">
                  <button onClick={handleCopyBoleto} className="boleto-action-btn">
                    <Copy size={20} weight="fill" />
                    {copied ? 'Código Copiado!' : 'Copiar Linha Digitável'}
                  </button>
                  <button onClick={handlePrintBoleto} className="boleto-action-btn secondary">
                    <Printer size={20} weight="fill" />
                    Imprimir Boleto
                  </button>
                </div>

                <div className="boleto-alert">
                  <p>⚠️ Após o pagamento do boleto, seus jogos serão liberados em até 2 dias úteis.</p>
                </div>
              </div>
            )}

            <div className="success-info">
              <div className="info-with-icon">
                <Envelope size={20} weight="fill" />
                <div className="info-text">
                  <span>Um e-mail de confirmação foi enviado para</span>
                  <strong>{order.customer.email}</strong>
                </div>
              </div>
              {order.paymentMethod !== 'pix' && (
                <p className="info-with-icon">
                  <GameController size={20} weight="fill" />
                  Seus jogos já estão disponíveis na sua biblioteca!
                </p>
              )}
            </div>
          </div>

          <div className="success-actions">
            <Link to="/orders">
              <Button size="lg" fullWidth>
                Ver Meus Pedidos
              </Button>
            </Link>
            <Link to="/catalog">
              <Button size="lg" fullWidth variant="outline">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

