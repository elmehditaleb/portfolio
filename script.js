document.addEventListener("DOMContentLoaded", function() {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    // Toggle menu icon and visibility of navbar
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        let icon = menuIcon.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });

    // Smooth scrolling and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            let icon = menuIcon.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        });
    });

    // Highlight the active section in the navbar
    window.onscroll = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };

    // Handle form submission and display notifications
    document.querySelector('#contact-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        let formData = new FormData(this); // Create FormData object
        
        fetch('submit_contact.php', { // Send form data to submit_contact.php
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            const notification = document.getElementById('notification');
            notification.style.display = 'block'; // Show notification
            notification.innerHTML = data.message; // Set the message from the response
            notification.style.color = data.status === 'success' ? 'green' : 'red'; // Set color based on status
        })
        .catch(error => {
            console.error('Error:', error);
            const notification = document.getElementById('notification');
            notification.style.display = 'block'; // Show notification
            notification.innerHTML = 'An error occurred. Please try again.'; // Set error message
            notification.style.color = 'red'; // Set color for error
        });
    });
});
