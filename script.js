// Select elements for the navigation menu and form
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Scroll functionality to highlight active section link
window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });
};

// Toggle menu icon and navbar active state
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// Form submission functionality
const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
      fullName: document.querySelector('input[name="fullName"]').value,
      email: document.querySelector('input[name="email"]').value,
      phoneNumber: document.querySelector('input[name="phoneNumber"]').value,
      subject: document.querySelector('input[name="subject"]').value,
      message: document.querySelector('textarea[name="message"]').value
    };

    // Send data to the backend server
    fetch('http://localhost:3000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
      alert(data); // Alert success message
      form.reset(); // Reset the form after successful submission
    })
    .catch(error => console.error('Error:', error));
  });
}
