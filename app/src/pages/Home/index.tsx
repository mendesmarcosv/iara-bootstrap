// Home Page
import React from 'react';
import { Link } from 'react-router-dom';
import { GameController, CurrencyDollar, Lightning } from '@phosphor-icons/react';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Container>
        <div className="home-hero">
          <h1 className="home-title">
            Bem-vindo à <span className="highlight">Iara Games</span>
          </h1>
          <p className="home-subtitle">
            Descubra os melhores jogos indie e AAA em um só lugar.
            Preços acessíveis e uma biblioteca gigantesca te esperam!
          </p>
          <div className="home-cta">
            <Link to="/catalog">
              <Button size="lg">Explorar Catálogo</Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline">
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>

        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">
              <GameController size={64} weight="fill" />
            </div>
            <h3>Milhares de Jogos</h3>
            <p>Acesso a uma biblioteca extensa de jogos de todos os gêneros</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <CurrencyDollar size={64} weight="fill" />
            </div>
            <h3>Preços Acessíveis</h3>
            <p>Os melhores preços do mercado para você economizar</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Lightning size={64} weight="fill" />
            </div>
            <h3>Entrega Instantânea</h3>
            <p>Compre e jogue imediatamente, sem espera</p>
          </div>
        </div>
      </Container>
    </div>
  );
};
