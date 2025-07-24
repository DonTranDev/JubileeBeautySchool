// === Accordion One-at-a-Time Functionality ===
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.program-item');
    const isActive = currentItem.classList.contains('active');

    // Close all program items
    document.querySelectorAll('.program-item').forEach(item => {
      item.classList.remove('active');
      // Close all sub-dropdowns too
      item.querySelectorAll('.sub-dropdown').forEach(sub => sub.classList.remove('open'));
    });

   if (!isActive) {
  currentItem.classList.add('active');

  // Scroll into view after expansion
  setTimeout(() => {
    currentItem.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 200);
}

  });
});

// === Sub-dropdowns ===
document.querySelectorAll('.sub-dropdown-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const sub = btn.parentElement;
    const isOpen = sub.classList.contains('open');

    sub.parentElement.querySelectorAll('.sub-dropdown').forEach(s => s.classList.remove('open'));

    if (!isOpen) {
      sub.classList.add('open');
    }
  });
});

// === Smooth Scroll Helper ===
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// === Slide Banner Slideshow ===
const bannerImages = ['Collage1.png', 'HollyVietTran.png'];
let bannerIndex = 0;

function createBannerSlider() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const slider = document.createElement('div');
  slider.className = 'banner-slider';
  slider.style.display = 'flex';
  slider.style.width = `${bannerImages.length * 100}%`;
  slider.style.transition = 'transform 1s ease-in-out';

  bannerImages.forEach(src => {
    const slide = document.createElement('div');
    slide.style.flex = '1 0 100%';
    slide.style.backgroundImage = `url('${src}')`;
    slide.style.backgroundSize = 'cover';
    slide.style.backgroundPosition = 'center';
    slide.style.height = '100%';
    slider.appendChild(slide);
  });

  const content = hero.querySelector('.hero-content');
  hero.innerHTML = '';
  hero.appendChild(slider);
  hero.appendChild(content);

  content.style.zIndex = '2';
  content.style.position = 'absolute';
  content.style.top = '50%';
  content.style.left = '50%';
  content.style.transform = 'translate(-50%, -50%)';

  hero.style.overflow = 'hidden';
  hero.style.position = 'relative';
  hero.slider = slider;
}

function cycleBanner() {
  const hero = document.querySelector('.hero');
  const slider = hero?.querySelector('.banner-slider');
  if (!slider) return;

  bannerIndex = (bannerIndex + 1) % bannerImages.length;
  slider.style.transform = `translateX(-${bannerIndex * 100}%)`;
}

createBannerSlider();
setInterval(cycleBanner, 5000);

// === Optional: Send Mail ===
function sendMail() {
  const name = document.getElementById('name')?.value;
  const email = document.getElementById('email')?.value;
  const message = document.getElementById('message')?.value;

  if (!name || !email || !message) return;

  const subject = `Contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  window.location.href = `mailto:jubileebeautyschool@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function updateBodyPaddingForMobile() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    const navHeight = navbar.offsetHeight;
    document.body.style.paddingTop = navHeight + 'px';
  } else {
    // Reset padding when NOT mobile (optional)
    document.body.style.paddingTop = '';
  }
}

// Simple debounce helper
function debounce(fn, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  }
}

window.addEventListener('load', updateBodyPaddingForMobile);
window.addEventListener('resize', debounce(updateBodyPaddingForMobile, 150));

const toggleButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

toggleButton.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('active');
}
