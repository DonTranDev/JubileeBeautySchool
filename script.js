// Accordion Functionality
document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const content = item.querySelector('.accordion-content');
    const isOpen = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.accordion-content').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

// Switching Banner Logic
const banners = ['Collage1.png', 'HollyVietTran.png'];
let bannerIndex = 0;
const bannerContainer = document.querySelector('.switching-banner');

banners.forEach((src, i) => {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('banner-slide');
  img.style.opacity = i === 0 ? '1' : '0';
  bannerContainer.appendChild(img);
});

setInterval(() => {
  const slides = document.querySelectorAll('.banner-slide');
  slides[bannerIndex].style.opacity = '0';
  bannerIndex = (bannerIndex + 1) % slides.length;
  slides[bannerIndex].style.opacity = '1';
}, 3000);

// Parallax Effect
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  const parallax = document.querySelector('.parallax-banner');
  parallax.style.backgroundPositionY = `${scroll * 0.5}px`;
});

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Scroll To Section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Email Submission
function sendMail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const subject = `Contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  window.location.href = `mailto:jubileebeautyschool@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
