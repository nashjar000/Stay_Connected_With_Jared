// Theme-aware logo updater
document.addEventListener("DOMContentLoaded", function () {
    function updateLogos() {
        const themeConfig = window.currentThemeConfig;
        if (!themeConfig) return;
        
        // Update main logo
        const mainLogo = document.querySelector('.logo-img-big');
        if (mainLogo) {
            mainLogo.src = themeConfig.logo;
        }
    }
    
    // Listen for theme changes
    window.addEventListener('themeChanged', updateLogos);
    
    // Initial setup
    if (window.currentThemeConfig) {
        updateLogos();
    } else {
        setTimeout(updateLogos, 100);
    }
});