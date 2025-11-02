// Set the date we're counting down to
var countDownDate = new Date("Dec 25, 2025 00:00:00").getTime();
                    
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
    
  // Output the result in an element with id="demo"
  document.getElementById("christmas-count-down").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("christmas-count-down").innerHTML = 
    ` 
    <h1 class="Christmas" style="color: darkred; font-size: 1em; text-shadow: 2px 2px rgba(0, 0, 0, 0.608);">MERRY <span style="color: lightgreen;">CHRISTMAS</span> <span style="color: white;">!</span></h1>
 `
  }
}, 1000);
