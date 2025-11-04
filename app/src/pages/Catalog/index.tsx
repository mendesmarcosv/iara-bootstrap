// Catalog Page
import React, { useState, useEffect } from 'react';
import { Container } from '../../components/Layout/Container';
import { GameCard } from '../../components/molecules/GameCard';
import { Button } from '../../components/atoms/Button';
import { useGames } from '../../hooks/useGames';
import { useCart } from '../../hooks/useCart';
import { useCartSounds } from '../../hooks/useCartSounds';
import './Catalog.css';

export const Catalog: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [ordering, setOrdering] = useState('-rating');
  const { games, loading, error, page, hasMore, nextPage, prevPage, goToPage } = useGames({
    search: searchTerm,
    ordering,
    page_size: 20,
  });
  const { toggleItem, isInCart } = useCart();
  const { playSuccess, playRemove } = useCartSounds();
  const [toastMessage, setToastMessage] = useState('');

  // Debounce: atualiza searchTerm após 500ms de pausa na digitação
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Resetar página quando o termo de busca mudar
  useEffect(() => {
    if (page !== 1) {
      goToPage(1);
    }
  }, [searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = (game: any) => {
    const price = Math.round((game.rating * 10 + 20) * 100) / 100;
    
    const added = toggleItem({
      id: game.id,
      name: game.name,
      price,
      image: game.background_image,
    });

    if (added) {
      playSuccess();
      setToastMessage('✓ Jogo adicionado ao carrinho!');
    } else {
      playRemove();
      setToastMessage('Jogo removido do carrinho');
    }

    setTimeout(() => setToastMessage(''), 2000);
  };

  return (
    <div className="catalog-page">
      <Container>
        <div className="catalog-header">
          <h1 className="catalog-title">Catálogo de Jogos</h1>
          <p className="catalog-subtitle">
            Explore nossa biblioteca com milhares de jogos
          </p>
        </div>

        <div className="catalog-filters">
          <div className="search-form">
            <input
              type="search"
              placeholder="Buscar jogos..."
              className="search-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="ordering">Ordenar por:</label>
            <select
              id="ordering"
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              className="filter-select"
            >
              <option value="-rating">Melhor Avaliação</option>
              <option value="-released">Mais Recentes</option>
              <option value="name">Nome (A-Z)</option>
              <option value="-name">Nome (Z-A)</option>
              <option value="-added">Mais Populares</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner" />
            <p>Carregando jogos...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && games.length === 0 && (
          <div className="empty-state">
            <p>Nenhum jogo encontrado. Tente uma busca diferente.</p>
          </div>
        )}

        {!loading && !error && games.length > 0 && (
          <>
            <div className="games-grid">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  image={game.background_image}
                  rating={game.rating}
                  released={game.released}
                  genres={game.genres}
                  isInCart={isInCart(game.id)}
                  onAddToCart={() => handleAddToCart(game)}
                />
              ))}
            </div>

            <div className="pagination">
              <Button
                onClick={prevPage}
                disabled={page === 1}
                variant="outline"
              >
                Anterior
              </Button>
              <span className="page-indicator">Página {page}</span>
              <Button
                onClick={nextPage}
                disabled={!hasMore}
                variant="outline"
              >
                Próxima
              </Button>
            </div>
          </>
        )}

        {toastMessage && (
          <div className="toast-notification">
            {toastMessage}
          </div>
        )}
      </Container>
    </div>
  );
};
