// Accordion Functionality
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Find the parent .accordion-item and then the .accordion-content within it
    const accordionItem = button.closest('.accordion-item');
    const content = accordionItem.querySelector('.accordion-content');
    
    // Check if the content is currently open
    if (content.style.maxHeight) {
      // If open, close it
      content.style.maxHeight = null;
    } else {
      // Close all other open accordions
      document.querySelectorAll('.accordion-content').forEach(item => {
        item.style.maxHeight = null;
      });
      
      // Open the clicked accordion
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});


// Banner Image Switch (Switching Banner)
let bannerIndex = 0;
const banners = ['Collage1.png', 'HollyVietTran.png'];
const switchingBanner = document.querySelector('.switching-banner');

// Create image elements and append to the banner
function createSlides() {
  banners.forEach((banner, index) => {
    const img = document.createElement('img');
    img.src = banner;
    img.classList.add('banner-slide');
    img.style.opacity = index === 0 ? '1' : '0'; // Show the first image
    switchingBanner.appendChild(img);
  });
}

function switchBanner() {
  const slides = document.querySelectorAll('.banner-slide');
  slides[bannerIndex].style.opacity = '0'; // Hide current slide
  bannerIndex = (bannerIndex + 1) % slides.length;
  slides[bannerIndex].style.opacity = '1'; // Show next slide
}

createSlides();
setInterval(switchBanner, 3000);

// Parallax Scroll Effect (for Parallax Banner)
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  document.querySelector('.parallax-banner').style.backgroundPositionY = `${scrollPos * 0.5}px`;
});

// Email Submission
function sendMail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const subject = `Contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  window.location.href = `mailto:jubileebeautyschool@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
