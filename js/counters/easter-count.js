// Easter Countdown
function easterCountdown() {
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
    const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let easterDate = getEasterDate(currentYear);
    const easterDay = new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate());
    
    // If Easter has passed this year, show next year's Easter
    if (currentDay > easterDay) {
        easterDate = getEasterDate(currentYear + 1);
    }

    // Update countdown every second
    function updateCountdown() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const distance = easterDate.getTime() - now.getTime();

        const countdownElement = document.getElementById('easter-count-down');
        if (countdownElement) {
            if (today.getTime() === easterDate.getTime()) {
                countdownElement.innerHTML = "🐰 Happy Easter! 🌸";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Also run countdown immediately if script is loaded after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', easterCountdown);
} else {
    easterCountdown();
}