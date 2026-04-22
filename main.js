// ================= HEADER =================

const searchBtn = document.querySelector('.search-btn');
const menuBtn = document.querySelector('.menu-btn');

const searchBar = document.querySelector('.search-bar');
const overlay = document.querySelector('.search-overlay');
const menu = document.querySelector('.menu-overlay');
const searchInput = searchBar?.querySelector('input');
const searchSubmitBtn = searchBar?.querySelector('button');
const routeCtaLink = document.querySelector('.auto-btn');
const routePreviewCards = document.querySelectorAll('.auto-card');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const routesPage = 'avto.html';
const routeSearchQuery = new URLSearchParams(window.location.search).get('q')?.trim() || '';

function closeSearch() {
    if (!searchBar) return;

    searchBar.classList.remove('active');
    searchBtn?.setAttribute('aria-expanded', false);
    searchBar.setAttribute('aria-hidden', true);
    overlay?.classList.remove('active');
}

function closeMenu() {
    if (!menu) return;

    menu.classList.remove('active');
    menuBtn?.setAttribute('aria-expanded', false);
    menu.setAttribute('aria-hidden', true);
}

function goToRoutesPage() {
    const query = searchInput?.value.trim();
    const targetUrl = query
        ? routesPage + '?q=' + encodeURIComponent(query)
        : routesPage;

    window.location.href = targetUrl;
}


// меню
if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {

        const isOpen = menu.classList.toggle('active');

        menuBtn.setAttribute('aria-expanded', isOpen);
        menu.setAttribute('aria-hidden', !isOpen);

        closeSearch();
    });
}

// клик вне меню
if (menu) {
    menu.addEventListener('click', function (e) {
        if (e.target === menu) {
            closeMenu();
        }
    });
}

// 🔥 ESC закрытие
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMenu();
        closeSearch();
    }
});

// ================= СЛАЙДЕР =================

const track = document.querySelector('.slider-track');
const pages = document.querySelectorAll('.page');

const btnNext = document.querySelector('.nav-btn.right');
const btnPrev = document.querySelector('.nav-btn.left');

let current = 0;

function updateSlider() {
    if (!track) return;

    track.style.transform = "translateX(-" + (current * 100) + "%)";

    if (btnPrev && btnNext) {
        btnPrev.classList.remove('active', 'disabled');
        btnNext.classList.remove('active', 'disabled');

        if (current === 0) {
            btnPrev.classList.add('disabled');
            btnNext.classList.add('active');
        } else if (current === pages.length - 1) {
            btnNext.classList.add('disabled');
            btnPrev.classList.add('active');
        } else {
            btnPrev.classList.add('active');
            btnNext.classList.add('active');
        }
    }
}

// вправо
if (btnNext) {
    btnNext.addEventListener('click', function () {
        if (current < pages.length - 1) {
            current++;
            updateSlider();
        }
    });
}

// влево
if (btnPrev) {
    btnPrev.addEventListener('click', function () {
        if (current > 0) {
            current--;
            updateSlider();
        }
    });
}

// запуск
if (track) {
    updateSlider();
}

// ================= МЕНЮ ВНУТРИ =================

const menuItems = document.querySelectorAll('.menu-item');
const contents = document.querySelectorAll('.menu-content');

if (menuItems.length > 0) {
    menuItems.forEach(function (item, index) {

        item.addEventListener('click', function () {

            menuItems.forEach(function (i) {
                i.classList.remove('active');
            });

            item.classList.add('active');

            contents.forEach(function (c) {
                c.classList.remove('active');
            });

            if (contents[index]) {
                contents[index].classList.add('active');
            }

        });

    });
}

// ================= ЗАКРЫТИЕ ПРИ СКРОЛЛЕ =================

window.addEventListener('scroll', function () {
    closeMenu();
    closeSearch();
});

// ================= АНИМАЦИЯ КАРТОЧЕК =================

const cards = document.querySelectorAll('.auto-card');

if (cards.length > 0) {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });

    }, {
        threshold: 0.2
    });

    cards.forEach(function (card) {
        observer.observe(card);
    });
}

// ================= АНИМАЦИЯ СЕКЦИИ =================

const autoSection = document.querySelector('.auto-routes-wrapper');

if (autoSection) {

    window.addEventListener('scroll', function () {

        const trigger = window.innerHeight * 0.85;
        const top = autoSection.getBoundingClientRect().top;

        if (top < trigger) {
            autoSection.classList.add('show');
        }

    });
}

// ================= СЧЕТЧИК =================

const countEl = document.getElementById('count');

if (countEl) {

    let num = 0;
    const target = 131;

    if (!routeSearchQuery) {
        const interval = setInterval(function () {

            num += 2;

            if (num >= target) {
                num = target;
                clearInterval(interval);
            }

            countEl.textContent = num;

        }, 20);
    }
}

// ================= ТЕМА =================

const toggle = document.querySelector('.theme-toggle');

// загрузка
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

// переключение
if (toggle) {
    toggle.addEventListener('click', () => {

        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }

    });
}
if (searchBtn && searchBar && overlay) {
    searchBtn.addEventListener('click', function () {

        const isOpen = searchBar.classList.toggle('active');

        overlay.classList.toggle('active', isOpen);

        searchBtn.setAttribute('aria-expanded', isOpen);
        searchBar.setAttribute('aria-hidden', !isOpen);

        // закрываем меню
        closeMenu();

        if (isOpen) {
            searchInput?.focus();
        }

    });
}

// клик по затемнению закрывает
overlay?.addEventListener('click', () => {
    closeSearch();
});
const bgs = document.querySelectorAll('.bg');
let bgIndex = 0;

if (bgs.length > 1) {
    setInterval(() => {

        bgs[bgIndex].classList.remove('active');

        bgIndex = (bgIndex + 1) % bgs.length;

        bgs[bgIndex].classList.add('active');

    }, 6000);
}
// ================= ACCESSIBILITY SAFE ADDITIONS =================

// 🔥 1. ФОКУС В ПОИСКЕ (закрытие по Tab вне)
if (searchBar) {
    searchBar.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            const focusable = searchBar.querySelectorAll('input, button');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                searchBar.classList.remove('active');
                overlay?.classList.remove('active');
            }

            if (!e.shiftKey && document.activeElement === last) {
                searchBar.classList.remove('active');
                overlay?.classList.remove('active');
            }
        }
    });
}

// 🔥 2. ФОКУС В МЕНЮ (не застревает)
if (menu) {
    menu.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            const focusable = menu.querySelectorAll('button, p');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                menu.classList.remove('active');
                menuBtn?.setAttribute('aria-expanded', false);
                menu.setAttribute('aria-hidden', true);
            }

            if (!e.shiftKey && document.activeElement === last) {
                menu.classList.remove('active');
                menuBtn?.setAttribute('aria-expanded', false);
                menu.setAttribute('aria-hidden', true);
            }
        }
    });
}

// 🔥 3. СЛАЙДЕР С КЛАВИАТУРЫ (← →)
document.addEventListener('keydown', function (e) {

    if (e.key === 'ArrowRight' && btnNext && !btnNext.classList.contains('disabled')) {
        btnNext.click();
    }

    if (e.key === 'ArrowLeft' && btnPrev && !btnPrev.classList.contains('disabled')) {
        btnPrev.click();
    }

});

// 🔥 4. ARIA для слайдера (обновление активного)
function updateSliderAria() {
    const slides = document.querySelectorAll('.div-swiper-slide');

    slides.forEach(slide => {
        slide.removeAttribute('aria-current');
    });

    const activePage = pages[current];
    if (!activePage) return;

    const firstSlide = activePage.querySelector('.div-swiper-slide');
    if (firstSlide) {
        firstSlide.setAttribute('aria-current', 'true');
    }
}

// прокидываем в твой update
const originalUpdateSlider = updateSlider;

updateSlider = function () {
    originalUpdateSlider();
    updateSliderAria();
};

// 🔥 5. КНОПКИ disabled реально не кликаются
if (btnNext) {
    btnNext.addEventListener('click', function () {
        if (btnNext.classList.contains('disabled')) return;
    });
}

if (btnPrev) {
    btnPrev.addEventListener('click', function () {
        if (btnPrev.classList.contains('disabled')) return;
    });
}

// 🔥 6. СЧЕТЧИК озвучивание (aria-live уже есть)
if (countEl) {
    countEl.setAttribute('aria-live', 'polite');
}

// 🔥 7. ФОКУС НА ОТКРЫТИЕ МЕНЮ
if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
            const firstItem = menu.querySelector('.menu-item');
            firstItem?.focus();
        }
    });
}

// 🔥 8. ФОКУС НА ПОИСК
if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', () => {
        if (searchBar.classList.contains('active')) {
            searchInput?.focus();
        }
    });
}

// 🔥 9. КАРТОЧКИ = клавиатура
const routeCards = document.querySelectorAll('.route-card-new');

routeCards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            card.click();
        }
    });
});

if (routeCtaLink && currentPage !== routesPage) {
    routeCtaLink.setAttribute('href', routesPage);
}

routePreviewCards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', goToRoutesPage);
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goToRoutesPage();
        }
    });
});

if (searchSubmitBtn) {
    searchSubmitBtn.type = 'button';
    searchSubmitBtn.addEventListener('click', goToRoutesPage);
}

searchInput?.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    goToRoutesPage();
});

if (currentPage === routesPage) {
    const routeQuery = routeSearchQuery.toLowerCase();
    const routeCards = document.querySelectorAll('.route-card-new');

    if (routeQuery && searchInput) {
        searchInput.value = routeSearchQuery;
    }

    if (routeCards.length > 0 && routeQuery) {
        let visibleCards = 0;

        routeCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const matches = cardText.includes(routeQuery);

            card.style.display = matches ? '' : 'none';

            if (matches) {
                visibleCards++;
            }
        });

        if (countEl) {
            countEl.textContent = String(visibleCards);
        }
    }
}
