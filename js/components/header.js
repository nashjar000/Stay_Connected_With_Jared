document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    // Wait for theme manager to initialize
    const initializeHeader = () => {
        const themeConfig = window.currentThemeConfig || {
            css: './styles/style.css',
            logo: './images/mylogo.png'
        };

        // Detect if we're in a subdirectory for proper path handling
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';

        // Create header element
        const headerElement = document.createElement("header");

    // Add stylesheets
    const style1 = document.createElement("link");
    style1.rel = "stylesheet";
    style1.href = themeConfig.css;
    const style2 = document.createElement("link");
    style2.rel = "stylesheet";
    style2.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    const style3 = document.createElement("link");
    style3.rel = "stylesheet";
    style3.href = `${pathPrefix}styles/scroll-button.css`;

    // Add background image
    const backgroundImage = document.createElement("style");
    // backgroundImage.innerHTML = "body{background:url(./images/christmas-background-with-falling-snow_275806-1176.webp)no-repeat center/cover fixed; background-color:rgba(0,0,0,0.7);}"
    document.head.appendChild(backgroundImage);

    // Append styles to the document head
    document.head.appendChild(style1);
    document.head.appendChild(style2);
    document.head.appendChild(style3);

    // Create logo link and image
    const logoLink = document.createElement("a");
    logoLink.href = `${pathPrefix}index.html`;
    const logoImg = document.createElement("img");
    logoImg.className = "logo";
    logoImg.src = themeConfig.logo;
    logoImg.alt = "Stay Connected With Jared Logo";
    logoLink.appendChild(logoImg);

    // Create menu icon
    const menuIcon = document.createElement("div");
    menuIcon.className = "menu-icon";
    menuIcon.id = "menuIcon";
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement("div");
        bar.className = "bar";
        menuIcon.appendChild(bar);
    }

    // Create mobile menu
    const mobileMenu = document.createElement("nav");
    mobileMenu.className = "mobile-menu";
    mobileMenu.id = "mobileMenu";

    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.id = "closeButton";
    closeButton.innerHTML = "&times;";
    mobileMenu.appendChild(closeButton);

    const menuItems = [{
            href: `${pathPrefix}index.html`,
            text: "Home"
        },
        {
            href: `${pathPrefix}about-me.html`,
            text: "About Me (FAQ)"
        },
        {
            href: `${pathPrefix}contact.html`,
            text: "Contact Me"
        },
        {
            href: `${pathPrefix}favorite-music.html`,
            text: "Favorite Music"
        },
        {
            href: `${pathPrefix}painting.html`,
            text: "Paintings"
        },
        {
            href: `${pathPrefix}recipies.html`,
            text: "Recipes"
        },
    ];

    menuItems.forEach(item => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.text;
        mobileMenu.appendChild(link);
    });

    // Create dropdown menu
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";
    const dropbtn = document.createElement("button");
    dropbtn.className = "dropbtn";
    dropbtn.id = "mobileVideoButton";
    dropbtn.innerHTML = 'Videos';
    dropbtn.onclick = function() {
        const content = this.nextElementSibling;
        console.log('Mobile dropdown clicked', content); // Debug
        if (content.style.display === "block") {
            content.style.display = "none";
            console.log('Mobile dropdown hidden'); // Debug
        } else {
            content.style.display = "block";
            console.log('Mobile dropdown shown'); // Debug
        }
    };
    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";
    dropdownContent.style.display = "none";
    const videoLinks = [{
            href: pathPrefix ? "video-journals.html" : "pages/video-journals.html",
            text: "Video Journals"
        },
        {
            href: `${pathPrefix}piano.html`,
            text: "Piano"
        },
        {
            href: `${pathPrefix}videos.html`,
            text: "Other"
        },
    ];

    videoLinks.forEach(item => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.text;
        console.log('Creating mobile video link:', item.href, item.text); // Debug
        
        // Add click handler to close mobile menu when dropdown link is clicked
        link.addEventListener('click', function(e) {
            console.log('Mobile dropdown link clicked:', this.href); // Debug
            console.log('Current location:', window.location.href); // Debug
            
            // Make sure the link is valid before navigating
            if (this.href && this.href !== '#') {
                const menuIcon = document.getElementById('menuIcon');
                const mobileMenu = document.getElementById('mobileMenu');
                if (menuIcon) {
                    menuIcon.classList.remove('active');
                }
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
                // Let the browser handle navigation normally
            } else {
                console.log('Invalid link detected'); // Debug
                e.preventDefault();
            }
        });
        
        dropdownContent.appendChild(link);
    });

    dropdown.appendChild(dropbtn);
    dropdown.appendChild(dropdownContent);
    mobileMenu.appendChild(dropdown);

    // Create desktop navigation
    const nav = document.createElement("nav");
    menuItems.forEach(item => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.text;
        nav.appendChild(link);
    });

    // Add dropdown menu to desktop navigation
    const desktopDropdown = dropdown.cloneNode(true);
    const desktopVideoButton = desktopDropdown.querySelector('.dropbtn');
    const desktopDropdownContent = desktopDropdown.querySelector('.dropdown-content');
    if (desktopVideoButton) {
        desktopVideoButton.id = "desktopVideoButton";
        desktopVideoButton.innerHTML = 'Videos';
        // Remove onclick for desktop - it will use CSS hover instead
        desktopVideoButton.onclick = null;
    }
    if (desktopDropdownContent) {
        desktopDropdownContent.style.display = "";  // Reset to CSS control
    }
    nav.appendChild(desktopDropdown);

    // Create user status container
    const userStatusDiv = document.createElement("div");
    userStatusDiv.id = "user-status";
    userStatusDiv.className = "user-status-container";

    // Append elements to header
    headerElement.appendChild(logoLink);
    headerElement.appendChild(menuIcon);
    headerElement.appendChild(mobileMenu);
    headerElement.appendChild(nav);
    headerElement.appendChild(userStatusDiv);

    // Append header element to DOM
    header.appendChild(headerElement);

    // Add event listeners
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    closeButton.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

    // Create storm div
    const stormDiv = document.createElement("div");
    stormDiv.className = "storm";
    header.appendChild(stormDiv);

    // Create hidden audio elements
    const audio1 = document.createElement("audio");
    audio1.controls = true;
    audio1.autoplay = true;
    audio1.loop = true;
    audio1.hidden = true;

    // Uncomment and update the source as needed
    // const source1 = document.createElement("source");
    // source1.src = "Audio/rain-lightning-thunder-121739.mp3";
    // source1.type = "audio/mpeg";
    // audio1.appendChild(source1);

    const buttonBox1 = document.createElement("div");
    buttonBox1.className = "button-box";
    header.appendChild(audio1);
    header.appendChild(buttonBox1);

    const audio2 = document.createElement("audio");
    audio2.controls = true;
    audio2.autoplay = true;
    audio2.loop = true;
    audio2.hidden = true;

    // Uncomment and update the source as needed
    const source2 = document.createElement("source");
    // source2.src = "./Audio/rain-lightning-thunder-121739.mp3";
    source2.type = "audio/mpeg";
    audio2.appendChild(source2);

    const buttonBox2 = document.createElement("div");
    buttonBox2.className = "button-box";
    header.appendChild(audio2);
    header.appendChild(buttonBox2);

    // Screen flashing function
    // function flashScreen() {
    //     const flash = document.createElement("div");
    //     flash.style.position = "fixed";
    //     flash.style.top = "0";
    //     flash.style.left = "0";
    //     flash.style.width = "100%";
    //     flash.style.height = "100%";
    //     flash.style.backgroundColor = "white";
    //     flash.style.opacity = "0.8";
    //     flash.style.zIndex = "1000";
    //     flash.style.transition = "opacity 0.5s ease-in-out";

    //     document.body.appendChild(flash);

    //     setTimeout(() => {
    //         flash.style.opacity = "0";
    //         setTimeout(() => {
    //             document.body.removeChild(flash);
    //         }, 500);
    //     }, 100);
    // }

    // Call the flashScreen function
    // flashScreen();
    };

    // Initialize header immediately or wait for theme manager
    if (window.currentThemeConfig) {
        initializeHeader();
    } else {
        window.addEventListener('themeChanged', initializeHeader, { once: true });
        // Fallback timeout in case theme manager doesn't load
        setTimeout(initializeHeader, 100);
    }

    // Initialize user status in nav
    async function initUserStatus() {
        // Wait for auth to be available
        let attempts = 0;
        while (!window.auth && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.auth) {
            console.warn('Auth not available for user status');
            return;
        }

        const userStatusContainer = document.getElementById('user-status');
        if (!userStatusContainer) {
            return;
        }

        // Detect if we're in a subdirectory
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : './';

        try {
            const user = await window.auth.getCurrentUser();

            if (user) {
                // User is logged in
                const displayName = user.user_metadata?.display_name || user.email.split('@')[0];
                const isAdmin = await window.auth.isAdmin(user.id);
                const isApproved = isAdmin || await window.auth.isUserApproved(user.id);

                startPresenceHeartbeat(user);

                // Show admin link if user is admin
                const adminLink = isAdmin ? `<a href="${pathPrefix}admin-dashboard.html" class="admin-link">Admin Dashboard</a>` : '';

                userStatusContainer.innerHTML = `
                    <div class="user-status-logged-in">
                        <span class="user-greeting">Hi, ${displayName}!</span>
                        ${isApproved ? '<span class="status-badge approved">✓ Approved</span>' : '<span class="status-badge pending">⏳ Pending</span>'}
                        ${adminLink}
                        <button onclick="handleDeleteAccount()" class="delete-button">Delete Account</button>
                        <button onclick="handleLogout()" class="logout-button">Log Out</button>
                    </div>
                `;
            } else {
                // User is not logged in
                stopPresenceHeartbeat();
                userStatusContainer.innerHTML = `
                    <div class="user-status-logged-out">
                        <a href="${pathPrefix}auth-login.html" class="login-link">Log In</a>
                        <a href="${pathPrefix}auth-signup.html" class="signup-link">Sign Up</a>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading user status:', error);
            // Show login option on error
            userStatusContainer.innerHTML = `
                <div class="user-status-logged-out">
                    <a href="${pathPrefix}auth-login.html" class="login-link">Log In</a>
                </div>
            `;
        }
    }

    async function handleLogout() {
        const confirmed = confirm('Are you sure you want to log out?');
        if (confirmed) {
            stopPresenceHeartbeat();
            await window.auth.signOut();
            window.location.href = `${pathPrefix}index.html`;
        }
    }

    async function handleDeleteAccount() {
        const confirmed = confirm('This will permanently delete your account. Are you sure?');
        if (!confirmed) {
            return;
        }

        const result = await window.auth.deleteAccount();

        if (!result.success) {
            alert(result.error || 'Unable to delete account. Please try again.');
            return;
        }

        stopPresenceHeartbeat();
        await window.auth.signOut();
        alert('Your account has been deleted.');
        window.location.href = `${pathPrefix}index.html`;
    }

    function startPresenceHeartbeat(user) {
        if (window.presenceInterval) {
            return;
        }

        window.auth.updatePresence(user);
        window.presenceInterval = setInterval(() => {
            window.auth.updatePresence(user);
        }, 60000);
    }

    function stopPresenceHeartbeat() {
        if (window.presenceInterval) {
            clearInterval(window.presenceInterval);
            window.presenceInterval = null;
        }
    }

    // Make functions available globally
    window.handleLogout = handleLogout;
    window.handleDeleteAccount = handleDeleteAccount;

    // Initialize user status when header is ready
    setTimeout(initUserStatus, 500);
});