// Create a hamburger icon for the mobile menu
const menuIcon = document.createElement('div');
menuIcon.classList.add('menu-icon');
for (let i = 0; i < 3; i++) {
  const bar = document.createElement('div');
  bar.classList.add('bar');
  menuIcon.appendChild(bar);
}

// Get the header and mobile menu elements
const header = document.querySelector('header');
const mobileMenu = document.createElement('div');
mobileMenu.classList.add('mobile-menu');

// Clone the navigation links from the existing navigation
const navLinks = document.querySelector('nav').cloneNode(true);
navLinks.classList.add('mobile-nav');

// Append the elements to the header
mobileMenu.appendChild(menuIcon); // Place the menu icon first
mobileMenu.appendChild(navLinks);
header.appendChild(mobileMenu);

// Attach click event listener to the menu icon
menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Get the video dropdown button and dropdown content
const videoButton = document.getElementById("videoButton");
const dropdownContent = document.querySelector('.dropdown-content');

// Attach click event listener to the video dropdown button
videoButton.addEventListener("click", () => {
  dropdownContent.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById("menuIcon");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeButton = document.getElementById("closeButton"); // Get the close button element

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    dropdownContent.classList.remove('active'); // Close the dropdown content when the menu icon is clicked
  });

  closeButton.addEventListener("click", () => {
    menuIcon.classList.remove("active"); // Close the menu by removing the "active" class
    mobileMenu.classList.remove("active");
    dropdownContent.classList.remove('active'); // Close the dropdown content when the close button is clicked
  });
});
