document.addEventListener('DOMContentLoaded', () => {
    function initMap() {
        var location = { lat: 38.72570143190969, lng: -9.149985452443389 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: location,
            styles:[
                {
                    featureType: 'poi',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'poi.business',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }]
                }, 
                {
                    "featureType": "building",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#343434"
                        }
                    ]
                }, {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                }
                ,
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                }, {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#030303"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "color": "#161616"
                        }
                    ]
                },
                {
                    featureType: 'transit',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "weight": 0.6
                        },
                        {
                            "fontSize": 6
                        }
                    ]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#FFFFFF"
                        },
                        {
                            "visibility": "on"
                        },
                        {
                            "weight": 2.5
                        }
                    ]
                }, {
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        });

        fetch('/lqrcodes')
            .then(response => response.json())
            .then(lqrcodes => {
                lqrcodes.forEach(qrcode => {
                    var marker = new google.maps.Marker({
                        position: { lat: qrcode.lqrcode_latitude, lng: qrcode.lqrcode_longitude },
                        map: map,
                        title: `QR Code at ${qrcode.lqrcode_latitude}, ${qrcode.lqrcode_longitude}`
                    });
                });
            })
            .catch(error => console.error('Erro ao buscar QR codes:', error));
    }

    window.initMap = initMap;
});
