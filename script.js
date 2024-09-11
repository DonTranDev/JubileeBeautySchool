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
const banners = ['Collage.png', 'HollyTran.jpg', 'banner3.jpg'];
const switchingBanner = document.querySelector('.switching-banner');

function switchBanner() {
  bannerIndex = (bannerIndex + 1) % banners.length;
  switchingBanner.style.backgroundImage = `url(${banners[bannerIndex]})`;
}

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

  window.location.href = `mailto:info@jubileebeautyschool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
