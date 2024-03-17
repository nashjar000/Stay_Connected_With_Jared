footer.innerHTML = `
<footer>
<h3>Stay Connected With Jared &copy;
<%= new Date().getFullYear() %>-
<%= new Date().getFullYear()+1 %> Jared Nash</h3>
<h3><a href="site-plan.html">Site Plan</a></h3>
<div class="social">
    <button id="shareButton" class="share-button">Share This Page</button>
    <script>
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
    
</script>
    <a href="https://www.facebook.com/jared.nash.108/" target="_blank">
        <img src="images/facebook.png" alt="fb icon">
    </a>

    <a href="https://www.instagram.com/jared_nash0509/" target="_blank">
        <img src="images/Instagram_logo.png" alt="instagram icon" width="64" height="64">
    </a>
</footer>
`