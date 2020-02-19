import { KEYS } from '../../ignore/api-keys.js'
export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
    centerMap,
}

var map;

function initMap(lat = 29.5577, lng = 34.9519) {
    console.log('InitMap');
    return _connectGoogleApi()
    .then(() => {
        console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', map);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function getMap() {
    return map
}

function centerMap(map, lat, lng) {
    console.log('MAP', map)
    console.log('LAT', lat)
    console.log('LNG', lng)
    map.setCenter({ lat: lat, lng: lng });
    map.setZoom(14);
}

// function getUserCurrPos() {
//     console.log('STARTEDDDDD!')
//     if (!navigator.geolocation) {
//         alert("HTML5 Geolocation is not supported in your browser.");
//         return;
//     }
//     // One shot position getting or continus watch
//     navigator.geolocation.getCurrentPosition(_showLocation, _handleLocationError)
//     // navigator.geolocation.watchPosition(showLocation, handleLocationError);
// }

// function _showLocation(position) {
//     console.log(position)
//     initMap(position.coords.latitude, position.coords.longitude);
// }

// function _handleLocationError(error) {
//     error = 'ERROR-handleLocationError'
//     console.log(error)
// }

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = ''; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${KEYS.googleMaps}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



