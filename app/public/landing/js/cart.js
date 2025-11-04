document.addEventListener("DOMContentLoaded", () => {
  // Resetar o carrinho no carregamento da página para fins de teste
  localStorage.removeItem("cart");

  // --- Seletores ---
  const promoAddToCartBtn = document.getElementById("add-to-cart-btn");
  const buyOption = document.getElementById("buy-option");
  const igPlayOption = document.getElementById("ig-play-option");
  const promoErrorMessage = document.getElementById("promo-error-message");
  const indieAddToCartButtons = document.querySelectorAll(
    ".add-to-cart-indie-btn"
  );
  const floatingCartBtn = document.getElementById("floating-cart-btn");
  const floatingCartCounter = document.getElementById("floating-cart-counter");
  const navCartCounter = document.getElementById("nav-cart-counter");
  const toastContainer = document.getElementById("toast-container");

  // --- Funções do Carrinho ---
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

  // --- Funções de UI ---

  const showToast = (message, type) => {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-notification ${type}`;

    let iconHtml = '';
    if (type === 'success') {
      iconHtml = '<i class="ph ph-thumbs-up"></i>';
    } else if (type === 'removed') {
      iconHtml = '<i class="ph ph-smiley-sad"></i>';
    }

    toast.innerHTML = `${iconHtml} ${message}`;
    toastContainer.appendChild(toast);

    // Remove o toast após a animação de saída
    setTimeout(() => {
      toast.remove();
    }, 3000); // Duração total da animação (in + permanência + out)
  };

  const updateCartCounter = () => {
    const cart = getCart();
    const cartCount = cart.length;
    const isVisible = cartCount > 0;

    // Botão Flutuante
    if (isVisible) {
      floatingCartCounter.textContent = cartCount;
      floatingCartCounter.style.display = "flex";
      floatingCartBtn.classList.add("visible");
    } else {
      floatingCartCounter.style.display = "none";
      floatingCartBtn.classList.remove("visible");
    }

    // Contador do Menu de Navegação
    if (navCartCounter) {
      if (isVisible) {
        navCartCounter.textContent = cartCount;
        navCartCounter.style.display = "flex";
      } else {
        navCartCounter.style.display = "none";
      }
    }
  };

  const updateButtonState = (button, gameId) => {
    const cart = getCart();
    const isInCart = cart.some((item) => item.id === gameId);

    // Define os textos com base no tipo de botão
    let addText = "Adicionar ao carrinho";
    const removeText = "Remover do carrinho";

    if (button.id === "add-to-cart-btn") {
      addText = `ADICIONAR AGORA <img src="./assets/line.png" alt="" aria-hidden="true" />`;
    }

    button.innerHTML = isInCart ? removeText : addText;
  };

  // --- Lógica Principal ---
  const toggleCartItem = (game, button) => {
    let cart = getCart();
    const gameIndex = cart.findIndex((item) => item.id === game.id);

    if (gameIndex > -1) {
      // Remove o item do carrinho
      cart.splice(gameIndex, 1);
      showToast("Jogo removido do carrinho!", "removed");
    } else {
      // Adiciona o item ao carrinho
      cart.push(game);
      showToast("Jogo adicionado com sucesso!", "success");
      
      // Reproduz som de sucesso
      if (window.cartSounds && window.cartSounds.playSuccess) {
        window.cartSounds.playSuccess();
      }
    }

    saveCart(cart);
    updateCartCounter();
    updateButtonState(button, game.id); // Atualiza o texto do botão imediatamente
  };

  // --- Inicialização ---
  const initializePage = () => {
    // Botão da promoção
    if (promoAddToCartBtn) {
      updateButtonState(promoAddToCartBtn, "ac-origins");
      promoAddToCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        promoErrorMessage.style.display = "none";

        if (promoAddToCartBtn.textContent.trim() === "Remover do carrinho") {
          const game = { id: "ac-origins" };
          toggleCartItem(game, promoAddToCartBtn);
          return;
        }

        if (buyOption.checked) {
          const game = {
            id: "ac-origins",
            name: "Assassins Creed Origins",
            price: 69.98,
          };
          toggleCartItem(game, promoAddToCartBtn);
        } else if (igPlayOption.checked) {
          window.location.href = "login.html";
        } else {
          promoErrorMessage.style.display = "block";
        }
      });
    }

    // Botões dos jogos indie
    indieAddToCartButtons.forEach((btn) => {
      const gameId = btn.dataset.gameId;
      updateButtonState(btn, gameId);

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const game = {
          id: gameId,
          name: btn.dataset.gameName,
          price: parseFloat(btn.dataset.gamePrice),
        };
        toggleCartItem(game, btn);
      });
    });

    updateCartCounter();
  };

  initializePage();
}); 