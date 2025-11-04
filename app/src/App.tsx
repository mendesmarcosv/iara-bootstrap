// Main App Component
import React from 'react';
import { Providers } from './app/providers';
import { AppRoutes } from './app/routes';
import './styles/globals.css';

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
