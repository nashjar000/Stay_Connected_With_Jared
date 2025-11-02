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
                specialElements: ['halloween-countdown']
            },
            thanksgiving: {
                css: './styles/Thanksgiving-theme.css',
                logo: './images/mylogo-Red.png',
                favicon: './images/mylogo-Red.png',
                quotes: 'thanksgiving',
                audio: null,
                specialElements: ['thanksgiving-countdown']
            },
            christmas: {
                css: './styles/Christmas-theme.css',
                logo: './images/mylogo-red.png',
                favicon: 'images/mylogo-green.png',
                quotes: 'christmas',
                audio: 'Audio/All I Want for Christmas is You.mp3',
                specialElements: ['christmas-countdown', 'christmas-background']
            }
        };
        
        this.currentTheme = this.determineSeasonalTheme();
        this.manualOverride = localStorage.getItem('themeOverride');
    }

    determineSeasonalTheme() {
        const now = new Date();
        const month = now.getMonth() + 1; // JavaScript months are 0-based
        const day = now.getDate();
        const year = now.getFullYear();

        // Halloween Season: September 15 - October 31
        if ((month === 9 && day >= 15) || month === 10) {
            return 'halloween';
        }
        
        // Calculate Thanksgiving (fourth Thursday of November)
        const getThanksgivingDate = (year) => {
            const firstOfNovember = new Date(year, 10, 1); // Month 10 = November (0-based)
            const firstThursday = new Date(firstOfNovember);
            const dayOfWeek = firstOfNovember.getDay(); // 0 = Sunday, 4 = Thursday
            const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
            firstThursday.setDate(1 + daysUntilThursday);
            
            // Fourth Thursday is 3 weeks after first Thursday
            const fourthThursday = new Date(firstThursday);
            fourthThursday.setDate(firstThursday.getDate() + 21);
            
            return fourthThursday.getDate();
        };
        
        const thanksgivingDate = getThanksgivingDate(year);
        const dayAfterThanksgiving = thanksgivingDate + 1;
        
        // Thanksgiving Season: November 1 - day of Thanksgiving
        if (month === 11 && day <= thanksgivingDate) {
            return 'thanksgiving';
        }
        
        // Christmas Season: Day after Thanksgiving - January 7
        if ((month === 11 && day >= dayAfterThanksgiving) || month === 12 || (month === 1 && day <= 7)) {
            return 'christmas';
        }
        
        // Normal theme: January 8 - September 14
        return 'normal';
    }

    getActiveSpecialElements() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const year = now.getFullYear();
        const currentTheme = this.getCurrentTheme();
        const baseElements = [...(this.themes[currentTheme].specialElements || [])];
        
        // Remove date-specific messages first
        const filteredElements = baseElements.filter(element => 
            !['halloween-message', 'thanksgiving-message', 'christmas-message', 'new-year-message'].includes(element)
        );
        
        // Add date-specific messages only on the actual holidays
        if (month === 10 && day === 31) { // Halloween
            filteredElements.push('halloween-message');
        } else if (month === 11 && day === this.getThanksgivingDate(year)) { // Thanksgiving
            filteredElements.push('thanksgiving-message');
        } else if (month === 12 && day === 25) { // Christmas
            filteredElements.push('christmas-message');
        } else if (month === 1 && day === 1) { // New Year's Day
            filteredElements.push('new-year-message');
        }
        
        return filteredElements;
    }
    
    getThanksgivingDate(year) {
        const firstOfNovember = new Date(year, 10, 1);
        const firstThursday = new Date(firstOfNovember);
        const dayOfWeek = firstOfNovember.getDay();
        const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
        firstThursday.setDate(1 + daysUntilThursday);
        
        const fourthThursday = new Date(firstThursday);
        fourthThursday.setDate(firstThursday.getDate() + 21);
        
        return fourthThursday.getDate();
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
        
        // Create dynamic theme config with date-specific elements
        const dynamicThemeConfig = {
            ...themeConfig,
            specialElements: this.getActiveSpecialElements()
        };
        
        // Store current theme for other scripts
        window.currentTheme = theme;
        window.currentThemeConfig = dynamicThemeConfig;
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme, config: dynamicThemeConfig }
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