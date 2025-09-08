document.addEventListener('DOMContentLoaded', function() {
    console.log('Web app loaded');

    const navbar = document.querySelector('.navbar-scroll');
    const indicators = document.querySelector('.carousel-indicators');

    // 🟠 Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
            indicators?.classList.add('hidden');
        } else {
            navbar?.classList.remove('scrolled');
            indicators?.classList.remove('hidden');
        }
    });

    // 🟠 Old counter (for .price-counter)
    const priceCounters = document.querySelectorAll('.price-counter');
    priceCounters.forEach(counter => {
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

    // 🟠 New counter (for .counter-number, plain numbers only)
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200; // adjust speed

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
    // 🟠 Activities section logic
    const activityButtons = document.querySelectorAll('#activities .btn');
    const activityImages = document.querySelectorAll('.activity-img');

    activityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            activityButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.getAttribute('data-target');

            // Show/hide images based on selected activity
            activityImages.forEach(img => {
                if (img.getAttribute('data-activity') === target) {
                    img.classList.remove('d-none');
                } else {
                    img.classList.add('d-none');
                }
            });
        });
    });
});
