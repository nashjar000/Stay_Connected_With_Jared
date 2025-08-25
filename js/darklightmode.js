function toggleMode() {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
}

const switchToggle = document.getElementById('switch-toggle');
switchToggle.addEventListener('click', toggleMode);
document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);