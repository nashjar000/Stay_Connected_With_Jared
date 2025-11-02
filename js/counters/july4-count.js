// July 4th Independence Day Countdown Script
document.addEventListener('DOMContentLoaded', function() {
    function createJuly4Countdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let july4Date = new Date(currentYear, 6, 4); // July 4th (month is 0-indexed)
        
        // If July 4th has passed this year, show next year's July 4th
        if (now > july4Date) {
            july4Date = new Date(currentYear + 1, 6, 4);
        }

        // Create countdown container
        const countdownContainer = document.createElement('div');
        countdownContainer.id = 'july-fourth-count-down';
        countdownContainer.innerHTML = `
            <div class="count-down-title">Independence Day Countdown</div>
            <div id="july4-countdown-display">Loading...</div>
        `;

        // Insert countdown into the page
        const mainContent = document.querySelector('main') || document.body;
        if (mainContent && mainContent.firstChild) {
            mainContent.insertBefore(countdownContainer, mainContent.firstChild);
        }

        // Update countdown every second
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = july4Date.getTime() - now;

            if (distance < 0) {
                document.getElementById('july4-countdown-display').innerHTML = "🇺🇸 Happy Independence Day! 🎆";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('july4-countdown-display').innerHTML = 
                `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Listen for theme changes
    window.addEventListener('themeChanged', function(event) {
        if (event.detail.config.specialElements && 
            event.detail.config.specialElements.includes('july4-countdown')) {
            createJuly4Countdown();
        } else {
            // Remove countdown if switching to different theme
            const existingCountdown = document.getElementById('july-fourth-count-down');
            if (existingCountdown) {
                existingCountdown.remove();
            }
        }
    });

    // Create countdown if July 4th theme is active on page load
    if (window.currentThemeConfig && 
        window.currentThemeConfig.specialElements && 
        window.currentThemeConfig.specialElements.includes('july4-countdown')) {
        createJuly4Countdown();
    }
});