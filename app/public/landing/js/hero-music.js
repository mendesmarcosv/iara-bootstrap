document.addEventListener("DOMContentLoaded", function() {
  const heroCards = document.querySelectorAll('.hero-card');
  let currentlyPlaying = null; // Controla qual áudio está tocando

  // Mapeamento dos cards para os arquivos de áudio
  const cardAudioMap = {
    'yellow': 'assets/sounds/luigi.mp3',
    'green': 'assets/sounds/sonic.mp3', 
    'blue': 'assets/sounds/mario.mp3'
  };

  heroCards.forEach(card => {
    // Identifica o tipo do card (yellow, green, blue)
    const cardType = Array.from(card.classList).find(cls => 
      ['yellow', 'green', 'blue'].includes(cls)
    );
    
    if (!cardType || !cardAudioMap[cardType]) return;

    // Cria o elemento de áudio
    const audio = new Audio(cardAudioMap[cardType]);
    audio.volume = 0.7; // Volume moderado

    // Cria o botão de play
    const playButton = document.createElement('button');
    playButton.className = 'hero-card-play-btn';
    playButton.innerHTML = '<i class="ph ph-play"></i>';
    playButton.setAttribute('aria-label', 'Reproduzir música');
    
    // Adiciona o botão ao card
    card.appendChild(playButton);

    // Estado do botão
    let isPlaying = false;

    // Função para atualizar o ícone do botão
    const updateButtonIcon = () => {
      const icon = playButton.querySelector('i');
      if (isPlaying) {
        icon.className = 'ph ph-pause';
        playButton.setAttribute('aria-label', 'Pausar música');
      } else {
        icon.className = 'ph ph-play';
        playButton.setAttribute('aria-label', 'Reproduzir música');
      }
    };

    // Função para parar outros áudios
    const stopOtherAudios = () => {
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        
        // Atualiza o botão do áudio que foi parado
        const otherCard = document.querySelector(`[data-audio-playing="true"]`);
        if (otherCard) {
          const otherButton = otherCard.querySelector('.hero-card-play-btn i');
          if (otherButton) {
            otherButton.className = 'ph ph-play';
            otherCard.removeAttribute('data-audio-playing');
          }
        }
      }
    };

    // Event listeners
    playButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isPlaying) {
        // Para a música
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
        currentlyPlaying = null;
        card.removeAttribute('data-audio-playing');
      } else {
        // Para outros áudios primeiro
        stopOtherAudios();
        
        // Inicia a música
        audio.play().catch(error => {
          console.log('Erro ao reproduzir áudio:', error);
        });
        isPlaying = true;
        currentlyPlaying = audio;
        card.setAttribute('data-audio-playing', 'true');
      }
      
      updateButtonIcon();
    });

    // Event listeners para quando o áudio termina (caso não seja loop)
    audio.addEventListener('ended', () => {
      isPlaying = false;
      currentlyPlaying = null;
      card.removeAttribute('data-audio-playing');
      updateButtonIcon();
    });

    // Mostra/esconde o botão no hover
    card.addEventListener('mouseenter', () => {
      playButton.style.opacity = '1';
      playButton.style.pointerEvents = 'auto';
    });

    card.addEventListener('mouseleave', () => {
      playButton.style.opacity = '0';
      playButton.style.pointerEvents = 'none';
    });
  });
}); 