document.addEventListener('DOMContentLoaded', function () {
    var Event = 0;
    var Quest = 0;
    var Permanent = 0;

    fetch('/lqrcodes')
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
        })
        

    var barCtx = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'My First Dataset',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var histogramCtx = document.getElementById('histogramChart').getContext('2d');
    var histogramChart = new Chart(histogramCtx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'My First Dataset',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});