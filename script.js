document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link:not(.nav-item.dropdown > .nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    const dropdownMenuLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const nav = document.querySelector('.nav');
                const menuToggle = document.querySelector('.menu-toggle');
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('active'));
            }
        });
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    const header = document.querySelector('.header');
    function updateHeader() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
        }
    }
    window.addEventListener('scroll', updateHeader);

    const animateElements = document.querySelectorAll('.stat-card, .step, .pricing-card, .testimonial-card, .blog-card, .faq-item');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
        if (animated) return;
        statNumbers.forEach(stat => {
            const staticText = stat.getAttribute('data-static');
            if (staticText) { stat.textContent = staticText; return; }
            const target = parseInt(stat.getAttribute('data-target') || stat.textContent);
            const suffix = stat.getAttribute('data-suffix') || '%';
            if (isNaN(target) || target <= 0) return;
            let current = 0;
            const increment = target / 50;
            const stepTime = 2000 / 50;
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, stepTime);
        });
        animated = true;
    }

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { animateCounters(); }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }
});
