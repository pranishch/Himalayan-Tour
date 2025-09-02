document.addEventListener('DOMContentLoaded', function() {
    console.log('Web app loaded');

    const navbar = document.querySelector('.navbar-scroll');
    const indicators = document.querySelector('.carousel-indicators');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            indicators.classList.add('hidden');
        } else {
            navbar.classList.remove('scrolled');
            indicators.classList.remove('hidden');
        }
    });
});
