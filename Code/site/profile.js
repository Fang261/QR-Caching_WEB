document.addEventListener("DOMContentLoaded", function() {
    // Get user ID from local storage
    const userId = localStorage.getItem("userId");

    // Check if userId exists in local storage
    if (userId) {
        // Fetch username from local storage
        const username = localStorage.getItem("userName");
        document.getElementById("profile_name").textContent = username;

        // Fetch number of QR codes from the database
        fetch(`http://176.78.46.208/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                const qrCodeCount = data.qrCodeCount;
                document.querySelector(".profile_qrcodes").textContent = `QRCodes catched: ${qrCodeCount}`;
            })
            .catch(error => {
                console.error('Error fetching QR code count:', error);
                document.querySelector(".profile_qrcodes").textContent = "QRCodes catched: 0";
            });

        // Logout button event listener
        document.querySelector(".logout_button").addEventListener("click", function() {
            localStorage.clear();
            window.location.href = "login.html";
        });
    } else {
        // Redirect to login if userId is not found in local storage
        window.location.href = "login.html";
    }
});
