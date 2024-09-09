document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navToggle = document.createElement('button');
    navToggle.textContent = '☰';
    navToggle.classList.add('nav-toggle');
    navbar.insertBefore(navToggle, navbar.firstChild);

    navToggle.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    // Handle dropdown menu hover for courses and services
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdown.addEventListener('mouseover', () => {
            dropdownMenu.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownMenu.classList.remove('show');
        });

        // Ensure dropdown content stays visible while hovering over the content
        const dropdownContents = dropdown.querySelectorAll('.dropdown-content');

        dropdownContents.forEach(content => {
            content.addEventListener('mouseover', () => {
                dropdownMenu.classList.add('show');
            });

            content.addEventListener('mouseleave', () => {
                dropdownMenu.classList.remove('show');
            });
        });
    });

    // Optional: close the dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target)) {
            const openMenus = document.querySelectorAll('.dropdown-menu.show');
            openMenus.forEach(menu => menu.classList.remove('show'));
        }
    });
});
