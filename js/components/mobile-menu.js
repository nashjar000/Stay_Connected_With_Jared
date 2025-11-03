// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait for header to be fully initialized
    setTimeout(() => {
        const menuIcon = document.getElementById('menuIcon');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeButton = document.getElementById('closeButton');

        if (menuIcon && mobileMenu) {
            // Remove any existing event listeners to avoid duplicates
            menuIcon.replaceWith(menuIcon.cloneNode(true));
            const newMenuIcon = document.getElementById('menuIcon');
            
            // Add click event listener to menu icon
            newMenuIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Menu icon clicked'); // Debug log
                
                newMenuIcon.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                
                // Debug log
                console.log('Mobile menu active:', mobileMenu.classList.contains('active'));
            });
        }

        if (closeButton && mobileMenu) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked'); // Debug log
                
                const menuIcon = document.getElementById('menuIcon');
                if (menuIcon) {
                    menuIcon.classList.remove('active');
                }
                mobileMenu.classList.remove('active');
            });
        }

        // Close mobile menu when clicking on menu links
        const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
        if (mobileMenuLinks) {
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Don't prevent default for dropdown links - let them navigate normally
                    if (this.closest('.dropdown-content')) {
                        console.log('Dropdown link clicked:', this.href); // Debug
                        // Just close the menu, don't prevent navigation
                    }
                    const menuIcon = document.getElementById('menuIcon');
                    if (menuIcon) {
                        menuIcon.classList.remove('active');
                    }
                    mobileMenu.classList.remove('active');
                });
            });
        }

        // Handle video dropdown in mobile menu - now handled by inline onclick
        console.log('Mobile dropdown handled by inline onclick function'); // Debug log

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !newMenuIcon?.contains(e.target)) {
                    const menuIcon = document.getElementById('menuIcon');
                    if (menuIcon) {
                        menuIcon.classList.remove('active');
                    }
                    mobileMenu.classList.remove('active');
                }
            }
        });
    }, 200); // Wait for header initialization
});
