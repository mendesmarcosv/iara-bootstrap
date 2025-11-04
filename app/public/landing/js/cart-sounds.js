document.addEventListener("DOMContentLoaded", function() {
  // Cria os elementos de áudio para os sons do carrinho
  const successSound = new Audio('assets/sounds/success.mp3');
  successSound.volume = 0.6; // Volume moderado

  // Função para reproduzir som de sucesso
  const playSuccessSound = () => {
    successSound.currentTime = 0; // Reinicia o som se já estiver tocando
    successSound.play().catch(error => {
      console.log('Erro ao reproduzir som de sucesso:', error);
    });
  };

  // Função para reproduzir som de remoção (se quiser adicionar futuramente)
  const playRemoveSound = () => {
    // Pode ser implementado futuramente se houver um som para remoção
  };

  // Disponibiliza as funções globalmente para serem usadas pelo cart.js
  window.cartSounds = {
    playSuccess: playSuccessSound,
    playRemove: playRemoveSound
  };
}); 