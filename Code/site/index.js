document.addEventListener('DOMContentLoaded', function() {
    const navButtons1 = document.getElementById('nav_buttons1');
    const navButtons2 = document.getElementById('nav_buttons2');


    let isLoggedIn = false;


    function updateNavButtons() {
        if (isLoggedIn) {
            navButtons1.style.display = 'none';
            navButtons2.style.display = 'flex';
        } else {
            navButtons1.style.display = 'flex';
            navButtons2.style.display = 'none';
        }
    }

    function login() {
        isLoggedIn = true;
        updateNavButtons();

    }

    function logout() {
        isLoggedIn = false;
        updateNavButtons();

    }

    updateNavButtons();

});
