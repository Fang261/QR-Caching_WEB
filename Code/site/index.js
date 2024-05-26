document.addEventListener('DOMContentLoaded', function() {
    const navButtons1 = document.getElementById('nav_buttons1');
    const navButtons2 = document.getElementById('nav_buttons2');
    const adminButton = document.getElementById('admin_button');


    let isLoggedIn = false;
    let isAdmin = false;


    function updateNavButtons() {
        if (isLoggedIn) {
            navButtons1.style.display = 'none';
            navButtons2.style.display = 'flex';
            if (!isAdmin) {
                adminButton.style.display = 'none';
            }
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
