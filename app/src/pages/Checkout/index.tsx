// Checkout Page
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CreditCard, PixLogo, Barcode } from '@phosphor-icons/react';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../contexts/AuthContext';
import './Checkout.css';

const CheckoutSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .required('Nome é obrigatório'),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (formato: 000.000.000-00)')
    .required('CPF é obrigatório'),
  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido (formato: (00) 00000-0000)')
    .required('Telefone é obrigatório'),
  paymentMethod: Yup.string()
    .oneOf(['card', 'pix', 'boleto'], 'Selecione um método de pagamento')
    .required('Método de pagamento é obrigatório'),
  cardNumber: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número do cartão inválido')
      .required('Número do cartão é obrigatório'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardName: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .required('Nome no cartão é obrigatório'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardExpiry: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .matches(/^\d{2}\/\d{2}$/, 'Validade inválida (MM/AA)')
      .required('Validade é obrigatória'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardCVV: Yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema
      .matches(/^\d{3,4}$/, 'CVV inválido (3 ou 4 dígitos)')
      .required('CVV é obrigatório'),
    otherwise: (schema) => schema.notRequired(),
  }),
}, [
  ['cardNumber', 'paymentMethod'],
  ['cardName', 'paymentMethod'],
  ['cardExpiry', 'paymentMethod'],
  ['cardCVV', 'paymentMethod'],
]);

export const Checkout: React.FC = () => {
  const { items, total, clearCart, loading } = useCart();
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Guardar items para não perder na limpeza do carrinho
  // useMemo garante que orderItems seja atualizado sempre que items mudar
  const orderItems = useMemo(() => items, [items]);

  const handleSubmit = async (values: any) => {
    console.log('Iniciando checkout com valores:', values);
    setError(null);
    setProcessing(true);
    setShowSuccess(true);
    
    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Salvar dados do pedido no localStorage (usar orderItems que foi guardado)
      const order = {
        id: `ORDER-${Date.now()}`,
        items: orderItems,
        total,
        customer: {
          ...values,
          email: userEmail || 'usuario@iaragames.com',
        },
        paymentMethod: values.paymentMethod,
        date: new Date().toISOString(),
      };
      
      // Se for boleto, salvar como pedido pendente e redirecionar para página de boleto
      if (values.paymentMethod === 'boleto') {
        localStorage.setItem('pending_order', JSON.stringify(order));
        clearCart();
        navigate('/payment/boleto');
        return;
      }
      
      // Se for PIX, salvar como pedido pendente e redirecionar para página de PIX
      if (values.paymentMethod === 'pix') {
        localStorage.setItem('pending_order', JSON.stringify(order));
        clearCart();
        navigate('/payment/pix');
        return;
      }
      
      // Para cartão, processar normalmente (vai direto para sucesso)
      // Adicionar ao histórico de pedidos
      const ordersHistory = JSON.parse(localStorage.getItem('orders_history') || '[]');
      ordersHistory.push(order);
      localStorage.setItem('orders_history', JSON.stringify(ordersHistory));
      
      // Limpar carrinho
      clearCart();
      
      // Redirecionar para página de sucesso com orderId na URL
      navigate(`/success?orderId=${order.id}`);
      
    } catch (err: any) {
      setError('Erro ao processar pagamento. Tente novamente.');
      console.error('Checkout error:', err);
      setProcessing(false);
      setShowSuccess(false);
    }
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 16) {
      return numbers
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4}) (\d{4})(\d)/, '$1 $2 $3')
        .replace(/(\d{4}) (\d{4}) (\d{4})(\d)/, '$1 $2 $3 $4');
    }
    return value;
  };

  const formatCardExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) {
      return numbers.replace(/(\d{2})(\d)/, '$1/$2');
    }
    return value;
  };

  // Mostrar loading enquanto carrega o carrinho
  if (loading) {
    return (
      <div className="checkout-page">
        <Container>
          <div className="loading-container">
            <div className="spinner" />
            <p>Carregando carrinho...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Container>
        <h1 className="checkout-title">Finalizar Compra</h1>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Informações de Pagamento</h2>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <Formik
              initialValues={{
                name: '',
                cpf: '',
                phone: '',
                paymentMethod: 'card',
                cardNumber: '',
                cardName: '',
                cardExpiry: '',
                cardCVV: '',
              }}
              validationSchema={CheckoutSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, setFieldValue, values }) => (
                <Form className="checkout-form">
                  <div className="form-group">
                    <label htmlFor="name">Nome Completo</label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className={`form-input ${
                        errors.name && touched.name ? 'input-error' : ''
                      }`}
                      placeholder="Seu nome completo"
                    />
                    {errors.name && touched.name && (
                      <span className="text-error">{errors.name}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cpf">CPF</label>
                      <Field name="cpf">
                        {({ field }: any) => (
                          <input
                            {...field}
                            type="text"
                            id="cpf"
                            className={`form-input ${
                              errors.cpf && touched.cpf ? 'input-error' : ''
                            }`}
                            placeholder="000.000.000-00"
                            maxLength={14}
                            onChange={(e) => {
                              const formatted = formatCPF(e.target.value);
                              setFieldValue('cpf', formatted);
                            }}
                          />
                        )}
                      </Field>
                      {errors.cpf && touched.cpf && (
                        <span className="text-error">{errors.cpf}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Telefone</label>
                      <Field name="phone">
                        {({ field }: any) => (
                          <input
                            {...field}
                            type="text"
                            id="phone"
                            className={`form-input ${
                              errors.phone && touched.phone ? 'input-error' : ''
                            }`}
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            onChange={(e) => {
                              const formatted = formatPhone(e.target.value);
                              setFieldValue('phone', formatted);
                            }}
                          />
                        )}
                      </Field>
                      {errors.phone && touched.phone && (
                        <span className="text-error">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="payment-section">
                    <h3>Forma de Pagamento</h3>
                    
                    <div className="payment-methods">
                      <label className={`payment-method-option ${values.paymentMethod === 'card' ? 'active' : ''}`}>
                        <Field type="radio" name="paymentMethod" value="card" />
                        <span className="payment-method-content">
                          <span className="payment-method-icon">
                            <CreditCard size={32} weight="fill" />
                          </span>
                          <span>Cartão de Crédito</span>
                        </span>
                      </label>

                      <label className={`payment-method-option ${values.paymentMethod === 'pix' ? 'active' : ''}`}>
                        <Field type="radio" name="paymentMethod" value="pix" />
                        <span className="payment-method-content">
                          <span className="payment-method-icon">
                            <PixLogo size={32} weight="fill" />
                          </span>
                          <span>PIX</span>
                        </span>
                      </label>

                      <label className={`payment-method-option ${values.paymentMethod === 'boleto' ? 'active' : ''}`}>
                        <Field type="radio" name="paymentMethod" value="boleto" />
                        <span className="payment-method-content">
                          <span className="payment-method-icon">
                            <Barcode size={32} weight="fill" />
                          </span>
                          <span>Boleto</span>
                        </span>
                      </label>
                    </div>

                    {errors.paymentMethod && touched.paymentMethod && (
                      <span className="text-error">{errors.paymentMethod}</span>
                    )}

                    {/* Campos do Cartão */}
                    {values.paymentMethod === 'card' && (
                      <div className="card-fields">
                        <div className="form-group">
                          <label htmlFor="cardNumber">Número do Cartão</label>
                          <Field name="cardNumber">
                            {({ field }: any) => (
                              <input
                                {...field}
                                type="text"
                                id="cardNumber"
                                className={`form-input ${
                                  errors.cardNumber && touched.cardNumber ? 'input-error' : ''
                                }`}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                onChange={(e) => {
                                  const formatted = formatCardNumber(e.target.value);
                                  setFieldValue('cardNumber', formatted);
                                }}
                              />
                            )}
                          </Field>
                          {errors.cardNumber && touched.cardNumber && (
                            <span className="text-error">{errors.cardNumber}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="cardName">Nome no Cartão</label>
                          <Field
                            type="text"
                            name="cardName"
                            id="cardName"
                            className={`form-input ${
                              errors.cardName && touched.cardName ? 'input-error' : ''
                            }`}
                            placeholder="NOME COMO ESTÁ NO CARTÃO"
                            style={{ textTransform: 'uppercase' }}
                          />
                          {errors.cardName && touched.cardName && (
                            <span className="text-error">{errors.cardName}</span>
                          )}
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="cardExpiry">Validade</label>
                            <Field name="cardExpiry">
                              {({ field }: any) => (
                                <input
                                  {...field}
                                  type="text"
                                  id="cardExpiry"
                                  className={`form-input ${
                                    errors.cardExpiry && touched.cardExpiry ? 'input-error' : ''
                                  }`}
                                  placeholder="MM/AA"
                                  maxLength={5}
                                  onChange={(e) => {
                                    const formatted = formatCardExpiry(e.target.value);
                                    setFieldValue('cardExpiry', formatted);
                                  }}
                                />
                              )}
                            </Field>
                            {errors.cardExpiry && touched.cardExpiry && (
                              <span className="text-error">{errors.cardExpiry}</span>
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="cardCVV">CVV</label>
                            <Field
                              type="text"
                              name="cardCVV"
                              id="cardCVV"
                              className={`form-input ${
                                errors.cardCVV && touched.cardCVV ? 'input-error' : ''
                              }`}
                              placeholder="000"
                              maxLength={4}
                            />
                            {errors.cardCVV && touched.cardCVV && (
                              <span className="text-error">{errors.cardCVV}</span>
                            )}
                          </div>
                        </div>

                        <div className="test-card-info">
                          <p><strong>💡 Teste:</strong> Use o cartão 4242 4242 4242 4242</p>
                        </div>
                      </div>
                    )}

                    {/* Mensagem PIX */}
                    {values.paymentMethod === 'pix' && (
                      <div className="payment-method-info">
                        <p>Após confirmar, você receberá um QR Code para pagamento via PIX.</p>
                      </div>
                    )}

                    {/* Mensagem Boleto */}
                    {values.paymentMethod === 'boleto' && (
                      <div className="payment-method-info">
                        <p>Após confirmar, você poderá imprimir o boleto para pagamento.</p>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {processing ? (showSuccess ? '✓ Pagamento Aprovado!' : 'Processando pagamento...') : 'Finalizar Pagamento'}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>


          <div className="checkout-summary">
            <h2>Resumo do Pedido</h2>
            
            <div className="summary-items">
              {items.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-info">
                    <span className="summary-item-name">{item.name}</span>
                  </div>
                  <span className="summary-item-price">
                    R$ {item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total:</span>
              <span className="total-value">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

