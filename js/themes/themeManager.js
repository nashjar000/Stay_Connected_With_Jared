// Automatic Seasonal Theme Manager
class ThemeManager {
    constructor() {
        // Detect if we're in a subdirectory
        this.pathPrefix = window.location.pathname.includes('/pages/') ? '../' : './';
        
        this.themes = {
            normal: {
                css: `${this.pathPrefix}styles/style.css`,
                logo: `${this.pathPrefix}images/mylogo.png`,
                favicon: `${this.pathPrefix}images/mylogo.png`,
                quotes: 'normal',
                audio: null,
                specialElements: []
            },
            valentine: {
                css: `${this.pathPrefix}styles/Valentine-theme.css`,
                logo: `${this.pathPrefix}images/mylogo-Red.png`,
                favicon: `${this.pathPrefix}images/mylogo-Red.png`,
                quotes: 'valentine',
                audio: `${this.pathPrefix}Audio/All You Need Is Love - The Beatles.mp3`,
                specialElements: ['valentine-countdown']
            },
            easter: {
                css: `${this.pathPrefix}styles/Easter-theme.css`,
                logo: `${this.pathPrefix}images/mylogo-Red.png`,
                favicon: `${this.pathPrefix}images/mylogo-Red.png`,
                quotes: 'easter',
                audio: null,
                specialElements: ['easter-countdown']
            },
            july4: {
                css: `${this.pathPrefix}styles/July-Fourth-theme.css`,
                logo: `${this.pathPrefix}images/mylogo.png`,
                favicon: `${this.pathPrefix}images/mylogo.png`,
                quotes: 'july4',
                audio: null,
                specialElements: ['july4-countdown']
            },
            halloween: {
                css: `${this.pathPrefix}styles/Halloween-theme.css`,
                logo: `${this.pathPrefix}images/mylogo-halloween.png`,
                favicon: `${this.pathPrefix}images/mylogo-halloween.png`,
                quotes: 'halloween',
                audio: `${this.pathPrefix}Audio/Come Little Children (From 'Hocus Pocus') (Children of the Night).mp3`,
                specialElements: ['halloween-countdown']
            },
            thanksgiving: {
                css: `${this.pathPrefix}styles/Thanksgiving-theme.css`,
                logo: `${this.pathPrefix}images/mylogo-Red.png`,
                favicon: `${this.pathPrefix}images/mylogo-Red.png`,
                quotes: 'thanksgiving',
                audio: null,
                specialElements: ['thanksgiving-countdown']
            },
            christmas: {
                css: `${this.pathPrefix}styles/Christmas-theme.css`,
                // Use exact filename casing to match images folder (important for case-sensitive hosts)
                logo: `${this.pathPrefix}images/mylogo-Red.png`,
                favicon: `${this.pathPrefix}images/mylogo-green.png`,
                quotes: 'christmas',
                audio: `${this.pathPrefix}Audio/All I Want for Christmas is You.mp3`,
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

        // Valentine's Season: February 1 - February 20
        if (month === 2 && day >= 1 && day <= 20) {
            return 'valentine';
        }

        // Calculate Easter (varies each year)
        const getEasterDate = (year) => {
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
        };

        const easter = getEasterDate(year);
        const easterStart = new Date(easter);
        easterStart.setDate(easter.getDate() - 10);
        const easterEnd = new Date(easter);
        easterEnd.setDate(easter.getDate() + 7);

        // Easter Season: 10 days before to 7 days after Easter
        if (now >= easterStart && now <= easterEnd) {
            return 'easter';
        }

        // July 4th Season: June 25 - July 10
        if ((month === 6 && day >= 25) || (month === 7 && day <= 10)) {
            return 'july4';
        }

        // Halloween Season: September 15 - October 31
        if ((month === 9 && day >= 15) || month === 10) {
            return 'halloween';
        }
        
        // Calculate Thanksgiving (fourth Thursday of November)
        const getThanksgivingDate = (year) => {
            const firstOfNovember = new Date(year, 10, 1);
            const firstThursday = new Date(firstOfNovember);
            const dayOfWeek = firstOfNovember.getDay();
            const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
            firstThursday.setDate(1 + daysUntilThursday);
            
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
        
        // Christmas Season: Day after Thanksgiving - January 7 (including NYE on Dec 31)
        if ((month === 11 && day >= dayAfterThanksgiving) || (month === 12) || (month === 1 && day <= 7)) {
            return 'christmas';
        }
        
        // Normal theme: All other times
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
            !['valentine-message', 'easter-message', 'july4-message', 'halloween-message', 'thanksgiving-message', 'christmas-message', 'new-year-message', 'christmas-countdown', 'nye-countdown'].includes(element)
        );
        
        // For Christmas theme, show NYE countdown only on Dec 31, otherwise show Christmas countdown
        if (currentTheme === 'christmas') {
            if (month === 12 && day === 31) {
                filteredElements.push('nye-countdown');
            } else {
                filteredElements.push('christmas-countdown');
            }
        }
        
        // Add date-specific messages only on actual holidays
        if (month === 2 && day === 14) {
            filteredElements.push('valentine-message');
        } else if (month === 7 && day === 4) {
            filteredElements.push('july4-message');
        } else if (month === 10 && day === 31) {
            filteredElements.push('halloween-message');
        } else if (month === 11 && day === this.getThanksgivingDate(year)) {
            filteredElements.push('thanksgiving-message');
        } else if (month === 12 && day === 25) {
            filteredElements.push('christmas-message');
        } else if (month === 1 && day === 1) {
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
        
        this.loadCSS(themeConfig.css);
        this.setFavicon(themeConfig.favicon);
        
        const dynamicThemeConfig = {
            ...themeConfig,
            specialElements: this.getActiveSpecialElements()
        };
        
        window.currentTheme = theme;
        window.currentThemeConfig = dynamicThemeConfig;
        
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme, config: dynamicThemeConfig }
        }));
    }

    loadCSS(cssFile) {
        const existingThemeCSS = document.querySelectorAll('link[data-theme-css]');
        existingThemeCSS.forEach(link => link.remove());
        
        if (!document.querySelector('link[href*="styles/style.css"]')) {
            const baseCSS = document.createElement('link');
            baseCSS.rel = 'stylesheet';
            baseCSS.href = `${this.pathPrefix}styles/style.css`;
            baseCSS.setAttribute('data-base-css', 'true');
            document.head.appendChild(baseCSS);
        }
        
        if (cssFile !== `${this.pathPrefix}styles/style.css`) {
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

document.addEventListener('DOMContentLoaded', function() {
    window.themeManager = new ThemeManager();
    window.themeManager.applyTheme();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
