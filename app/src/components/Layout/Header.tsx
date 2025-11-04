// Header Component - Com Menu Hamburguer Mobile
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ShoppingCart, List, X, Package, GameController } from '@phosphor-icons/react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Atualizar contador do carrinho (jogos digitais - sem quantidade)
  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('iara_cart');
      if (cart) {
        const items = JSON.parse(cart);
        setCartCount(items.length); // Número de jogos diferentes
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Fechar menu ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll quando menu aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="nav-bar" role="navigation" aria-label="Navegação principal">
      <div className="padding-global">
        <div className="nav-container">
          <div className="nav-wrapper">
            {/* Logo Esquerda */}
            <div className="nav-logo-wrapper">
              <a href="http://localhost:8000" aria-label="Página inicial da Iara Games">
                <svg
                  className="nav-brand-logo"
                  viewBox="0 0 132 132"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  aria-label="Iara Games"
                >
                  <path
                    d="M102.11 0H29.89C13.3822 0 0 13.3822 0 29.89V102.11C0 118.618 13.3822 132 29.89 132H102.11C118.618 132 132 118.618 132 102.11V29.89C132 13.3822 118.618 0 102.11 0Z"
                    fill="#CCFE2D"
                  />
                  <path
                    d="M80.83 47.6299L75.73 93.1199C75.64 93.9299 76.35 94.5999 77.15 94.4599L89.15 92.4299C90.18 92.2599 90.95 93.3799 90.4 94.2699L82 108.16C81.85 108.4 81.63 108.58 81.36 108.68L59.91 116.35C59.51 116.49 59.06 116.42 58.73 116.15L52.97 111.55C52.78 111.4 52.65 111.2 52.57 110.98L52.55 110.91C52.5 110.74 52.48 110.57 52.5 110.4L57.14 66.7799C57.23 65.9499 56.48 65.2799 55.67 65.4499L43 68.1299C41.95 68.3499 41.14 67.2099 41.7 66.2899L47.99 56.0799C48.15 55.8299 48.39 55.6399 48.68 55.5499L79.25 46.3199C80.09 46.0699 80.92 46.7599 80.82 47.6299H80.83Z"
                    fill="black"
                  />
                  <path
                    d="M70.99 40.68L59.59 43.73C59.16 43.84 58.71 43.73 58.4 43.41L50.18 35.05C49.83 34.69 49.73 34.15 49.94 33.69L53.41 26C53.56 25.66 53.85 25.42 54.21 25.32L71.4 20.72C71.6 20.67 71.82 20.66 72.02 20.72C72.25 20.78 72.46 20.9 72.62 21.08L76.69 25.54C77 25.88 77.1 26.38 76.93 26.81L71.83 39.96C71.69 40.32 71.38 40.6 71 40.7L70.99 40.68Z"
                    fill="black"
                  />
                </svg>
              </a>
            </div>

            {/* Desktop - Right Section */}
            <div className="nav-right-section desktop-only">
              {/* Utility Icons */}
              <div className="nav-utility-wrapper">
                <Link to="/catalog" className="game-store-link">
                  Game Store
                </Link>
                {isAuthenticated && (
                  <Link to="/orders" className="game-store-link">
                    Meus Pedidos
                  </Link>
                )}
                <button
                  className="nav-utility-link"
                  aria-label="Notificações"
                  onClick={(e) => e.preventDefault()}
                >
                  <Bell size={24} weight="fill" />
                </button>
                <Link
                  to="/cart"
                  className="nav-utility-link cart-link"
                  aria-label="Carrinho de compras"
                >
                  <ShoppingCart size={24} weight="fill" />
                  {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
                </Link>
              </div>

              {/* User Profile / Auth */}
              {isAuthenticated ? (
                <div className="nav-user-section">
                  <img
                    className="nav-user-profile-photo"
                    src="/foto-perfil.webp"
                    alt="Foto de perfil do usuário"
                  />
                  <button onClick={handleLogout} className="logout-btn">
                    Sair
                  </button>
                </div>
              ) : (
                <div className="nav-auth-buttons">
                  <Link to="/login" className="nav-auth-btn">
                    Login
                  </Link>
                  <Link to="/register" className="nav-auth-btn nav-auth-btn-primary">
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile - Hamburguer */}
            <button 
              className="hamburger-btn mobile-only"
              onClick={toggleMenu}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={28} weight="bold" />
              ) : (
                <List size={28} weight="bold" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {/* User Profile */}
            {isAuthenticated && (
              <div className="mobile-menu-user">
                <img
                  className="mobile-user-photo"
                  src="/foto-perfil.webp"
                  alt="Foto de perfil"
                />
                <span className="mobile-user-email">Bem-vindo!</span>
              </div>
            )}

            {/* Menu Items */}
            <div className="mobile-menu-items">
              <button
                className="mobile-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                }}
              >
                <Bell size={24} weight="fill" />
                <span>Notificações</span>
              </button>

              <Link
                to="/cart"
                className="mobile-menu-item"
                onClick={closeMenu}
              >
                <ShoppingCart size={24} weight="fill" />
                <span>Carrinho</span>
                {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
              </Link>

              <Link
                to="/catalog"
                className="mobile-menu-item"
                onClick={closeMenu}
              >
                <GameController size={24} weight="fill" />
                <span>Catálogo de Jogos</span>
              </Link>

              {isAuthenticated && (
                <Link
                  to="/orders"
                  className="mobile-menu-item"
                  onClick={closeMenu}
                >
                  <Package size={24} weight="fill" />
                  <span>Meus Pedidos</span>
                </Link>
              )}
            </div>

            {/* Auth Actions */}
            <div className="mobile-menu-footer">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="mobile-logout-btn">
                  Sair da Conta
                </button>
              ) : (
                <>
                  <Link to="/login" className="mobile-auth-btn" onClick={closeMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="mobile-auth-btn mobile-auth-btn-primary" onClick={closeMenu}>
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
