// Cart Page - Jogos Digitais (sem quantidade)
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, GameController, Trash } from '@phosphor-icons/react';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import { useCart } from '../../hooks/useCart';
import { useCartSounds } from '../../hooks/useCartSounds';
import { useAuth } from '../../contexts/AuthContext';
import './Cart.css';

export const Cart: React.FC = () => {
  const { items, loading, removeItem, clearCart, subtotal, total } = useCart();
  const { playRemove } = useCartSounds();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <Container>
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingCart size={120} weight="fill" />
            </div>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione jogos ao carrinho para continuar</p>
            <Link to="/catalog">
              <Button size="lg">Explorar Catálogo</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const handleRemoveItem = (id: number) => {
    removeItem(id);
    playRemove();
  };

  return (
    <div className="cart-page">
      <Container>
        <div className="cart-header">
          <h1>Carrinho de Compras</h1>
          <button onClick={clearCart} className="clear-cart-btn">
            Limpar Carrinho
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="image-placeholder">
                      <GameController size={32} weight="fill" />
                    </div>
                  )}
                </div>

                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-item-btn"
                  aria-label="Remover item"
                >
                  <Trash size={20} weight="fill" color="currentColor" />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            
            <div className="summary-row">
              <span>Subtotal ({items.length} {items.length === 1 ? 'jogo' : 'jogos'}):</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Desconto:</span>
              <span className="discount">R$ 0,00</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>

            {isAuthenticated ? (
              <Link to="/checkout" className="checkout-link">
                <Button size="lg" fullWidth>
                  Finalizar Compra
                </Button>
              </Link>
            ) : (
              <Link to="/login?redirect=checkout" className="checkout-link">
                <Button size="lg" fullWidth>
                  Fazer Login para Comprar
                </Button>
              </Link>
            )}

            <Link to="/catalog" className="continue-shopping">
              ← Continuar Comprando
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
