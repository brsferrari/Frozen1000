"use strict";

/**
 * Frozen1000 landing page interactions.
 *
 * JavaScript controls reveal animations and lightweight console tracking
 * for CTA clicks during stakeholder demos.
 */

/**
 * Reveal marked elements once they enter the viewport.
 *
 * @returns {void}
 */
const observeRevealElements = () => {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
};

/**
 * Log CTA clicks as structured console events for prototype review sessions.
 *
 * @returns {void}
 */
const bindTracking = () => {
  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      const eventName = element.getAttribute("data-track");

      if (eventName === null) {
        return;
      }

      console.info("Frozen1000 event", { eventName });
    });
  });
};

/**
 * Boot every interaction after the static HTML is available.
 *
 * @returns {void}
 */
const boot = () => {
  bindTracking();
  observeRevealElements();
};

boot();