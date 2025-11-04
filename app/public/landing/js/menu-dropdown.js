// Dropdown simples para menu do usuário (apenas pelo ícone de perfil)

const userProfileTrigger = document.getElementById('user-profile-trigger');
const dropdownMenu = document.getElementById('user-dropdown-menu');

function toggleDropdown() {
  const isOpen = dropdownMenu.style.display === 'block';
  dropdownMenu.style.display = isOpen ? 'none' : 'block';
}

function closeDropdown() {
  dropdownMenu.style.display = 'none';
}

userProfileTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.addEventListener('click', (e) => {
  if (
    !userProfileTrigger.contains(e.target) &&
    !dropdownMenu.contains(e.target)
  ) {
    closeDropdown();
  }
});

// Acessibilidade: fecha com ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDropdown();
  }
});