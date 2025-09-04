document.addEventListener('DOMContentLoaded', function() {
    console.log('Web app loaded');

    const navbar = document.querySelector('.navbar-scroll');
    const indicators = document.querySelector('.carousel-indicators');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            indicators.classList.add('hidden');
        } else {
            navbar.classList.remove('scrolled');
            indicators.classList.remove('hidden');
        }
    });

    // 💲 Counter animation
    const counters = document.querySelectorAll('.price-counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100; // speed

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
})
