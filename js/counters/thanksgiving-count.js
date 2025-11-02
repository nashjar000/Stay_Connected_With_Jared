// Calculate Thanksgiving date (fourth Thursday of November) dynamically
function getThanksgivingDate(year) {
    const firstOfNovember = new Date(year, 10, 1); // Month 10 = November (0-based)
    const firstThursday = new Date(firstOfNovember);
    const dayOfWeek = firstOfNovember.getDay(); // 0 = Sunday, 4 = Thursday
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    firstThursday.setDate(1 + daysUntilThursday);
    
    // Fourth Thursday is 3 weeks after first Thursday
    const fourthThursday = new Date(firstThursday);
    fourthThursday.setDate(firstThursday.getDate() + 21);
    
    return fourthThursday;
}

// Get current year and calculate Thanksgiving
const currentYear = new Date().getFullYear();
const thanksgivingDate = getThanksgivingDate(currentYear);

// Set the date we're counting down to (Thanksgiving at midnight)
var countDownDate = thanksgivingDate.getTime();
                    
// Update the count down every 1 second
var x = setInterval(function() {
                    
    // Get today's date and time
    var now = new Date().getTime();
                        
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
                        
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        
    // Output the result in an element with id="thanksgiving-count-down"
    document.getElementById("thanksgiving-count-down").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
                        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("thanksgiving-count-down").innerHTML = 
        `<h1 class="Thanksgiving" style="color: #8B4513; font-size: 1em; text-shadow: 2px 2px rgba(0, 0, 0, 0.608); text-align: center;">
            🦃 HAPPY <span style="color: #D2691E;">THANKSGIVING</span> <span style="color: #CD853F;">!</span> 🦃
            <br>
            <span style="font-size: 0.6em; color: #2F1B14;">🍂 🥧 Grateful & Blessed! 🌽 🍁</span>
        </h1>`;
    }
}, 1000);