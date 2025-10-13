document.addEventListener('DOMContentLoaded', function() {
    console.log('Web app loaded');
    const navbar = document.querySelector('.navbar-scroll');
    const indicators = document.querySelector('.carousel-indicators');

    //======================= Navbar scroll effect=====================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
            indicators?.classList.add('hidden');
        } else {
            navbar?.classList.remove('scrolled');
            indicators?.classList.remove('hidden');
        }
    });

    //========================= Feature Section ==========================
    const priceCounters = document.querySelectorAll('.price-counter');
    priceCounters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    //======================== Adventure Section ======================
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });

    //=========================== Activities section (Home Page) ===================
    const featureButtons = document.querySelectorAll('#activities .btn');
    const featureCards = document.querySelectorAll('#activities .activity-card');

    featureButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            featureButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            let target = btn.getAttribute('data-target');

            featureCards.forEach(card => {
                if (target === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = card.classList.contains(target) ? 'block' : 'none';
                }
            });
        });
    });

    //========================= Scroll Animation Logic =============================
    const scrollElements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, small, .search-form, .gallery-img-other, .gallery-img-center, .service-card, .feature-card, .right-content img, #activities-images img, .blog-card, #testimonial-section img'
    );

    scrollElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        if (
            el.classList.contains('search-form') ||
            el.classList.contains('gallery-img-other') ||
            el.classList.contains('gallery-img-center') ||
            el.classList.contains('service-card') ||
            el.classList.contains('feature-card') ||
            el.classList.contains('blog-card') ||
            el.closest('.right-content') ||
            el.closest('#activities-images') ||
            el.closest('#testimonial-section')
        ) {
            el.classList.add('zoom-on-scroll');
        }

        if (el.tagName === 'H1') el.classList.add('fade-in');
        if (el.tagName === 'H2') el.classList.add('fade-in');
        if (el.tagName === 'H5') el.classList.add('fade-in');
        if (el.tagName === 'P') el.classList.add('fade-in');
        if (el.tagName === 'SMALL') el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => observer.observe(el));

    //========================= Testimonial carousel =============================
    const carousel = document.getElementById('testimonial-carousel');
    let offset = 0;
    const cardWidth = carousel.querySelector('.col-md-4').offsetWidth + 16; 
    let interval;
    let isPaused = false;

    function slideCarousel() {
        offset -= cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
            carousel.appendChild(carousel.firstElementChild);
            offset += cardWidth;
            carousel.style.transition = "none";
            carousel.style.transform = `translateX(${offset}px)`;
            carousel.offsetHeight; 
            carousel.style.transition = "transform 0.6s ease-in-out";
        }, 600);
    }

    function startCarousel() {
        interval = setInterval(slideCarousel, 3000);
    }

    function stopCarousel() {
        clearInterval(interval);
    }

    startCarousel();

    carousel.addEventListener("click", () => {
        if (!isPaused) {
            stopCarousel();
            isPaused = true;
            setTimeout(() => {
                startCarousel();
                isPaused = false;
            }, 5000);
        }
    }); 
});

//========================= FAQ Section JS =============================
const faqQuestions = document.querySelectorAll("#faq .faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
        const faqItem = question.parentElement;

        // Toggle active class
        faqItem.classList.toggle("active");

        // Toggle + / - sign
        const toggle = question.querySelector(".faq-toggle");
        toggle.textContent = faqItem.classList.contains("active") ? "–" : "+";
    });
});

