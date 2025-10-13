document.addEventListener('DOMContentLoaded', function() {
    console.log('Web app loaded');

    //======================= Navbar scroll effect=====================
    const navbar = document.querySelector('.navbar-scroll');
    const indicators = document.querySelector('.carousel-indicators');

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

    //=========================== Activities section (buttons) ===================
    const featureButtons = document.querySelectorAll('#activities .btn');
    const featureCards = document.querySelectorAll('#activities .activity-card');

    featureButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            featureButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');

            featureCards.forEach(card => {
                if (target === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = card.classList.contains(target) ? 'block' : 'none';
                }
            });
        });
    });
    
    //=========================== Activities-feature section (buttons + drag) ===================
    const featureFeatureButtons = document.querySelectorAll('#activities-feature .btn');
    const featureFeatureCards = document.querySelectorAll('#activities-feature .activity-card');
    const btnRow = document.querySelector('#activities-feature .filter-row');

    if (featureFeatureButtons.length && featureFeatureCards.length && btnRow) {
        // Button click with drag detection
        featureFeatureButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.dataset.dragged === "true") {
                    btn.dataset.dragged = "false"; // reset for next time
                    return; // ignore click if it was a drag
                }

                featureFeatureButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const target = btn.getAttribute('data-target');

                featureFeatureCards.forEach(card => {
                    if (target === 'all') card.style.display = 'block';
                    else card.style.display = card.classList.contains(target) ? 'block' : 'none';
                });
            });
        });

        // Grab & drag scroll
        let isDraggingBtn = false;
        let startXBtn = 0;
        let scrollStartBtn = 0;

        btnRow.addEventListener('pointerdown', e => {
            isDraggingBtn = true;
            startXBtn = e.clientX;
            scrollStartBtn = btnRow.scrollLeft;
        });

        btnRow.addEventListener('pointermove', e => {
            if (!isDraggingBtn) return;

            const walk = e.clientX - startXBtn;
            if (Math.abs(walk) > 5) {
                btnRow.scrollLeft = scrollStartBtn - walk * 2;
                featureFeatureButtons.forEach(b => b.dataset.dragged = "true");
            }
        });

        btnRow.addEventListener('pointerup', () => { isDraggingBtn = false; });
        btnRow.addEventListener('pointercancel', () => { isDraggingBtn = false; });
    }

    //=========================== Activities slider (drag) ===================
    const slider = document.getElementById("activities-slider");
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener("mousedown", (e) => {
            isDown = true;
            slider.classList.add("active");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener("mouseleave", () => {
            isDown = false;
            slider.classList.remove("active");
        });

        slider.addEventListener("mouseup", () => {
            isDown = false;
            slider.classList.remove("active");
        });

        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // scroll speed
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    //========================= Scroll Animation Logic =============================
    const scrollElements = document.querySelectorAll(
        'small, .search-form, .gallery-img-other, .gallery-img-center, .service-card, .feature-card, .right-content img, #activities-images img, .blog-card, #testimonial-section img'
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
    if (carousel) {
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

        function startCarousel() { interval = setInterval(slideCarousel, 3000); }
        function stopCarousel() { clearInterval(interval); }

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
    }

    //========================= FAQ Section JS =============================
    const faqItems = document.querySelectorAll('.faq-item, #faq .faq-question');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const title = item.querySelector('.faq-title') || item.querySelector('.faq-question');
        if (title && toggle) {
            title.addEventListener('click', () => {
                item.classList.toggle('active');
                toggle.textContent = item.classList.contains('active') ? '–' : '+';
            });
        }
    });

    //========================= Blog Pagination =============================
    const cardsWrapper = document.getElementById('left-cards-wrapper');
    if (cardsWrapper) {
        const allCards = Array.from(cardsWrapper.getElementsByClassName('blog-card'));
        const cardsPerPage = 5;
        const totalPages = Math.ceil(allCards.length / cardsPerPage);

        const paginationWrapper = document.getElementById('blog-pagination');
        if (paginationWrapper) {
            paginationWrapper.innerHTML = "";

            for (let i = 1; i <= totalPages; i++) {
                const li = document.createElement('li');
                li.className = "page-item";
                li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
                paginationWrapper.appendChild(li);
            }

            function showPage(page) {
                allCards.forEach((card, idx) => {
                    if (idx >= (page - 1) * cardsPerPage && idx < page * cardsPerPage) {
                        card.classList.add("active");
                    } else {
                        card.classList.remove("active");
                    }
                });
            }

            // Initial page
            showPage(1);

            // Pagination click
            paginationWrapper.querySelectorAll('.page-link').forEach(link => {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    const page = parseInt(link.dataset.page);
                    showPage(page);
                });
            });
        }
    }

});
