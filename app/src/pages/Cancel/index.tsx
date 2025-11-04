// Cancel Page
import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from '@phosphor-icons/react';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import './Cancel.css';

export const Cancel: React.FC = () => {
  return (
    <div className="cancel-page">
      <Container maxWidth="md">
        <div className="cancel-card">
          <div className="cancel-icon">
            <XCircle size={64} weight="fill" />
          </div>
          
          <h1 className="cancel-title">Pagamento Cancelado</h1>
          
          <p className="cancel-message">
            Você cancelou o processo de pagamento. Não se preocupe, seus itens
            ainda estão no carrinho se você quiser tentar novamente.
          </p>

          <div className="cancel-info">
            <h3>O que aconteceu?</h3>
            <ul>
              <li>Nenhum valor foi cobrado</li>
              <li>Seus itens continuam no carrinho</li>
              <li>Você pode tentar novamente a qualquer momento</li>
            </ul>
          </div>

          <div className="cancel-actions">
            <Link to="/cart">
              <Button size="lg" fullWidth>
                Voltar ao Carrinho
              </Button>
            </Link>
            <Link to="/catalog">
              <Button size="lg" fullWidth variant="outline">
                Continuar Comprando
              </Button>
            </Link>
            <Link to="/" className="back-home">
              Voltar para Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

