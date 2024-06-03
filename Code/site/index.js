document.addEventListener('DOMContentLoaded', function() {
    const navButtons1 = document.getElementById('nav_buttons1');
    const navButtons2 = document.getElementById('nav_buttons2');
    const adminButton = document.getElementById('admin_button');


    let isLoggedIn = false;

    function updateUI() { // This function will be called after login
        console.log("Updating UI based on login status...");
        isLoggedIn = true;
    }

    function isAdminUser() { // This function will be called after login
        if (localStorage.getItem('userId') === '1' || localStorage.getItem('userId') === '2') {
            adminButton.style.display = 'flex';
            isAdmin = true;
        }
        adminButton.style.display = 'none';
        isAdmin = false;
    }


    function updateNavButtons() { 
        if (isLoggedIn) {
            navButtons1.style.display = 'none';
            navButtons2.style.display = 'flex';
            isAdminUser();
        } else {
            navButtons1.style.display = 'flex';
            navButtons2.style.display = 'none';
        }
    }

    updateNavButtons();

    const numberOfEvents = getNumberOfEventsFromDatabase(); // Replace this with your actual function

    const eventContainer = document.querySelector('.event_container');

    for (let i = 0; i < numberOfEvents; i++) {
        const div = document.createElement('div');
        div.classList.add('event_item');
        div.innerText = `Event ${i + 1}`; // Add any content or data you need here
        eventContainer.appendChild(div);
    }

    function getNumberOfEventsFromDatabase() {
        // Replace with your actual logic to get the number of events
        return 15; // Example value
    }
});

export { updateUI };
