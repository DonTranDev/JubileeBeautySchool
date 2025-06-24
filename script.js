// === Accordion One-at-a-Time Functionality ===
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const currentItem = button.closest('.program-item');
    const isActive = currentItem.classList.contains('active');

    document.querySelectorAll('.program-item').forEach(item => {
      item.classList.remove('active');
    });

    if (!isActive) {
      currentItem.classList.add('active');
    }
  });
});

// === Smooth Scroll Helper (optional use for Learn More button) ===
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

// === Responsive Program Panel Stagger ===
function applyStaggeredPrograms() {
  const programItems = document.querySelectorAll('.program-item');
  programItems.forEach((item, index) => {
    item.style.marginLeft = index % 2 === 0 ? '5%' : 'auto';
    item.style.marginRight = index % 2 !== 0 ? '5%' : 'auto';
    item.style.width = '90%';
    item.style.maxWidth = '700px';
  });
}

window.addEventListener('load', applyStaggeredPrograms);
window.addEventListener('resize', applyStaggeredPrograms);

