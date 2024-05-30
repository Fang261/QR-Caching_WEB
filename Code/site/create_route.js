document.addEventListener('DOMContentLoaded', () => {
    let map;
    let markers = [];
    let selectedWaypoints = [];
    let directionsService;
    let directionsRenderer;

    function initMap() {
        const location = { lat: 38.72570143190969, lng: -9.149985452443389 };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: location,
            styles: [

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

        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        fetch('http://localhost:3000/lqrcodes')
            .then(response => response.json())
            .then(lqrcodes => {
                lqrcodes.forEach(qrcode => {
                    const marker = new google.maps.Marker({
                        position: { lat: qrcode.lqrcode_latitude, lng: qrcode.lqrcode_longitude },
                        map: map,
                        title: `QR Code at ${qrcode.lqrcode_latitude}, ${qrcode.lqrcode_longitude}`
                    });

                    marker.addListener('click', () => {
                        handleWaypointSelection(marker);
                    });

                    markers.push(marker);
                });
            })
            .catch(error => console.error('Erro ao buscar QR codes:', error));
    }

    function handleWaypointSelection(marker) {
        const markerIndex = selectedWaypoints.indexOf(marker);
        if (markerIndex === -1) {
            if (selectedWaypoints.length < 2) {
                selectedWaypoints.push(marker);
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png'); // change color of selected marker
            }
        } else {
            selectedWaypoints.splice(markerIndex, 1);
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png'); // reset color of deselected marker
        }

        if (selectedWaypoints.length === 2) {
            calculateAndDisplayRoute();
        }
    }

    function calculateAndDisplayRoute() {
        const waypoints = selectedWaypoints.map(marker => ({
            location: marker.getPosition(),
            stopover: true,
        }));

        directionsService.route(
            {
                origin: waypoints[0].location,
                destination: waypoints[1].location,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }
        );

        selectedWaypoints.forEach(marker => marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png'));
        selectedWaypoints = [];
    }

    window.initMap = initMap;
});
