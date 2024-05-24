document.addEventListener('DOMContentLoaded', function () {
    var Event = 0;
    var Quest = 0;
    var Permanent = 0;

    // Fetch QR codes and process them
    fetch('http://localhost:3000/lqrcodes')
        .then(response => response.json())
        .then(lqrcodes => {
            lqrcodes.forEach(qrcode => {
                if (qrcode.lqrcode_is_event) {
                    Event++;
                } else if (qrcode.lqrcode_is_quest) {
                    Quest++;
                } else {
                    Permanent++;
                }
            });

            var doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
            var doughnutChart = new Chart(doughnutCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Event', 'Quest', 'Permanent'],
                    datasets: [{
                        label: 'Number of Qrcodes',
                        data: [Event, Quest, Permanent],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            // Prepare data for histogram chart
            var Numberqrcodes = [];
            var qrcodes = [];
            lqrcodes.forEach(qrcode => {
                Numberqrcodes.push('QrCode ' + qrcode.lqrcode_id);
                qrcodes.push(qrcode.lqrcode_times_scanned);
            });

            var histogramCtx = document.getElementById('histogramChart').getContext('2d');
            var histogramChart = new Chart(histogramCtx, {
                type: 'bar',
                data: {
                    labels: Numberqrcodes,
                    datasets: [{
                        label: 'Number of times each qrcode was scanned',
                        data: qrcodes,
                        backgroundColor: 'rgb(255, 99, 132)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });

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

    fetch('http://localhost:3000/post')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                var date = new Date(post.pos_tdate); // Assuming post has a 'date' field
                var month = date.getMonth();
                months[month].count++;
            });

            var barCtx = document.getElementById('barChart').getContext('2d');
            var barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: months.map(m => m.month),
                    datasets: [{
                        label: 'Posts posted per Month',
                        data: months.map(m => m.count),
                        backgroundColor: 'rgb(54, 162, 235)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
});
