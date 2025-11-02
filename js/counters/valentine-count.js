// Valentine's Day Countdown
function valentineCountdown() {
    const today = new Date();
    const currentYear = today.getFullYear();
    let valentinesDay = new Date(currentYear, 1, 14); // February 14th (month is 0-based)
    
    // If Valentine's Day has passed this year, use next year's date
    if (today > valentinesDay) {
        valentinesDay = new Date(currentYear + 1, 1, 14);
    }
    
    const timeDifference = valentinesDay.getTime() - today.getTime();
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
    const countdownElement = document.getElementById('valentine-count-down');
    if (countdownElement) {
        if (days === 0) {
            countdownElement.innerHTML = "💕 IT'S VALENTINE'S DAY! 💕";
            countdownElement.style.animation = "heartbeat 1.5s infinite";
        } else if (days === 1) {
            countdownElement.innerHTML = `💖 ${days} day until Valentine's Day! 💖`;
        } else {
            countdownElement.innerHTML = `💕 ${days} days until Valentine's Day! 💕`;
        }
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Run immediately
    valentineCountdown();
    
    // Update every hour
    setInterval(valentineCountdown, 3600000);
});

// Also run countdown immediately if script is loaded after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', valentineCountdown);
} else {
    valentineCountdown();
}