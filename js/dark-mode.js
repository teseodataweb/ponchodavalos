const toggleBtn = document.getElementById('darkModeToggle');

    // Mantener la preferencia del usuario
    if(localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleBtn.textContent = "Light Mode";
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if(document.body.classList.contains('dark-mode')){
            localStorage.setItem('darkMode', 'enabled');
            toggleBtn.textContent = "Light Mode";
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleBtn.textContent = "Dark Mode";
        }
    });