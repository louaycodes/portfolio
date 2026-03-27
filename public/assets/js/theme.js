const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to saved value
// If no saved preference, check system preference, otherwise default to dark (no class/attribute needed for default dark)
const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    body.setAttribute('data-theme', 'light');
    updateIcon(true);
} else {
    body.removeAttribute('data-theme');
    updateIcon(false);
}

themeToggle.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';

    if (isLight) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        updateIcon(false);
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateIcon(true);
    }
});

function updateIcon(isLight) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (isLight) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}
