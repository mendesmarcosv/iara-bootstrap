// Hook para sons do carrinho
import { useCallback } from 'react';

export const useCartSounds = () => {
  const playSuccess = useCallback(() => {
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.6;
    audio.play().catch((error) => {
      console.log('Erro ao reproduzir som:', error);
    });
  }, []);

  const playRemove = useCallback(() => {
    // Som de remoção (opcional)
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.3;
    audio.play().catch((error) => {
      console.log('Erro ao reproduzir som:', error);
    });
  }, []);

  return { playSuccess, playRemove };
};

