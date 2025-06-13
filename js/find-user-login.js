function simulateLogin() {
  const loginBtn = document.getElementById("loginBtn");
  const loginText = document.querySelector(".login-text");
  const loadingSpinner = document.querySelector(".loading-spinner");
  const errorMessage = document.getElementById("errorMessage");

  // Mostrar loading
  loginBtn.disabled = true;
  loginText.classList.add("d-none");
  loadingSpinner.classList.remove("d-none");
  errorMessage.style.display = "none";

  setTimeout(function () {
    errorMessage.style.display = "block";

    loginBtn.disabled = false;
    loginText.classList.remove("d-none");
    loadingSpinner.classList.add("d-none");
  }, 2000);
}
