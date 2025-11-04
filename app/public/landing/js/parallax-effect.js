document.addEventListener("DOMContentLoaded", function() {
  const group1 = document.querySelector('.group1-image');
  const group2 = document.querySelector('.group2-image');

  if (group1 && group2) {
    window.addEventListener('scroll', function() {
      let scrollY = window.scrollY;

      const factor1 = -0.1; // Move para cima
      const factor2 = 0.1;  // Move para baixo

      window.requestAnimationFrame(() => {
        group1.style.transform = `translate(15%, -30%) translateY(${scrollY * factor1}px)`;
        group2.style.transform = `translate(-15%, 15%) translateY(${scrollY * factor2}px)`;
      });
    });
  }
}); 