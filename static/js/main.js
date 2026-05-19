/* ============================================================
   Frozen 1000 · Landing — vanilla JS behaviors
   Replaces the original React/Babel app.jsx 1:1.
   ============================================================ */
(function () {
  'use strict';

  // ---------------------------------------------------------------------
  // Slot data (prompts) — JSON payload emitted by base.html
  // ---------------------------------------------------------------------
  const SLOT_DATA = (() => {
    const el = document.getElementById('slot-data');
    if (!el) return {};
    try { return JSON.parse(el.textContent); }
    catch (e) { console.warn('[F1k] slot-data JSON parse failed', e); return {}; }
  })();

  // ---------------------------------------------------------------------
  // Lucide icons
  // ---------------------------------------------------------------------
  function initLucide() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // ---------------------------------------------------------------------
  // Mouse-tracked spotlight (was inline in the original HTML)
  // ---------------------------------------------------------------------
  function initSpotlight() {
    const spot = document.getElementById('fxSpot');
    if (!spot) return;
    let raf = 0, tx = 50, ty = 30;
    const apply = () => {
      spot.style.setProperty('--mx', tx + '%');
      spot.style.setProperty('--my', ty + '%');
      raf = 0;
    };
    window.addEventListener('pointermove', (e) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = ((e.clientY + window.scrollY) / (window.innerHeight + window.scrollY * 0.1)) * 100;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  }

  // ---------------------------------------------------------------------
  // Ripple effect — every .btn gets a click ripple (the FXButton behavior)
  // ---------------------------------------------------------------------
  function initRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const d = Math.max(btn.clientWidth, btn.clientHeight);
      const r = document.createElement('span');
      r.className = 'ripple';
      r.style.width = r.style.height = d + 'px';
      r.style.left = (e.clientX - rect.left - d / 2) + 'px';
      r.style.top = (e.clientY - rect.top - d / 2) + 'px';
      btn.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  }

  // ---------------------------------------------------------------------
  // Live 90s timer in "Como funciona"
  // ---------------------------------------------------------------------
  function initLiveTimer() {
    const el = document.getElementById('liveTimer');
    if (!el) return;
    let t = 0;
    setInterval(() => {
      t = (t + 1) % 91;
      el.textContent = '00:' + String(t).padStart(2, '0');
    }, 100);
  }

  // ---------------------------------------------------------------------
  // Cardápio tabs — filter menu cards by category
  // ---------------------------------------------------------------------
  function initTabs() {
    const tabs = document.querySelectorAll('.tabs .tab');
    const cards = document.querySelectorAll('.menu-grid .menu-card');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const cat = tab.dataset.cat;

        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        cards.forEach((card) => {
          const show = cat === 'todos' || card.dataset.cat === cat;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  // ---------------------------------------------------------------------
  // Prompt modal — open on slot click, close on X / backdrop / Escape
  // ---------------------------------------------------------------------
  function initModal() {
    const modal = document.getElementById('promptModal');
    if (!modal) return;

    const idTag    = modal.querySelector('[data-modal-id-tag]');
    const titleEl  = modal.querySelector('[data-modal-title]');
    const promptEl = modal.querySelector('[data-modal-prompt]');
    const copyMsg  = modal.querySelector('[data-copy-msg]');
    const copyBtn  = modal.querySelector('[data-modal-copy]');

    let currentPrompt = '';

    const open = (slotId) => {
      const slot = SLOT_DATA[slotId];
      if (!slot) return;
      currentPrompt = slot.prompt || '';
      if (idTag)    idTag.textContent    = 'IMG · ' + String(slotId).toUpperCase();
      if (titleEl)  titleEl.textContent  = slot.label || '';
      if (promptEl) promptEl.textContent = currentPrompt;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    };

    const close = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      if (copyMsg) copyMsg.classList.remove('show');
    };

    // Slot click → open
    document.addEventListener('click', (e) => {
      const slotEl = e.target.closest('.slot[data-slot-id]');
      if (slotEl) open(slotEl.dataset.slotId);
    });

    // Keyboard activation on slot (role="button")
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const slotEl = document.activeElement && document.activeElement.closest && document.activeElement.closest('.slot[data-slot-id]');
      if (slotEl) {
        e.preventDefault();
        open(slotEl.dataset.slotId);
      }
    });

    // Close affordances
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
      if (e.target.closest('[data-modal-close]')) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });

    // Copy prompt
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(currentPrompt);
          if (copyMsg) {
            copyMsg.classList.add('show');
            setTimeout(() => copyMsg.classList.remove('show'), 1500);
          }
        } catch (err) {
          console.warn('[F1k] clipboard write failed', err);
        }
      });
    }
  }

  // ---------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------
  function boot() {
    initLucide();
    initSpotlight();
    initRipple();
    initLiveTimer();
    initTabs();
    initModal();
    console.log('[Frozen 1000] landing mounted');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
