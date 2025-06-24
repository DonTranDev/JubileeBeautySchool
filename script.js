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

// === Optional: Banner Slideshow ===
const bannerImages = ['Collage1.png', 'HollyVietTran.png'];
let bannerIndex = 0;

function cycleBanner() {
  const bannerEl = document.querySelector('.hero');
  if (!bannerEl) return;

  bannerEl.style.backgroundImage = `url('${bannerImages[bannerIndex]}')`;
  bannerIndex = (bannerIndex + 1) % bannerImages.length;
}

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
