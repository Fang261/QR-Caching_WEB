// This script runs once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize counters for different types of QR codes
    var Event = 0;
    var Quest = 0;
    var Permanent = 0;

    // Fetch QR codes from the local server and process them
    fetch('http://85.246.91.101/lqrcodes')
        .then(response => response.json()) // Convert the response to JSON
        .then(lqrcodes => {
            // Count the types of QR codes
            lqrcodes.forEach(qrcode => {
                if (qrcode.lqrcode_is_event) {
                    Event++;
                } else if (qrcode.lqrcode_is_quest) {
                    Quest++;
                } else {
                    Permanent++;
                }
            });

            // Set up the doughnut chart for QR code types
            var doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
            var doughnutChart = new Chart(doughnutCtx, {
                type: 'doughnut', // Chart type
                data: {
                    labels: ['Event', 'Quest', 'Permanent'],
                    datasets: [{
                        label: 'Number of Qrcodes',
                        data: [Event, Quest, Permanent], // Data for each type
                        backgroundColor: [
                            'rgb(255, 99, 132)', // Event color
                            'rgb(54, 162, 235)', // Quest color
                            'rgb(255, 205, 86)' // Permanent color
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true, // Make the chart responsive
                    maintainAspectRatio: false
                }
            });

            // Prepare data for the histogram chart
            var Numberqrcodes = [];
            var qrcodes = [];
            lqrcodes.forEach(qrcode => {
                Numberqrcodes.push('QrCode ' + qrcode.lqrcode_id);
                qrcodes.push(qrcode.lqrcode_times_scanned);
            });

            // Set up the bar chart for QR code scan counts
            var histogramCtx = document.getElementById('histogramChart').getContext('2d');
            var histogramChart = new Chart(histogramCtx, {
                type: 'bar', // Chart type
                data: {
                    labels: Numberqrcodes, // Labels for each QR code
                    datasets: [{
                        label: 'Number of times each qrcode was scanned',
                        data: qrcodes, // Scan counts for each QR code
                        backgroundColor: 'rgb(255, 99, 132)' // Bar color
                    }]
                },
                options: {
                    responsive: true, // Make the chart responsive
                    maintainAspectRatio: false
                }
            });
        });

    // Initialize month counters
    var months = [
        { month: 'Janeiro', count: 0 },
        { month: 'Fevereiro', count: 0 },
        { month: 'Março', count: 0 },
        { month: 'Abril', count: 0 },
        { month: 'Maio', count: 0 },
        { month: 'Junho', count: 0 },
        { month: 'Julho', count: 0 },
        { month: 'Agosto', count: 0 },
        { month: 'Setembro', count: 0 },
        { month: 'Outubro', count: 0 },
        { month: 'Novembro', count: 0 },
        { month: 'Dezembro', count: 0 }
    ];

    // Fetch posts from the local server and process them
    fetch('http://85.246.91.101/posts')
        .then(response => response.json()) // Convert the response to JSON
        .then(posts => {
            console.log('Posts:', posts); // Log the posts data
            // Count posts per month
            posts.forEach(post => {
                var date = new Date(post.post_date); // Convert post date to Date object
                var month = date.getMonth(); // Get month from the date
                months[month].count++; // Increment the corresponding month counter
            });

            // Set up the bar chart for posts per month
            var barCtx = document.getElementById('barChart').getContext('2d');
            var barChart = new Chart(barCtx, {
                type: 'bar', // Chart type
                data: {
                    labels: months.map(m => m.month), // Labels for each month
                    datasets: [{
                        label: 'Posts posted per Month',
                        data: months.map(m => m.count), // Data for each month
                        backgroundColor: 'rgb(54, 162, 235)' // Bar color
                    }]
                },
                options: {
                    responsive: true, // Make the chart responsive
                    maintainAspectRatio: false
                }
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error); // Log any fetch errors
        });
});
