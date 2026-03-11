function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

function setLang(lang) {
  localStorage.setItem('language', lang);
  toggleLangMenu();
  // Reload page or trigger translation
  location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
  // Close language menu when clicking outside
  document.addEventListener('click', function(e) {
    const menu = document.getElementById('langMenu');
    const btn = document.querySelector('[aria-label="Choose country / language"]');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
});
