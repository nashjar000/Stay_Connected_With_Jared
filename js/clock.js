function updateClock(){
    let now = new Date();
    
    // Get time components
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    
    // Add leading zero to hours, minutes, and seconds
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    // Format the time string
    let timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("time").textContent = timeString;

    // Get date components
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = now.toLocaleDateString('en-US', options);
    document.getElementById("date").textContent = dateString;
}

// Initial call to set the clock immediately
updateClock();
// Update clock every second
setInterval(updateClock, 1000);
