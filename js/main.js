/**
 * FROZEN1000 - MAIN JAVASCRIPT
 * Vanilla JS interactive functionality, animations, and components.
 * 100% Static & GitHub Pages compatible. No build tools or frameworks required.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMenuFilter();
  initProductCustomizer();
  initMascotInteractivity();
  initStoreLocator();
  initFranchiseCalculator();
  initCouponScratcher();
  initBackToTop();
  initScrollAnimations();
  initForms();
});

/* ==========================================================================
   1. Navbar Scroll & Navigation
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.main-navbar');
  const navLinks = document.querySelectorAll('.main-navbar .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Shrink navbar on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link highlight
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Close mobile offcanvas/collapse on link click
  const offcanvasElement = document.getElementById('mobileNav');
  if (offcanvasElement && window.bootstrap) {
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
    document.querySelectorAll('.offcanvas-body .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        bsOffcanvas.hide();
      });
    });
  }
}

/* ==========================================================================
   2. Menu Filter Tabs
   ========================================================================== */
function initMenuFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCols = document.querySelectorAll('.product-card-col');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCols.forEach(col => {
        const category = col.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          col.style.display = 'block';
          setTimeout(() => {
            col.style.opacity = '1';
            col.style.transform = 'translateY(0)';
          }, 50);
        } else {
          col.style.opacity = '0';
          col.style.transform = 'translateY(20px)';
          setTimeout(() => {
            col.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   3. Interactive Product Customizer Modal
   ========================================================================== */
const PRODUCTS_DATA = {
  'apple-frost': {
    name: 'Apple Frost Smash',
    category: 'Shakes Galácticos',
    basePrice: 24.90,
    image: 'assets/images/launch-1.png',
    desc: 'Maçã verde ultra-crocante em calda gelada com baunilha espacial de Madagascar, swirls de nata pura e pedacinhos de maçã fresca caramelizada no topo.',
    calories: '380 kcal',
    temp: '-18°C'
  },
  'berry-nebula': {
    name: 'Berry Nebula Swirl',
    category: 'Shakes Galácticos',
    basePrice: 26.90,
    image: 'assets/images/berry-nebula.jpg',
    desc: 'Swirl cósmico de pitaya rosa neon, morangos silvestres frescos, cream cheese aerado e calda artesanal de frutas vermelhas colhidas na altitude.',
    calories: '360 kcal',
    temp: '-18°C'
  },
  'blue-galaxy': {
    name: 'Blue Galaxy Cream',
    category: 'Shakes Galácticos',
    basePrice: 25.90,
    image: 'assets/images/blue-galaxy.jpg',
    desc: 'Gelato artesanal de Blue Curaçao suave sem álcool, baunilha em fava, mirtilos inteiros, chantilly de nuvem e glitter azul cósmico 100% comestível.',
    calories: '390 kcal',
    temp: '-18°C'
  },
  'choco-meteor': {
    name: 'Choco Meteor Crunch',
    category: 'Shakes Galácticos',
    basePrice: 27.90,
    image: 'assets/images/choco-meteor.jpg',
    desc: 'Cacau belga 70% aveludado, pedaços generosos de brownie fudge crocante, avelãs tostadas e calda quente-fria de caramelo salgado vulcânico.',
    calories: '490 kcal',
    temp: '-18°C'
  },
  'mango-solar': {
    name: 'Mango Solar Burst',
    category: 'Slushes & Refreshes',
    basePrice: 23.90,
    image: 'assets/images/mango-solar.jpg',
    desc: 'Manga Palmer fresca maturada no ponto máximo, néctar de maracujá doce, creme de coco tailandês e pérolas explosivas de tangerina espacial.',
    calories: '280 kcal',
    temp: '-16°C'
  },
  'pistache-supernova': {
    name: 'Pistache Supernova',
    category: 'Taças & Bowls Sub-Zero',
    basePrice: 29.90,
    image: 'assets/images/blue-galaxy.jpg',
    desc: 'Pistache puro siciliano com ganache artesanal de chocolate branco nobre, amêndoas laminadas e gelato com densidade zero de cristais de gelo.',
    calories: '440 kcal',
    temp: '-18°C'
  },
  'churros-cryo': {
    name: 'Churros Criogênico',
    category: 'Taças & Bowls Sub-Zero',
    basePrice: 24.90,
    image: 'assets/images/choco-meteor.jpg',
    desc: 'Doce de leite mineiro cremoso em espiral, pitadas de canela de ceilão, mini churros crocantes e chantilly aerado com flor de sal.',
    calories: '420 kcal',
    temp: '-18°C'
  },
  'acai-turbo': {
    name: 'Açaí Lunar Protein (Zero Açúcar)',
    category: 'Linha Turbo & Fit',
    basePrice: 28.90,
    image: 'assets/images/berry-nebula.jpg',
    desc: 'Açaí orgânico da Amazônia puro batido com whey protein isolado 24g, morangos frescos, granola artesanal de castanhas e zero açúcar adicionado.',
    calories: '310 kcal',
    temp: '-16°C'
  }
};

let currentProduct = null;
let currentSizeExtra = 0;
let cartCount = 0;

function initProductCustomizer() {
  const customizeButtons = document.querySelectorAll('[data-action="customize"]');
  const modalElem = document.getElementById('customizeModal');
  if (!modalElem) return;

  const modal = new bootstrap.Modal(modalElem);

  customizeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.getAttribute('data-product-id');
      const prod = PRODUCTS_DATA[productId];
      if (!prod) return;

      currentProduct = prod;
      currentSizeExtra = 0;

      // Populate Modal Fields
      document.getElementById('modalProdImg').src = prod.image;
      document.getElementById('modalProdCategory').textContent = prod.category;
      document.getElementById('modalProdTitle').textContent = prod.name;
      document.getElementById('modalProdDesc').textContent = prod.desc;
      document.getElementById('modalProdCalories').textContent = prod.calories;
      document.getElementById('modalProdTemp').textContent = prod.temp;

      // Reset Size Selector to Default (300ml)
      document.querySelectorAll('.size-option-card').forEach(card => card.classList.remove('selected'));
      const defaultSize = document.querySelector('.size-option-card[data-size="300"]');
      if (defaultSize) defaultSize.classList.add('selected');

      // Reset checkboxes
      document.querySelectorAll('.addon-checkbox').forEach(cb => cb.checked = false);

      updateModalPrice();
      modal.show();
    });
  });

  // Size option cards click
  document.querySelectorAll('.size-option-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.size-option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      currentSizeExtra = parseFloat(card.getAttribute('data-extra')) || 0;
      updateModalPrice();
      playSynthChime(600, 0.06);
    });
  });

  // Addon checkboxes change
  document.querySelectorAll('.addon-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      updateModalPrice();
      playSynthChime(800, 0.05);
    });
  });

  // Add to order button inside modal
  const btnAddToCart = document.getElementById('btnModalAddToCart');
  if (btnAddToCart) {
    btnAddToCart.addEventListener('click', () => {
      cartCount++;
      updateCartBadge();
      modal.hide();

      // Show toast
      showToast(`🍨 <strong>${currentProduct.name}</strong> adicionado ao seu pedido!`);
      playSynthChime(950, 0.15);
    });
  }
}

function updateModalPrice() {
  if (!currentProduct) return;
  let total = currentProduct.basePrice + currentSizeExtra;

  document.querySelectorAll('.addon-checkbox:checked').forEach(cb => {
    total += parseFloat(cb.getAttribute('data-price')) || 0;
  });

  const priceFormatted = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const priceDisplay = document.getElementById('modalTotalPrice');
  if (priceDisplay) {
    priceDisplay.textContent = priceFormatted;
  }
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-counter-badge');
  badges.forEach(b => {
    b.textContent = cartCount;
    b.style.display = 'inline-flex';
    b.classList.add('animate__animated', 'animate__bounceIn');
  });
}

/* ==========================================================================
   4. Mascot Frizz Interactive Character
   ========================================================================== */
function initMascotInteractivity() {
  const moodButtons = document.querySelectorAll('.btn-mood');
  const speechBubble = document.getElementById('frizzSpeechBubble');
  const mascotImg = document.getElementById('frizzMainImg');

  const MOOD_DATA = {
    'happy': {
      image: 'assets/images/frizz-exp-happy.png',
      quote: '“E aí, terráqueo! Nada como um shake ultra-congelado para iluminar o seu dia a 1000%!”',
      pitch: 880
    },
    'wink': {
      image: 'assets/images/frizz-exp-wink.png',
      quote: '“Psst... Dica secreta do Capitão Frizz: experimente colocar pérolas explosivas no Apple Frost!”',
      pitch: 1100
    },
    'wow': {
      image: 'assets/images/frizz-exp-wow.png',
      quote: '“UAU! Você já sentiu essa cremosidade sub-zero? É literalmente de outra galáxia!”',
      pitch: 750
    },
    'smile': {
      image: 'assets/images/frizz-exp-smile.png',
      quote: '“Minha missão cósmica é transformar dias quentes em momentos congelantemente perfeitos.”',
      pitch: 920
    }
  };

  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      moodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mood = btn.getAttribute('data-mood');
      const data = MOOD_DATA[mood];
      if (!data) return;

      // Animate speech bubble
      speechBubble.style.opacity = '0';
      speechBubble.style.transform = 'translateY(8px)';

      // Animate mascot image
      mascotImg.style.transform = 'scale(0.92) rotate(-3deg)';

      setTimeout(() => {
        mascotImg.src = data.image;
        speechBubble.textContent = data.quote;

        mascotImg.style.transform = 'scale(1.06) rotate(3deg)';
        speechBubble.style.opacity = '1';
        speechBubble.style.transform = 'translateY(0)';

        setTimeout(() => {
          mascotImg.style.transform = 'scale(1) rotate(0)';
        }, 250);
      }, 150);

      playSynthChime(data.pitch, 0.12);
    });
  });
}

/* ==========================================================================
   5. Store Locator Filter & Search
   ========================================================================== */
function initStoreLocator() {
  const searchInput = document.getElementById('storeSearchInput');
  const cityChips = document.querySelectorAll('.city-chip');
  const storeCards = document.querySelectorAll('.store-card-col');
  const resultCounter = document.getElementById('storeResultCount');

  function filterStores() {
    const searchTerm = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const activeChip = document.querySelector('.city-chip.active');
    const selectedCity = activeChip ? activeChip.getAttribute('data-city') : 'all';

    let visibleCount = 0;

    storeCards.forEach(col => {
      const city = col.getAttribute('data-city');
      const text = col.textContent.toLowerCase();

      const matchesCity = (selectedCity === 'all' || city === selectedCity);
      const matchesSearch = (!searchTerm || text.includes(searchTerm));

      if (matchesCity && matchesSearch) {
        col.style.display = 'block';
        visibleCount++;
      } else {
        col.style.display = 'none';
      }
    });

    if (resultCounter) {
      resultCounter.textContent = `${visibleCount} loja${visibleCount === 1 ? '' : 's'} encontrada${visibleCount === 1 ? '' : 's'}`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterStores);
  }

  cityChips.forEach(chip => {
    chip.addEventListener('click', () => {
      cityChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterStores();
      playSynthChime(700, 0.05);
    });
  });
}

/* ==========================================================================
   6. Franchise ROI Calculator
   ========================================================================== */
function initFranchiseCalculator() {
  const btnKiosk = document.getElementById('calcKioskBtn');
  const btnStore = document.getElementById('calcStoreBtn');
  if (!btnKiosk || !btnStore) return;

  const areaElem = document.getElementById('calcArea');
  const investElem = document.getElementById('calcInvest');
  const revElem = document.getElementById('calcRevenue');
  const paybackElem = document.getElementById('calcPayback');

  const MODEL_SPECS = {
    kiosk: {
      area: '9m² a 15m²',
      invest: 'R$ 145.000',
      revenue: 'R$ 65.000 a R$ 90.000',
      payback: '14 a 18 meses'
    },
    store: {
      area: '35m² a 65m²',
      invest: 'R$ 275.000',
      revenue: 'R$ 110.000 a R$ 160.000',
      payback: '16 a 20 meses'
    }
  };

  btnKiosk.addEventListener('click', () => {
    btnKiosk.classList.add('active');
    btnStore.classList.remove('active');
    updateSpecs(MODEL_SPECS.kiosk);
    playSynthChime(650, 0.08);
  });

  btnStore.addEventListener('click', () => {
    btnStore.classList.add('active');
    btnKiosk.classList.remove('active');
    updateSpecs(MODEL_SPECS.store);
    playSynthChime(850, 0.08);
  });

  function updateSpecs(specs) {
    areaElem.textContent = specs.area;
    investElem.textContent = specs.invest;
    revElem.textContent = specs.revenue;
    paybackElem.textContent = specs.payback;
  }
}

/* ==========================================================================
   7. Clube Frizz & Interactive Coupon Scratcher
   ========================================================================== */
function initCouponScratcher() {
  const couponBox = document.getElementById('couponScratchArea');
  const couponText = document.getElementById('couponCodeText');
  const btnCopy = document.getElementById('btnCopyCoupon');
  if (!couponBox || !btnCopy) return;

  const CODE = 'FRIZZ10';

  btnCopy.addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CODE).then(() => {
        showCouponCopiedFeedback();
      }).catch(() => {
        fallbackCopy(CODE);
      });
    } else {
      fallbackCopy(CODE);
    }
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showCouponCopiedFeedback();
  }

  function showCouponCopiedFeedback() {
    btnCopy.innerHTML = '<i class="bi bi-check-circle-fill"></i> Cupom Copiado!';
    btnCopy.classList.remove('btn-f1-pink');
    btnCopy.classList.add('btn-success');
    showToast('🚀 Cupom <strong>FRIZZ10</strong> copiado com sucesso! Aproveite seus 10% OFF.');
    playSynthChime(1050, 0.15);

    setTimeout(() => {
      btnCopy.innerHTML = '<i class="bi bi-clipboard"></i> Copiar Cupom';
      btnCopy.classList.remove('btn-success');
      btnCopy.classList.add('btn-f1-pink');
    }, 3500);
  }
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('btnBackToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    playSynthChime(900, 0.08);
  });
}

/* ==========================================================================
   9. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const animElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   10. Form Submissions (Newsletter & Franchise Leads)
   ========================================================================== */
function initForms() {
  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('🎉 Bem-vindo ao <strong>Clube Frizz VIP</strong>! Verifique seu e-mail para seu presente congelante.');
        newsletterForm.reset();
        playSynthChime(950, 0.12);
      }
    });
  }

  // Franchise Lead Modal Form
  const franchiseForm = document.getElementById('franchiseLeadForm');
  if (franchiseForm) {
    franchiseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalElem = document.getElementById('franchiseModal');
      if (modalElem && window.bootstrap) {
        const bsModal = bootstrap.Modal.getInstance(modalElem);
        if (bsModal) bsModal.hide();
      }
      showToast('🚀 <strong>Proposta recebida!</strong> Nossa equipe de expansão entrará em contato em até 24 horas.');
      franchiseForm.reset();
      playSynthChime(1100, 0.2);
    });
  }
}

/* ==========================================================================
   11. Helper Toast Notification
   ========================================================================== */
function showToast(message) {
  const toastContainer = document.getElementById('toastNotificationContainer');
  if (!toastContainer) return;

  const toastEl = document.createElement('div');
  toastEl.className = 'toast f1-toast align-items-center text-white border-0 show mb-2';
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => {
      if (toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
    }, 400);
  }, 4000);
}

/* ==========================================================================
   12. Web Audio API Futuristic Robot Chime (Offline, Zero Assets)
   ========================================================================== */
let audioCtx = null;
function playSynthChime(freq = 800, duration = 0.1) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.35, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    // Graceful silent fallback if Web Audio is restricted
  }
}
