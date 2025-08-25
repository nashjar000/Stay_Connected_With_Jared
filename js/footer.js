const footer = document.createElement("footer");
footer.innerHTML = `
  <p>&copy; ${new Date().getFullYear()} Stay Connected With Jared</p>
  <h3><a href="site-plan.html">Site Plan</a></h3>
  <div class="social">
    <button id="shareButton" class="share-button">Share This Page</button>
  </div>
`;

document.body.appendChild(footer);

// Add a click event listener to the share button
document.getElementById("shareButton").addEventListener("click", sharePage);

// Function to share the current page using the Web Share API or copy the link to the clipboard
function sharePage() {
  // Check if the Web Share API is supported
  if (navigator.share) {
    navigator.share({
        title: "Your Website",
        text: "Check out this website!",
        url: window.location.href
      })
      .then(() => {
        console.log("Shared successfully");
      })
      .catch(error => {
        console.error("Error sharing:", error);
      });
  } else {
    console.log("Web Share API not supported on this device.");

    // Fallback for copying the link to the clipboard
    const url = window.location.href;
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    console.log("Link copied to clipboard:", url);
    alert("Link copied to clipboard!");
  }
}

// Add social media links
const socialDiv = document.querySelector(".social");
const facebookLink = document.createElement("a");
facebookLink.href = "https://www.facebook.com/jared.nash.108/";
facebookLink.target = "_blank";
const facebookImg = document.createElement("img");
facebookImg.src = "images/facebook-icon.png";
facebookImg.alt = "fb icon";
facebookImg.width = 64;
facebookImg.height = 64;
facebookLink.appendChild(facebookImg);
socialDiv.appendChild(facebookLink);

const instagramLink = document.createElement("a");
instagramLink.href = "https://www.instagram.com/jared_nash0509/";
instagramLink.target = "_blank";
const instagramImg = document.createElement("img");
instagramImg.src = "images/instagram-icon.webp";
instagramImg.alt = "instagram icon";
instagramImg.width = 64;
instagramImg.height = 64;
instagramLink.appendChild(instagramImg);
socialDiv.appendChild(instagramLink);