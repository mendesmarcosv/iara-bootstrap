// GameCard Component
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, GameController } from '@phosphor-icons/react';
import { Button } from '../atoms/Button';
import './GameCard.css';

interface GameCardProps {
  id: number;
  name: string;
  image: string | null;
  rating: number;
  released?: string;
  genres?: Array<{ id: number; name: string }>;
  onAddToCart?: () => void;
  isInCart?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  name,
  image,
  rating,
  released,
  genres,
  onAddToCart,
  isInCart = false,
}) => {
  // Preço simulado baseado no rating
  const price = Math.round((rating * 10 + 20) * 100) / 100;

  return (
    <div className="game-card">
      <Link to={`/game/${id}`} className="game-card-image-link">
        {image ? (
          <img src={image} alt={name} className="game-card-image" />
        ) : (
          <div className="game-card-placeholder">
            <GameController size={48} weight="fill" />
          </div>
        )}
      </Link>

      <div className="game-card-content">
        <Link to={`/game/${id}`} className="game-card-title">
          {name}
        </Link>

        {genres && genres.length > 0 && (
          <div className="game-card-genres">
            {genres.slice(0, 2).map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <div className="game-card-meta">
          <div className="game-card-rating">
            <Star size={16} weight="fill" className="rating-star" />
            <span>{rating.toFixed(1)}</span>
          </div>
          {released && (
            <span className="game-card-release">
              {new Date(released).getFullYear()}
            </span>
          )}
        </div>

        <div className="game-card-footer">
          <span className="game-card-price">R$ {price.toFixed(2)}</span>
          {onAddToCart && (
            <Button
              size="sm"
              onClick={onAddToCart}
              className="btn-add-cart"
              variant={isInCart ? 'danger' : 'primary'}
            >
              {isInCart ? 'Remover' : 'Adicionar'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
