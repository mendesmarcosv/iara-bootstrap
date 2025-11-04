// Routes Configuration
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import { RouteGuard } from '../components/RouteGuard';

// Pages
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { Catalog } from '../pages/Catalog';
import { GameDetails } from '../pages/Catalog/GameDetails';
import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { Success } from '../pages/Success';
import { Cancel } from '../pages/Cancel';
import { Orders } from '../pages/Orders';
import { BoletoPayment } from '../pages/Payment/BoletoPayment';
import { PixPayment } from '../pages/Payment/PixPayment';

// Redirect to Landing Page
const RedirectToLanding: React.FC = () => {
  useEffect(() => {
    // Em produção, redireciona para a página principal (index.html na raiz)
    // Em desenvolvimento, usa localhost:8000
    const landingUrl = process.env.NODE_ENV === 'production' 
      ? '/index.html'
      : 'http://localhost:8000';
    window.location.href = landingUrl;
  }, []);
  return <div>Redirecionando...</div>;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Redirect Home to Landing */}
        <Route path="/" element={<RedirectToLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* Protected Routes */}
        <Route
          path="/checkout"
          element={
            <RouteGuard>
              <Checkout />
            </RouteGuard>
          }
        />
        <Route
          path="/payment/boleto"
          element={
            <RouteGuard>
              <BoletoPayment />
            </RouteGuard>
          }
        />
        <Route
          path="/payment/pix"
          element={
            <RouteGuard>
              <PixPayment />
            </RouteGuard>
          }
        />
        <Route
          path="/orders"
          element={
            <RouteGuard>
              <Orders />
            </RouteGuard>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

