// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for the hero section
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    parallax.style.backgroundPositionY = -(scrollPosition * 0.5) + 'px';
});
