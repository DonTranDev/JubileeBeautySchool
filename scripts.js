document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navToggle = document.createElement('button');
    navToggle.textContent = '☰';
    navToggle.classList.add('nav-toggle');
    navbar.insertBefore(navToggle, navbar.firstChild);

    navToggle.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    // Handle dropdown menu hover
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdown.addEventListener('mouseover', () => {
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            setTimeout(() => {
                if (dropdownMenu.style.opacity === '0') {
                    dropdownMenu.style.display = 'none';
                }
            }, 300); // Matches the transition duration
        });

        dropdownMenu.addEventListener('mouseover', () => {
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
        });

        dropdownMenu.addEventListener('mouseleave', () => {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            setTimeout(() => {
                if (dropdownMenu.style.opacity === '0') {
                    dropdownMenu.style.display = 'none';
                }
            }, 300); // Matches the transition duration
        });
    });
});
