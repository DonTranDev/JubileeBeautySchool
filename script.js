// Accordion Functionalities
const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
    button.classList.toggle('active');
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

setInterval(switchBanner, 3000);  // Faster switch interval
