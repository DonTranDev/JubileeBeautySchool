document.addEventListener('DOMContentLoaded', function() {
    var hero = document.querySelector('.hero');
    hero.style.backgroundImage = 'url("IMG_4932.jpg")'; // Correctly set background
});

// Optional parallax effect
window.addEventListener('scroll', function() {
    var hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = -(window.pageYOffset * 0.5) + 'px';
});
