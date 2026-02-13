// === Accordion: one program open at a time ===
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.program-item');
    const isActive = currentItem.classList.contains('active');

    // Close all program items and their sub-dropdowns
    document.querySelectorAll('.program-item').forEach((item) => {
      item.classList.remove('active');
      item
        .querySelectorAll('.sub-dropdown')
        .forEach((sub) => sub.classList.remove('open'));
    });

    if (!isActive) {
      currentItem.classList.add('active');
      // Scroll into view on small screens
      setTimeout(() => {
        currentItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  });
});

// === Sub-dropdowns inside each program ===
document.querySelectorAll('.sub-dropdown-button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const sub = btn.closest('.sub-dropdown');
    const isOpen = sub.classList.contains('open');
    const container = sub.closest('.sub-dropdowns');

    // Close all sub-dropdowns in this program item
    container
      .querySelectorAll('.sub-dropdown')
      .forEach((s) => s.classList.remove('open'));

    if (!isOpen) {
      sub.classList.add('open');
    }
  });
});

// === Smooth scroll helper (used by Explore Programs button) ===
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }
}

// === Mobile menu toggle ===
function toggleMenu() {
  document.querySelector('.nav-links')?.classList.toggle('active');
}

// === Programs dropdown toggle (click to open/close) ===
const programsDropdownLink = document.querySelector('.dropdown > a');

if (programsDropdownLink) {
  programsDropdownLink.addEventListener('click', (e) => {
    e.preventDefault();
    const parent = programsDropdownLink.parentElement;
    const isOpen = parent.classList.contains('open');

    document
      .querySelectorAll('.dropdown')
      .forEach((d) => d.classList.remove('open'));

    if (!isOpen) {
      parent.classList.add('open');
    }
  });
}

// === Smooth scroll for in-page anchor links (including Programs menu items) ===
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  // Skip the top-level Programs link (handled above)
  if (link === programsDropdownLink) return;

  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href')?.substring(1);
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    e.preventDefault();

    // Close dropdowns and mobile nav
    document
      .querySelectorAll('.dropdown')
      .forEach((d) => d.classList.remove('open'));
    document.querySelector('.nav-links')?.classList.remove('active');

    const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  });
});

// === Gallery marquee: duplicate images for seamless scroll (both rows) ===
(function setupGalleryMarquee() {
  const tracks = document.querySelectorAll('.gallery .marquee-track');
  if (!tracks.length) return;

  tracks.forEach((track) => {
    const imgs = Array.from(track.querySelectorAll('img'));
    if (!imgs.length) return;

    // Duplicate each row's images so the keyframe loop is seamless
    track.append(...imgs.map((img) => img.cloneNode(true)));
  });
})();

// === Unified animations on load + on scroll ===
document.addEventListener('DOMContentLoaded', () => {
  /**
   * 1) APPEAR system for ANY element with class .appear
   * - If it's already on screen when the page loads, it fades in immediately.
   * - If it’s below the fold, it fades in when scrolled into view.
   *
   * This works with your CSS:
   * .appear { opacity: 0; transform...; transition... }
   * .appear.is-visible { opacity: 1; transform... }
   */
  const appearEls = Array.from(document.querySelectorAll('.appear'));

  if (appearEls.length) {
    const appearObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;

          // Optional stagger: use data-appear-order if present (nice for hero)
          const order = Number(el.getAttribute('data-appear-order'));
          const delay = Number.isFinite(order) ? 120 + order * 90 : 120;

          setTimeout(() => el.classList.add('is-visible'), delay);

          obs.unobserve(el);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    appearEls.forEach((el) => appearObserver.observe(el));
  }

  /**
   * 2) Keep your existing image fade-in behavior (non-gallery images)
   * - Adds .fade-in-img
   * - Observes and toggles .visible
   *
   * NOTE: This is separate from .appear so it won't conflict.
   */
  const imgObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  const allImages = document.querySelectorAll('img');

  allImages.forEach((img) => {
    // Skip gallery images
    if (img.closest('.gallery')) return;

    img.classList.add('fade-in-img');
    imgObserver.observe(img);
  });
});
