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

setInterval(switchHere's the remaining portion of the **JavaScript** code for smoother, mobile-compatible animations and responsive design:

```javascript
setInterval(switchBanner, 3000);  // Faster switch for smoother animation

// Smooth scrolling for parallax effect
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  document.querySelector('.banner').style.backgroundPositionY = `${scrollPos * 0.5}px`;  // Parallax effect
});
