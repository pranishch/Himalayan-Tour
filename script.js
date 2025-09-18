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
    // Old counter
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
    // New counter
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

    //=========================== Activities section tabs logic ===================
    const activityButtons = document.querySelectorAll('#activities .btn');
    const activityImages = document.querySelectorAll('.activity-img');
    activityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activityButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            activityImages.forEach(img => {
                if (img.getAttribute('data-activity') === target) {
                    img.classList.remove('d-none');
                } else {
                    img.classList.add('d-none');
                }
            });
        });
    });

    //======================== Testimonial Carousel Custom Logic ==================
    const testimonialCarousel = document.querySelector('#testimonialCarousel');
    if (testimonialCarousel) {
      const carousel = new bootstrap.Carousel(testimonialCarousel, {
        interval: 3000,
        ride: carousel,
        wrap: true
      });
    }

    //========================= Scroll Animation Logic ============================= 
    //========================= Scroll Animation Logic ============================= 
    const scrollElements = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, p, small, .search-form, .gallery-img-other, .gallery-img-center, .service-card, .feature-card, .right-content img, #activities-images img, .blog-card, #testimonial-section img'
    );

    // Add base class and specific animations
    scrollElements.forEach(el => {
        el.classList.add('animate-on-scroll');

        if(
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

        // Slide animations for headings and fade for paragraphs
        if(el.tagName === 'H1') el.classList.add('slide-left');
        if(el.tagName === 'H2') el.classList.add('slide-left');
        if(el.tagName === 'H5') el.classList.add('slide-right');
        if(el.tagName === 'P') el.classList.add('fade-in');
        if(el.tagName === 'SMALL') el.classList.add('fade-in');
    });

    // IntersectionObserver setup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.1 });

    // Observe all scroll elements
    scrollElements.forEach(el => observer.observe(el));

    // testimonial carousel
    const carousel = document.getElementById('testimonial-carousel');
    let offset = 0;
    const cardWidth = carousel.querySelector('.col-md-4').offsetWidth + 16; // card width + margin

    let interval; 
    let isPaused = false;

    // function to move carousel
    function slideCarousel() {
    offset -= cardWidth;
    carousel.style.transform = `translateX(${offset}px)`;

    setTimeout(() => {
        carousel.appendChild(carousel.firstElementChild);
        offset += cardWidth;
        carousel.style.transition = "none"; // disable transition for jump
        carousel.style.transform = `translateX(${offset}px)`;
        // force reflow
        carousel.offsetHeight;
        carousel.style.transition = "transform 0.6s ease-in-out"; // re-enable transition
    }, 600);
    }

    // start auto sliding
    function startCarousel() {
    interval = setInterval(slideCarousel, 3000);
    }

    // stop auto sliding
    function stopCarousel() {
    clearInterval(interval);
    }

    // start initially
    startCarousel();

    // click to pause and resume
    carousel.addEventListener("click", () => {
    if (!isPaused) {
        // pause on click
        stopCarousel();
        isPaused = true;

        // resume after 5 seconds
        setTimeout(() => {
        startCarousel();
        isPaused = false;
        }, 5000);
    }
    });
});
