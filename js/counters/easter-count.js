// Easter Countdown Script
document.addEventListener('DOMContentLoaded', function() {
    function createEasterCountdown() {
        // Calculate Easter date for current year
        function getEasterDate(year) {
            const a = year % 19;
            const b = Math.floor(year / 100);
            const c = year % 100;
            const d = Math.floor(b / 4);
            const e = b % 4;
            const f = Math.floor((b + 8) / 25);
            const g = Math.floor((b - f + 1) / 3);
            const h = (19 * a + b - d - g + 15) % 30;
            const i = Math.floor(c / 4);
            const k = c % 4;
            const l = (32 + 2 * e + 2 * i - h - k) % 7;
            const m = Math.floor((a + 11 * h + 22 * l) / 451);
            const month = Math.floor((h + l - 7 * m + 114) / 31);
            const day = ((h + l - 7 * m + 114) % 31) + 1;
            return new Date(year, month - 1, day);
        }

        const now = new Date();
        const currentYear = now.getFullYear();
        let easterDate = getEasterDate(currentYear);
        
        // If Easter has passed this year, show next year's Easter
        if (now > easterDate) {
            easterDate = getEasterDate(currentYear + 1);
        }

        // Create countdown container
        const countdownContainer = document.createElement('div');
        countdownContainer.id = 'easter-count-down';
        countdownContainer.innerHTML = `
            <div class="count-down-title">Easter Countdown</div>
            <div id="easter-countdown-display">Loading...</div>
        `;

        // Insert countdown into the page
        const mainContent = document.querySelector('main') || document.body;
        if (mainContent && mainContent.firstChild) {
            mainContent.insertBefore(countdownContainer, mainContent.firstChild);
        }

        // Update countdown every second
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = easterDate.getTime() - now;

            if (distance < 0) {
                document.getElementById('easter-countdown-display').innerHTML = "🐰 Happy Easter! 🌸";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('easter-countdown-display').innerHTML = 
                `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Listen for theme changes
    window.addEventListener('themeChanged', function(event) {
        if (event.detail.config.specialElements && 
            event.detail.config.specialElements.includes('easter-countdown')) {
            createEasterCountdown();
        } else {
            // Remove countdown if switching to different theme
            const existingCountdown = document.getElementById('easter-count-down');
            if (existingCountdown) {
                existingCountdown.remove();
            }
        }
    });

    // Create countdown if Easter theme is active on page load
    if (window.currentThemeConfig && 
        window.currentThemeConfig.specialElements && 
        window.currentThemeConfig.specialElements.includes('easter-countdown')) {
        createEasterCountdown();
    }
});