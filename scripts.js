// Dropdowns for Course Information
document.querySelectorAll('.course h3').forEach(course => {
    course.addEventListener('click', function() {
        let courseInfo = this.nextElementSibling;
        courseInfo.style.display = courseInfo.style.display === 'block' ? 'none' : 'block';
        this.querySelector('.dropdown').textContent = courseInfo.style.display === 'block' ? '-' : '+';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this
