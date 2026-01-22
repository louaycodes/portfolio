document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('tech-search');
    const techCards = document.querySelectorAll('.tech-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            techCards.forEach(card => {
                const techName = card.getAttribute('data-name').toLowerCase();
                if (techName.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
