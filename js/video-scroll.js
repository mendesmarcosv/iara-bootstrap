document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("hero-video-bg");
  const playPauseBtn = document.getElementById("video-play-pause");
  const muteUnmuteBtn = document.getElementById("video-mute-unmute");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const muteIcon = document.getElementById("mute-icon");
  const unmuteIcon = document.getElementById("unmute-icon");

  if (video) {
    // Inicia o vídeo pausado para garantir que o script controle a reprodução
    video.pause();

    window.addEventListener("scroll", () => {
      // Divisor menor para maior sensibilidade
      const scrollSpeedFactor = window.pageYOffset / 500; 
      // Multiplicador maior para maior aceleração
      let newPlaybackRate = 1 + scrollSpeedFactor * 4;

      if (newPlaybackRate > 8) { // Aumentei o limite máximo
        newPlaybackRate = 8;
      }
      video.playbackRate = newPlaybackRate;
      video.play(); // Garante que o vídeo toque ao rolar
    });

    // Reset da velocidade ao voltar para o topo
    window.addEventListener('scroll', () => {
      if (window.pageYOffset === 0 && !video.paused) {
        video.playbackRate = 1;
      }
    });

    // --- Controles de Play/Pause ---
    playPauseBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      } else {
        video.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      }
    });

    // --- Controles de Som ---
    muteUnmuteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      if (video.muted) {
        muteIcon.style.display = "block";
        unmuteIcon.style.display = "none";
      } else {
        muteIcon.style.display = "none";
        unmuteIcon.style.display = "block";
      }
    });
  }
}); 