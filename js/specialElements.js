// Theme-aware special elements manager
document.addEventListener("DOMContentLoaded", function () {
    const specialElements = {
        'halloween-message': {
            html: `
                <h1 class="Halloween">HAPPY </h1>
                <h1 class="Halloween">HALL<span style="color: darkorange">O</span>WEEN!</h1>
            `,
            parent: 'hero-msg',
            position: 'beforeend'
        },
        'halloween-countdown': {
            html: `
                <h1 class="count-down-title">Days until Halloween:</h1>
                <p id="halloween-count-down"></p>
            `,
            parent: 'hero-msg', 
            position: 'beforeend',
            script: './js/halloween-count.js'
        },
        'thanksgiving-message': {
            html: `
                <h1 class="Thanksgiving" style="text-align: center; color: #8B4513;">
                    <span style="color: #8B4513;">H</span>
                    <span style="color: #D2691E;">A</span>
                    <span style="color: #8B4513;">P</span>
                    <span style="color: #D2691E;">P</span>
                    <span style="color: #8B4513;">Y</span>
                    &nbsp;
                    <span style="color: #D2691E;">T</span>
                    <span style="color: #8B4513;">H</span>
                    <span style="color: #D2691E;">A</span>
                    <span style="color: #8B4513;">N</span>
                    <span style="color: #D2691E;">K</span>
                    <span style="color: #8B4513;">S</span>
                    <span style="color: #D2691E;">G</span>
                    <span style="color: #8B4513;">I</span>
                    <span style="color: #D2691E;">V</span>
                    <span style="color: #8B4513;">I</span>
                    <span style="color: #D2691E;">N</span>
                    <span style="color: #8B4513;">G</span>
                    <span style="color: #D2691E;">!</span>
                    <br>
                    <span style="font-size: 0.7em; color: #2F1B14;">🦃 🍂 🌽 Grateful for family, friends, and blessings! 🥧 🍁 🦃</span>
                </h1>
            `,
            parent: 'hero-msg',
            position: 'beforeend'
        },
        'thanksgiving-countdown': {
            html: `
                <h1 class="count-down-title">Days until <span style="color: #8B4513; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">Thanksgiving 🦃</span>:</h1>
                <p id="thanksgiving-count-down"></p>
            `,
            parent: 'hero-msg',
            position: 'beforeend',
            script: './js/thanksgiving-count.js'
        },
        'christmas-message': {
            html: `
                <h1 class="Christmas" style="text-align: center;">
                    <span style="color: red;">M</span>
                    <span style="color: green;">E</span>
                    <span style="color: red;">R</span>
                    <span style="color: green;">R</span>
                    <span style="color: red;">Y</span>
                    &nbsp;
                    <span style="color: green;">C</span>
                    <span style="color: red;">H</span>
                    <span style="color: green;">R</span>
                    <span style="color: red;">I</span>
                    <span style="color: green;">S</span>
                    <span style="color: red;">T</span>
                    <span style="color: green;">M</span>
                    <span style="color: red;">A</span>
                    <span style="color: green;">S</span>
                    <span style="color: red;">!</span>
                </h1>
            `,
            parent: 'hero-msg',
            position: 'beforeend'
        },
        'christmas-countdown': {
            html: `
                <h1 class="count-down-title">Days until <span style="color: darkgreen">Christmas</span>:</h1>
                <p id="christmas-count-down"></p>
            `,
            parent: 'hero-msg',
            position: 'beforeend',
            script: './js/christmas-count.js'
        },
        'christmas-background': {
            html: `
                <img class="background snow-background" src="images/christmas-background-with-falling-snow_275806-1176.webp" alt="snow-background">
            `,
            parent: 'content',
            position: 'beforeend'
        },
        'new-year-message': {
            html: `
                <h1 class="Christmas" style="text-align: center;">
                    <span style="color: gold;">H</span>
                    <span style="color: silver;">A</span>
                    <span style="color: gold;">P</span>
                    <span style="color: silver;">P</span>
                    <span style="color: gold;">Y</span>
                    &nbsp;
                    <span style="color: silver;">N</span>
                    <span style="color: gold;">E</span>
                    <span style="color: silver;">W</span>
                    &nbsp;
                    <span style="color: gold;">Y</span>
                    <span style="color: silver;">E</span>
                    <span style="color: gold;">A</span>
                    <span style="color: silver;">R</span>
                    <span style="color: gold;">!</span>
                    <br>
                    <span style="font-size: 0.8em; color: #444;">🎊 ✨ Here's to new beginnings! ✨ 🎊</span>
                </h1>
            `,
            parent: 'hero-msg',
            position: 'beforeend'
        }
    };
    
    const audioElements = {
        halloween: 'Audio/Come Little Children (From \'Hocus Pocus\') (Children of the Night).mp3',
        christmas: 'Audio/All I Want for Christmas is You.mp3',
        normal: null
    };
    
    function clearSpecialElements() {
        // Remove all special elements
        document.querySelectorAll('[data-special-element]').forEach(el => el.remove());
        
        // Remove audio
        const audioElement = document.querySelector('#themed-audio');
        if (audioElement) {
            audioElement.remove();
        }
    }
    
    function addSpecialElements(theme) {
        const themeConfig = window.currentThemeConfig;
        if (!themeConfig || !themeConfig.specialElements) return;
        
        themeConfig.specialElements.forEach(elementKey => {
            const element = specialElements[elementKey];
            if (element) {
                const container = document.getElementById(element.parent);
                if (container) {
                    const div = document.createElement('div');
                    div.innerHTML = element.html;
                    div.setAttribute('data-special-element', elementKey);
                    container.appendChild(div);
                    
                    // Load associated script if needed
                    if (element.script) {
                        const script = document.createElement('script');
                        script.src = element.script;
                        document.head.appendChild(script);
                    }
                }
            }
        });
        
        // Add themed audio
        const audioSrc = audioElements[theme];
        if (audioSrc) {
            const audioContainer = document.createElement('a');
            audioContainer.hidden = true;
            audioContainer.id = 'themed-audio';
            audioContainer.innerHTML = `
                <audio controls autoplay loop>
                    <source src="${audioSrc}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
            document.body.appendChild(audioContainer);
        }
    }
    
    function updateSpecialElements() {
        const theme = window.currentTheme || 'normal';
        clearSpecialElements();
        addSpecialElements(theme);
    }
    
    // Listen for theme changes
    window.addEventListener('themeChanged', updateSpecialElements);
    
    // Initial setup
    if (window.currentTheme) {
        updateSpecialElements();
    } else {
        // Wait for theme manager
        setTimeout(updateSpecialElements, 200);
    }
});