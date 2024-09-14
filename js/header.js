document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    // Create header element
    const headerElement = document.createElement("header");

    // Add stylesheets
    const style1 = document.createElement("link");
    style1.rel = "stylesheet";
    style1.href = "./styles/Halloween-theme.css";
    const style2 = document.createElement("link");
    style2.rel = "stylesheet";
    style2.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    const style3 = document.createElement("link");
    style3.rel = "stylesheet";
    style3.href = "./styles/scroll-button.css";

    // Add background image
    const backgroundImage = document.createElement("style");
    backgroundImage.innerHTML = "body{background:url(./images/spider-web.avif)no-repeat center/cover fixed; background-color:rgba(0,0,0,0.7);}"
    document.head.appendChild(backgroundImage);

    // Append styles to the document head
    document.head.appendChild(style1);
    document.head.appendChild(style2);
    document.head.appendChild(style3);

    // Create logo link and image
    const logoLink = document.createElement("a");
    logoLink.href = "index.html";
    const logoImg = document.createElement("img");
    logoImg.className = "logo";
    logoImg.src = "images/mylogo-halloween.png";
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
            href: "index.html",
            text: "Home"
        },
        {
            href: "about-me.html",
            text: "About Me (FAQ)"
        },
        {
            href: "contact.html",
            text: "Contact Me"
        },
        {
            href: "favorite-music.html",
            text: "Favorite Music"
        },
        {
            href: "painting.html",
            text: "Paintings"
        },
        {
            href: "recipies.html",
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
    dropbtn.id = "videoButton";
    dropbtn.innerHTML = 'Videos <i class="fa fa-caret-down"></i>';
    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";
    const videoLinks = [{
            href: "video-journals.html",
            text: "Video Journals"
        },
        {
            href: "piano.html",
            text: "Piano"
        },
        {
            href: "videos.html",
            text: "Other"
        },
    ];

    videoLinks.forEach(item => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.text;
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
    nav.appendChild(desktopDropdown);

    // Append elements to header
    headerElement.appendChild(logoLink);
    headerElement.appendChild(menuIcon);
    headerElement.appendChild(mobileMenu);
    headerElement.appendChild(nav);

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
    source2.src = "Audio/rain-lightning-thunder-121739.mp3";
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
});