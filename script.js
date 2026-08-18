// ==========================================================
// JUBILEE BEAUTY SCHOOL
// MAIN JAVASCRIPT
// ==========================================================


// ==========================================================
// PROGRAM ACCORDION
// Only one program opens at a time
// ==========================================================

const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.program-item');

    if (!currentItem) return;

    const isActive = currentItem.classList.contains('active');

    // Close every program
    document.querySelectorAll('.program-item').forEach((item) => {
      item.classList.remove('active');

      // Also close sub-dropdowns
      item
        .querySelectorAll('.sub-dropdown')
        .forEach((sub) => sub.classList.remove('open'));
    });

    // Open selected program
    if (!isActive) {
      currentItem.classList.add('active');

      // Scroll program into view on smaller screens
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          const navbarHeight =
            document.querySelector('.navbar')?.offsetHeight || 80;

          const position =
            currentItem.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            15;

          window.scrollTo({
            top: position,
            behavior: 'smooth',
          });
        }, 200);
      }
    }
  });
});


// ==========================================================
// PROGRAM SUB-DROPDOWNS
// Description / Objective / Schedule / Hours
// ==========================================================

document
  .querySelectorAll('.sub-dropdown-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const subDropdown = button.closest('.sub-dropdown');

      if (!subDropdown) return;

      const container = subDropdown.closest('.sub-dropdowns');
      const isOpen = subDropdown.classList.contains('open');

      if (!container) return;

      // Close other sub-dropdowns in same program
      container
        .querySelectorAll('.sub-dropdown')
        .forEach((dropdown) => {
          dropdown.classList.remove('open');
        });

      // Open selected dropdown
      if (!isOpen) {
        subDropdown.classList.add('open');
      }
    });
  });


// ==========================================================
// SMOOTH SCROLL HELPER
// Used by "Explore Programs"
// ==========================================================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (!section) return;

  const navbarHeight =
    document.querySelector('.navbar')?.offsetHeight || 80;

  const offsetTop =
    section.getBoundingClientRect().top +
    window.scrollY -
    navbarHeight;

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth',
  });
}


// ==========================================================
// MOBILE NAVIGATION
// ==========================================================

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');

  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}


// Close mobile menu after clicking a normal navigation link

document
  .querySelectorAll('.nav-links a')
  .forEach((link) => {
    link.addEventListener('click', () => {
      // Do not immediately close the Programs dropdown
      // when its top-level button is clicked.
      if (
        link.parentElement &&
        link.parentElement.classList.contains('dropdown')
      ) {
        return;
      }

      document
        .querySelector('.nav-links')
        ?.classList.remove('active');
    });
  });


// ==========================================================
// PROGRAMS NAVBAR DROPDOWN
// ==========================================================

const programsDropdownLink =
  document.querySelector('.dropdown > a');

if (programsDropdownLink) {
  programsDropdownLink.addEventListener('click', (event) => {
    const href =
      programsDropdownLink.getAttribute('href') || '';

    /*
      If we are on index.html and the link is "#programs",
      allow it to behave as a dropdown button.

      If we're on gallery.html or services.html and the link is
      "index.html#programs", DO NOT prevent navigation.
    */

    if (!href.startsWith('#')) {
      return;
    }

    event.preventDefault();

    const parent =
      programsDropdownLink.parentElement;

    const isOpen =
      parent.classList.contains('open');

    document
      .querySelectorAll('.dropdown')
      .forEach((dropdown) => {
        dropdown.classList.remove('open');
      });

    if (!isOpen) {
      parent.classList.add('open');
    }
  });
}


// Close Programs dropdown if user clicks elsewhere

document.addEventListener('click', (event) => {
  const dropdown =
    document.querySelector('.dropdown');

  if (!dropdown) return;

  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('open');
  }
});


// ==========================================================
// SMOOTH SCROLL FOR SAME-PAGE LINKS
// ==========================================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {
    link.addEventListener('click', (event) => {
      const href =
        link.getAttribute('href');

      if (!href || href === '#') return;

      // Programs dropdown has its own behavior
      if (link === programsDropdownLink) {
        return;
      }

      const targetId =
        href.substring(1);

      const target =
        document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      // Close menus
      document
        .querySelectorAll('.dropdown')
        .forEach((dropdown) => {
          dropdown.classList.remove('open');
        });

      document
        .querySelector('.nav-links')
        ?.classList.remove('active');

      const navbarHeight =
        document.querySelector('.navbar')?.offsetHeight || 80;

      const offsetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        15;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    });
  });


// ==========================================================
// SERVICES PAGE
// CORRECT SCROLL POSITION WHEN ARRIVING FROM HOMEPAGE
//
// Example:
// services.html#hair
// services.html#skin
// services.html#nails
// ==========================================================

function scrollToPageHash() {
  if (!window.location.hash) return;

  const targetId =
    window.location.hash.substring(1);

  const target =
    document.getElementById(targetId);

  if (!target) return;

  /*
    Wait briefly for the page/fonts/layout to load
    before correcting the browser's default anchor position.
  */

  setTimeout(() => {
    const navbarHeight =
      document.querySelector('.navbar')?.offsetHeight || 80;

    const offsetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight -
      20;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }, 150);
}


// Run after complete page load

window.addEventListener('load', scrollToPageHash);


// Also support changing hashes while already on page

window.addEventListener('hashchange', scrollToPageHash);


// ==========================================================
// HOMEPAGE GALLERY MARQUEE
//
// Duplicates the ENTIRE clickable <a> item rather than
// only the image. This makes every looping image clickable.
// ==========================================================

(function setupGalleryMarquee() {
  const tracks =
    document.querySelectorAll(
      '.gallery .marquee-track'
    );

  if (!tracks.length) return;

  tracks.forEach((track) => {
    /*
      Prevent duplicate setup if script somehow runs twice.
    */

    if (track.dataset.marqueeReady === 'true') {
      return;
    }

    const originalItems =
      Array.from(track.children);

    if (!originalItems.length) return;

    originalItems.forEach((item) => {
      const clone =
        item.cloneNode(true);

      clone.setAttribute(
        'aria-hidden',
        'true'
      );

      /*
        The cloned links stay clickable, but aria-hidden
        prevents screen readers from reading the same
        gallery items twice.
      */

      track.appendChild(clone);
    });

    track.dataset.marqueeReady = 'true';
  });
})();


// ==========================================================
// FULL GALLERY LIGHTBOX
// ==========================================================

let galleryImages = [];
let currentGalleryIndex = 0;


// Gather gallery images from gallery.html

function setupGalleryLightbox() {
  const items =
    document.querySelectorAll(
      '.full-gallery-item img'
    );

  if (!items.length) return;

  galleryImages =
    Array.from(items).map((image) => image.src);
}


// ==========================================================
// OPEN LIGHTBOX
// ==========================================================

function openLightbox(imageSource) {
  const lightbox =
    document.getElementById('galleryLightbox');

  const lightboxImage =
    document.getElementById('lightboxImage');

  if (!lightbox || !lightboxImage) {
    return;
  }

  /*
    Convert the provided relative path into an absolute URL
    so it can be compared to image.src.
  */

  const absoluteSource =
    new URL(
      imageSource,
      window.location.href
    ).href;

  const foundIndex =
    galleryImages.indexOf(absoluteSource);

  if (foundIndex !== -1) {
    currentGalleryIndex =
      foundIndex;
  }

  lightboxImage.src =
    absoluteSource;
  lightboxImage.hidden = false;

  lightbox.classList.add('active');

  lightbox.setAttribute(
    'aria-hidden',
    'false'
  );

  // Prevent background scrolling
  document.body.classList.add(
    'lightbox-open'
  );
}


// ==========================================================
// CLOSE LIGHTBOX
// ==========================================================

function closeLightbox() {
  const lightbox =
    document.getElementById('galleryLightbox');

  const lightboxImage =
    document.getElementById('lightboxImage');

  if (!lightbox) return;

  lightbox.classList.remove('active');

  lightbox.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'lightbox-open'
  );

  /*
    Clear image after animation so the image
    doesn't briefly disappear while closing.
  */

  setTimeout(() => {
    if (
      lightboxImage &&
      !lightbox.classList.contains('active')
    ) {
      lightboxImage.removeAttribute('src');
      lightboxImage.src = '';
    }
  }, 300);
}


// ==========================================================
// NEXT LIGHTBOX IMAGE
// ==========================================================

function nextLightboxImage() {
  if (!galleryImages.length) return;

  currentGalleryIndex++;

  if (
    currentGalleryIndex >=
    galleryImages.length
  ) {
    currentGalleryIndex = 0;
  }

  updateLightboxImage();
}


// ==========================================================
// PREVIOUS LIGHTBOX IMAGE
// ==========================================================

function previousLightboxImage() {
  if (!galleryImages.length) return;

  currentGalleryIndex--;

  if (currentGalleryIndex < 0) {
    currentGalleryIndex =
      galleryImages.length - 1;
  }

  updateLightboxImage();
}


// ==========================================================
// UPDATE LIGHTBOX IMAGE
// ==========================================================

function updateLightboxImage() {
  const lightboxImage =
    document.getElementById('lightboxImage');

  if (
    !lightboxImage ||
    !galleryImages.length
  ) {
    return;
  }

  lightboxImage.src =
    galleryImages[currentGalleryIndex];
}


// ==========================================================
// LIGHTBOX CONTROLS
// Keyboard + clicking outside image
// ==========================================================

document.addEventListener(
  'DOMContentLoaded',
  () => {
    setupGalleryLightbox();

    const lightbox =
      document.getElementById(
        'galleryLightbox'
      );

    if (lightbox) {
      lightbox.addEventListener(
        'click',
        (event) => {
          /*
            Only close if the dark background itself
            was clicked.

            Clicking the image or arrow buttons
            will not close it.
          */

          if (event.target === lightbox) {
            closeLightbox();
          }
        }
      );
    }
  }
);


// Keyboard navigation

document.addEventListener(
  'keydown',
  (event) => {
    const lightbox =
      document.getElementById(
        'galleryLightbox'
      );

    if (
      !lightbox ||
      !lightbox.classList.contains('active')
    ) {
      return;
    }

    // ESC = close
    if (event.key === 'Escape') {
      closeLightbox();
    }

    // Right arrow = next
    if (event.key === 'ArrowRight') {
      nextLightboxImage();
    }

    // Left arrow = previous
    if (event.key === 'ArrowLeft') {
      previousLightboxImage();
    }
  }
);


// ==========================================================
// SWIPE SUPPORT FOR GALLERY LIGHTBOX
// Useful on phones/tablets
// ==========================================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  'touchstart',
  (event) => {
    const lightbox =
      document.getElementById(
        'galleryLightbox'
      );

    if (
      !lightbox ||
      !lightbox.classList.contains('active')
    ) {
      return;
    }

    touchStartX =
      event.changedTouches[0].screenX;
  },
  {
    passive: true,
  }
);


document.addEventListener(
  'touchend',
  (event) => {
    const lightbox =
      document.getElementById(
        'galleryLightbox'
      );

    if (
      !lightbox ||
      !lightbox.classList.contains('active')
    ) {
      return;
    }

    touchEndX =
      event.changedTouches[0].screenX;

    handleGallerySwipe();
  },
  {
    passive: true,
  }
);


function handleGallerySwipe() {
  const difference =
    touchStartX - touchEndX;

  // Ignore very small movements
  if (Math.abs(difference) < 50) {
    return;
  }

  // Swipe left
  if (difference > 0) {
    nextLightboxImage();
  }

  // Swipe right
  if (difference < 0) {
    previousLightboxImage();
  }
}


// ==========================================================
// APPEAR / SCROLL ANIMATIONS
// ==========================================================

document.addEventListener(
  'DOMContentLoaded',
  () => {

    // ------------------------------------------------------
    // Elements with .appear
    // ------------------------------------------------------

    const appearElements =
      Array.from(
        document.querySelectorAll('.appear')
      );

    if (
      appearElements.length &&
      'IntersectionObserver' in window
    ) {
      const appearObserver =
        new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              const element =
                entry.target;

              const order =
                Number(
                  element.getAttribute(
                    'data-appear-order'
                  )
                );

              const delay =
                Number.isFinite(order)
                  ? 120 + order * 90
                  : 120;

              setTimeout(() => {
                element.classList.add(
                  'is-visible'
                );
              }, Math.max(delay, 0));

              observer.unobserve(element);
            });
          },
          {
            threshold: 0.15,
            rootMargin:
              '0px 0px -8% 0px',
          }
        );

      appearElements.forEach(
        (element) => {
          appearObserver.observe(element);
        }
      );
    } else {
      /*
        Fallback for older browsers.
      */

      appearElements.forEach(
        (element) => {
          element.classList.add(
            'is-visible'
          );
        }
      );
    }


    // ------------------------------------------------------
    // Image fade-in effect
    // ------------------------------------------------------

    if (
      'IntersectionObserver' in window
    ) {
      const imageObserver =
        new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                'visible'
              );

              observer.unobserve(
                entry.target
              );
            });
          },
          {
            threshold: 0.15,
          }
        );

      const allImages =
        document.querySelectorAll('img');

      allImages.forEach((image) => {

        /*
          Don't fade the moving homepage gallery images,
          because fading/transforms can interfere with
          the continuous marquee.
        */

        if (
          image.closest(
            '.gallery-marquee'
          )
        ) {
          return;
        }

        /*
          Don't fade lightbox image.
        */

        if (
          image.id ===
          'lightboxImage'
        ) {
          return;
        }

        /*
          Hero image already uses .appear.
        */

        if (
          image.classList.contains(
            'appear'
          )
        ) {
          return;
        }

        image.classList.add(
          'fade-in-img'
        );

        imageObserver.observe(image);
      });
    }
  }
);


// ==========================================================
// PREVENT IMAGE DRAGGING IN MOVING GALLERY
// Helps make clicking feel cleaner
// ==========================================================

document
  .querySelectorAll(
    '.gallery-marquee img'
  )
  .forEach((image) => {
    image.setAttribute(
      'draggable',
      'false'
    );
  });


// ==========================================================
// ACCESSIBILITY:
// Reduced-motion preference
// ==========================================================

const reducedMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

if (reducedMotion.matches) {
  document.documentElement.classList.add(
    'reduce-motion'
  );
}
