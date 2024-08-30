// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select all course headers
    const courseHeaders = document.querySelectorAll('.course h3');

    // Iterate through each course header
    courseHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the next sibling element (course info)
            const courseInfo = this.nextElementSibling;
            
            // Toggle the display of the course info
            if (courseInfo.style.display === 'block') {
                courseInfo.style.display = 'none';
                this.querySelector('.dropdown').textContent = '+'; // Change symbol back to '+'
            } else {
                courseInfo.style.display = 'block';
                this.querySelector('.dropdown').textContent = '-'; // Change symbol to '-'
            }
        });
    });
});
