document
  .querySelector(".cadastro-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    let isValid = true;

    // Validar nome
    const nameInput = document.getElementById("name");
    if (!nameInput.value.trim()) {
      document.getElementById("name-error").textContent =
        "Por favor, digite seu nome completo";
      isValid = false;
    }

    // Validar email
    const emailInput = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      document.getElementById("email-error").textContent =
        "Por favor, digite um e-mail válido";
      isValid = false;
    }

    // Validar senha
    const passwordInput = document.getElementById("password");
    if (passwordInput.value.length < 8) {
      document.getElementById("password-error").textContent =
        "A senha deve ter pelo menos 8 caracteres";
      isValid = false;
    }

    // Validar confirmação de senha
    const confirmPasswordInput = document.getElementById("confirm-password");
    if (confirmPasswordInput.value !== passwordInput.value) {
      document.getElementById("confirm-password-error").textContent =
        "As senhas não coincidem";
      isValid = false;
    }

    // Validar data de nascimento
    const birthdateInput = document.getElementById("birthdate");
    if (!birthdateInput.value) {
      document.getElementById("birthdate-error").textContent =
        "Por favor, selecione sua data de nascimento";
      isValid = false;
    }

    // Validar termos
    const termsInput = document.getElementById("terms");
    if (!termsInput.checked) {
      document.getElementById("terms-error").textContent =
        "Você precisa concordar com os termos para continuar";
      isValid = false;
    }

    if (isValid) {
      // Aqui você pode adicionar a lógica de submissão do formulário
      console.log("Formulário válido, enviando...");
    }

    form.classList.add("was-validated");
  });
