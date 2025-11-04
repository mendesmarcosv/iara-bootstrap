// Game Details Page
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameController, Star } from '@phosphor-icons/react';
import { Container } from '../../components/Layout/Container';
import { Button } from '../../components/atoms/Button';
import { useGameDetails } from '../../hooks/useGames';
import { useCart } from '../../hooks/useCart';
import { useCartSounds } from '../../hooks/useCartSounds';
import './GameDetails.css';

export const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { game, loading, error } = useGameDetails(id);
  const { toggleItem, isInCart: checkInCart } = useCart();
  const { playSuccess, playRemove } = useCartSounds();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Carregando detalhes do jogo...</p>
      </div>
    );
  }

  if (error || !game) {
    return (
      <Container>
        <div className="error-message">
          {error || 'Jogo não encontrado'}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--sp-6)' }}>
          <Button onClick={() => navigate('/catalog')}>
            Voltar ao Catálogo
          </Button>
        </div>
      </Container>
    );
  }

  const price = Math.round((game.rating * 10 + 20) * 100) / 100;
  const inCart = checkInCart(game.id);

  const handleToggleCart = () => {
    const added = toggleItem({
      id: game.id,
      name: game.name,
      price,
      image: game.background_image,
    });

    if (added) {
      playSuccess();
    } else {
      playRemove();
    }
  };

  return (
    <div className="game-details-page">
      <Container>
        <button onClick={() => navigate('/catalog')} className="back-button">
          ← Voltar ao Catálogo
        </button>

        <div className="game-details">
          <div className="game-details-image">
            {game.background_image ? (
              <img src={game.background_image} alt={game.name} />
            ) : (
              <div className="image-placeholder">
                <GameController size={120} weight="fill" />
              </div>
            )}
          </div>

          <div className="game-details-info">
            <h1 className="game-title">{game.name}</h1>

            {game.genres && game.genres.length > 0 && (
              <div className="game-genres">
                {game.genres.map((genre) => (
                  <span key={genre.id} className="genre-badge">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="game-meta">
              {game.released && (
                <div className="meta-item">
                  <span className="meta-label">Lançamento:</span>
                  <span className="meta-value">
                    {new Date(game.released).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
              <div className="meta-item">
                <span className="meta-label">Avaliação:</span>
                <span className="meta-value rating-value">
                  <Star size={18} weight="fill" /> {game.rating.toFixed(1)} / 5
                </span>
              </div>
              {game.metacritic && (
                <div className="meta-item">
                  <span className="meta-label">Metacritic:</span>
                  <span className="meta-value">{game.metacritic}</span>
                </div>
              )}
              {game.playtime && (
                <div className="meta-item">
                  <span className="meta-label">Tempo médio:</span>
                  <span className="meta-value">{game.playtime}h</span>
                </div>
              )}
            </div>

            {game.platforms && game.platforms.length > 0 && (
              <div className="game-platforms">
                <h3>Plataformas:</h3>
                <div className="platforms-list">
                  {game.platforms.map((p) => (
                    <span key={p.platform.id} className="platform-tag">
                      {p.platform.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {game.description_raw && (
              <div className="game-description">
                <h3>Sobre o jogo:</h3>
                <p>{game.description_raw}</p>
              </div>
            )}

            {game.esrb_rating && (
              <div className="game-rating">
                <span className="rating-badge">{game.esrb_rating.name}</span>
              </div>
            )}

            <div className="game-purchase">
              <div className="price-section">
                <span className="price-label">Preço:</span>
                <span className="price-value">R$ {price.toFixed(2)}</span>
              </div>
              <Button 
                size="lg" 
                onClick={handleToggleCart}
                variant={inCart ? 'danger' : 'primary'}
              >
                {inCart ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}
              </Button>
            </div>
          </div>
        </div>

        {game.short_screenshots && game.short_screenshots.length > 0 && (
          <div className="game-screenshots">
            <h2>Capturas de Tela</h2>
            <div className="screenshots-grid">
              {game.short_screenshots.slice(0, 6).map((screenshot) => (
                <img
                  key={screenshot.id}
                  src={screenshot.image}
                  alt="Screenshot"
                  className="screenshot-image"
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

