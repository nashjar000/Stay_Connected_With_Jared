// Automatic Seasonal Theme Manager
class ThemeManager {
    constructor() {
        this.themes = {
            normal: {
                css: './styles/style.css',
                logo: './images/mylogo.png',
                favicon: 'images/mylogo.png',
                quotes: 'normal',
                audio: null,
                specialElements: []
            },
            halloween: {
                css: './styles/Halloween-theme.css',
                logo: './images/mylogo-halloween.png',
                favicon: 'images/mylogo-halloween.png',
                quotes: 'halloween',
                audio: 'Audio/Come Little Children (From \'Hocus Pocus\') (Children of the Night).mp3',
                specialElements: ['halloween-message', 'halloween-countdown']
            },
            christmas: {
                css: './styles/Christmas-theme.css',
                logo: './images/mylogo-christmas.png',
                favicon: 'images/mylogo-christmas.png',
                quotes: 'christmas',
                audio: 'Audio/All I Want for Christmas is You.mp3',
                specialElements: ['christmas-message', 'christmas-countdown']
            }
        };
        
        this.currentTheme = this.determineSeasonalTheme();
        this.manualOverride = localStorage.getItem('themeOverride');
    }

    determineSeasonalTheme() {
        const now = new Date();
        const month = now.getMonth() + 1; // JavaScript months are 0-based
        const day = now.getDate();

        // Halloween Season: September 15 - October 31
        if ((month === 9 && day >= 15) || month === 10) {
            return 'halloween';
        }
        
        // Christmas Season: November 1 - January 7
        if (month === 11 || month === 12 || (month === 1 && day <= 7)) {
            return 'christmas';
        }
        
        // Normal theme: January 8 - September 14
        return 'normal';
    }

    getCurrentTheme() {
        // Return manual override if exists, otherwise use seasonal theme
        return this.manualOverride || this.currentTheme;
    }

    setManualTheme(themeName) {
        if (this.themes[themeName]) {
            this.manualOverride = themeName;
            localStorage.setItem('themeOverride', themeName);
            this.applyTheme(themeName);
        }
    }

    clearManualOverride() {
        this.manualOverride = null;
        localStorage.removeItem('themeOverride');
        this.applyTheme(this.currentTheme);
    }

    applyTheme(themeName = null) {
        const theme = themeName || this.getCurrentTheme();
        const themeConfig = this.themes[theme];
        
        // Apply CSS
        this.loadCSS(themeConfig.css);
        
        // Apply favicon
        this.setFavicon(themeConfig.favicon);
        
        // Store current theme for other scripts
        window.currentTheme = theme;
        window.currentThemeConfig = themeConfig;
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme, config: themeConfig }
        }));
    }

    loadCSS(cssFile) {
        // Remove existing theme CSS
        const existingThemeCSS = document.querySelectorAll('link[data-theme-css]');
        existingThemeCSS.forEach(link => link.remove());
        
        // Add base style.css if not present
        if (!document.querySelector('link[href*="styles/style.css"]')) {
            const baseCSS = document.createElement('link');
            baseCSS.rel = 'stylesheet';
            baseCSS.href = './styles/style.css';
            baseCSS.setAttribute('data-base-css', 'true');
            document.head.appendChild(baseCSS);
        }
        
        // Add theme CSS
        if (cssFile !== './styles/style.css') {
            const themeCSS = document.createElement('link');
            themeCSS.rel = 'stylesheet';
            themeCSS.href = cssFile;
            themeCSS.setAttribute('data-theme-css', 'true');
            document.head.appendChild(themeCSS);
        }
    }

    setFavicon(faviconPath) {
        const favicon = document.querySelector('link[rel="icon"]') || 
                       document.querySelector('link[rel="shortcut icon"]');
        if (favicon) {
            favicon.href = faviconPath;
        }
    }

    getThemeInfo() {
        const currentTheme = this.getCurrentTheme();
        return {
            current: currentTheme,
            seasonal: this.currentTheme,
            isManualOverride: !!this.manualOverride,
            config: this.themes[currentTheme]
        };
    }

    // Debug method to test different dates
    testDate(testDate) {
        const originalDate = Date;
        global.Date = class extends Date {
            constructor(...args) {
                if (args.length === 0) {
                    return testDate;
                }
                return new originalDate(...args);
            }
        };
        
        const theme = this.determineSeasonalTheme();
        global.Date = originalDate;
        return theme;
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.themeManager = new ThemeManager();
    window.themeManager.applyTheme();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}