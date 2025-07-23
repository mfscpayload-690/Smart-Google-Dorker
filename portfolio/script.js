// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
navMenu.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => navMenu.classList.add('hidden'))
);

// Dynamic footer year
document.getElementById('year').textContent = new Date().getFullYear();