// Boleto Payment Page
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Barcode as BarcodeIcon, Copy, Download, Printer, CheckCircle } from '@phosphor-icons/react';
import Barcode from 'react-barcode';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import { generateBoleto } from '../../utils/boletoGenerator';
import './BoletoPayment.css';

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

export const BoletoPayment: React.FC = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [boletoData, setBoletoData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

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

    // Gerar dados do boleto
    const boleto = generateBoleto({
      value: orderData.total,
      orderId: orderData.id,
      customerName: orderData.customer.name,
      customerCpf: orderData.customer.cpf,
    });
    setBoletoData(boleto);
  }, [navigate]);

  const handleCopyDigitableLine = () => {
    if (boletoData) {
      navigator.clipboard.writeText(boletoData.digitableLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Criar um link para download (simulado)
    const content = `
BOLETO BANCÁRIO
================

Beneficiário: ${boletoData?.recipient}
CNPJ: ${boletoData?.cnpj}

Pagador: ${order?.customer.name}
CPF: ${order?.customer.cpf}

Valor: R$ ${boletoData?.value}
Vencimento: ${boletoData?.dueDate}

Linha Digitável:
${boletoData?.digitableLine}

Código de Barras:
${boletoData?.barcode}

Pedido: ${order?.id}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boleto-${order?.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePaymentConfirmed = () => {
    if (!order) return;

    // Marcar boleto como pago
    const paidOrder = {
      ...order,
      boletoPaid: true,
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

  if (!order || !boletoData) {
    return (
      <div className="boleto-payment-page">
        <Container>
          <div className="loading-container">
            <div className="spinner" />
            <p>Carregando boleto...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="boleto-payment-page">
      <Container>
        <div className="boleto-header">
          <div className="boleto-icon">
            <BarcodeIcon size={48} weight="fill" />
          </div>
          <h1>Boleto Bancário</h1>
          <p>Use o código abaixo para realizar o pagamento</p>
        </div>

        <div className="boleto-card">
          <div className="boleto-info">
            <div className="boleto-row">
              <span className="boleto-label">Beneficiário:</span>
              <span className="boleto-value">{boletoData.recipient}</span>
            </div>
            <div className="boleto-row">
              <span className="boleto-label">CNPJ:</span>
              <span className="boleto-value">{boletoData.cnpj}</span>
            </div>
            <div className="boleto-row">
              <span className="boleto-label">Pagador:</span>
              <span className="boleto-value">{order.customer.name}</span>
            </div>
            <div className="boleto-row">
              <span className="boleto-label">CPF:</span>
              <span className="boleto-value">{order.customer.cpf}</span>
            </div>
            <div className="boleto-row">
              <span className="boleto-label">Valor:</span>
              <span className="boleto-value boleto-value-highlight">
                R$ {boletoData.value}
              </span>
            </div>
            <div className="boleto-row">
              <span className="boleto-label">Vencimento:</span>
              <span className="boleto-value">{boletoData.dueDate}</span>
            </div>
          </div>

          <div className="boleto-divider" />

          <div className="boleto-digitable-line">
            <label>Linha Digitável</label>
            <div className="digitable-line-container">
              <code className="digitable-line">{boletoData.digitableLine}</code>
              <button
                className="copy-btn"
                onClick={handleCopyDigitableLine}
                title="Copiar linha digitável"
              >
                <Copy size={20} />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <div className="boleto-barcode">
            <label>Código de Barras</label>
            <div className="barcode-container">
              <Barcode
                value={boletoData.barcode}
                format="CODE128"
                width={2}
                height={80}
                displayValue={true}
              />
            </div>
            <p className="barcode-number">{boletoData.barcode}</p>
          </div>

          <div className="boleto-actions">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="action-btn"
            >
              <Printer size={20} />
              Imprimir Boleto
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="action-btn"
            >
              <Download size={20} />
              Baixar Boleto
            </Button>
          </div>
        </div>

        <div className="boleto-confirm-section">
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

        <div className="boleto-help">
          <h3>Como pagar o boleto:</h3>
          <ol>
            <li>Copie a linha digitável ou escaneie o código de barras</li>
            <li>Abra o aplicativo do seu banco</li>
            <li>Selecione "Pagar boleto" ou "Pix/Boleto"</li>
            <li>Cole a linha digitável ou escaneie o código</li>
            <li>Confirme o pagamento</li>
            <li>Volte aqui e clique em "Já Paguei"</li>
          </ol>
        </div>
      </Container>
    </div>
  );
};

