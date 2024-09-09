// Accordion Functionality
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      document.querySelectorAll('.accordion-content').forEach(item => item.style.display = 'none');
      content.style.display = 'block';
    }
  });
});

// Banner Animation
let bannerIndex = 0;
const banners = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'];
const bannerElement = document.querySelector('.banner');

function switchBanner() {
  bannerIndex = (bannerIndex + 1) % banners.length;
  bannerElement.style.backgroundImage = `url(${banners[bannerIndex]})`;
}

setInterval(switchBanner, 3000);  // Switch every 3 seconds for smoother transition

// Smooth scrolling for parallax effect
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  document.querySelector('.banner').style.backgroundPositionY = `${scrollPos * 0.5}px`;  // Parallax effect
});

// Email Submission - Open user's default email app
function sendMail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Subject and body content for the email
  const subject = `Contact from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  // Construct the mailto link and redirect the user
  window.location.href = `mailto:info@jubileebeautyschool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
