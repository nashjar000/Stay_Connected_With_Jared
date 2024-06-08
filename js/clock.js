// Javascript for the clock on index.html - use the system's time
function updateClock(){
    let now = new Date();
    let hour = now.getHours() % 12 || 12; // convert to 12 hour format
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let ampm = now.getHours() < 12 ? "AM" : "PM";
    hour = (hour < 10)? "0" + hour : hour; // add 0 if hour is single digit
    minute = (minute < 10)? "0" + minute : minute;
    second = (second < 10)? "0" + second : second;
    document.getElementById("hours").innerHTML = hour;
    document.getElementById("minutes").innerHTML = minute;
    document.getElementById("seconds").innerHTML = second;
    document.getElementById("ampm").innerHTML = ampm;
}

setInterval(updateClock, 1000); // Update clock every second

