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

// === Smooth scroll helper ===
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
  document.querySelector('.nav-links').classList.toggle('active');
}

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

// === (Optional) Email helper if you re-add a contact form ===
function sendMail() {
  const name = document.getElementById('name')?.value;
  const email = document.getElementById('email')?.value;
  const message = document.getElementById('message')?.value;

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const mailtoLink = `mailto:jubileebeautyschool@gmail.com?subject=Message from ${encodeURIComponent(
    name
  )}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`;
  window.location.href = mailtoLink;
}
