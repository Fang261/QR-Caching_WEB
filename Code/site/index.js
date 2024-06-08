document.addEventListener('DOMContentLoaded', function () {
    const navButtons1 = document.getElementById('nav_buttons1');
    const navButtons2 = document.getElementById('nav_buttons2');
    const adminButton = document.getElementById('admin_button');

    let isLoggedIn = false;


    if (localStorage.getItem('userId')) {
        isLoggedIn = true;
    }

    function isAdminUser() { // This function will be called after login
        const userId = localStorage.getItem('userId');
        if (userId === '665e38a4cf108645778fc6f8' || userId === '665e3f9e26a5eb57cca5c20d') {
            adminButton.style.display = 'flex';
        } else {
            adminButton.style.display = 'none';
        }
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

    // Fetch the number of QR codes from the backend
    fetch('http://85.246.91.101/lqrcodes/count')
        .then(response => response.json())
        .then(data => {
            const qrCodeCount = data.qrCodeCount;
            const qrCodeText = document.querySelector('.app_section_text h2');
            qrCodeText.textContent = `There are ${qrCodeCount} QR Codes in Lisbon`;
        })
        .catch(error => {
            console.error('Error fetching QR code count:', error);
        });

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
