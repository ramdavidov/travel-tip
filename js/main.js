import { weatherService } from './services/weather.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onload = () => {
    // debugger
    locService.getLocs()
        .then(locs => {
            const lat = locs[0].lat
            const lng = locs[0].lng
            mapService.initMap(lat, lng)
                .then(() => {
                    mapService.addMarker(locs[0])
                    weatherService.getWeather(locs[0])
                        .then(weather => {
                            renderWeather(weather)
                        })
                })
                .catch(err => {
                    console.log('INIT MAP ERROR', err)
                })
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    mapService.panTo(35.6895, 139.6917);
})

document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(() => {
            locService.getPosition()
                // getPosition is a PROMISE!
                .then(pos => {
                    mapService.panTo(pos.coords.latitude, pos.coords.longitude)
                    mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                    // getWeather is a PROMISE!
                    weatherService.getWeather(pos.coords)
                        .then(weather => {
                            renderWeather(weather)
                        })
                        .catch(err => {
                            console.log('USERPOSITION ERROR', err)
                        })
                })
        })
})



function renderWeather(weather) {
    const strHTMLs = `
    <h2>Weather Today</h2>
    <img src="http://openweathermap.org/img/wn/${weather.imgCode}.png">
    <p>${weather.name},${weather.country} ${weather.desc}</p>
    <p>${weather.temp}°C temperature from ${weather.minTemp} to ${weather.maxTemp}°C, wind ${weather.windSpeed} m/s </p>
   `;
    document.querySelector('.weather-container').innerHTML = strHTMLs;
}


function onAddressEntered() {
    var elAddressInput = document.querySelector('.address-input')
    var address = elAddressInput.value
    getCoordsAndAddress(address)
    elAddressInput.value = ''
}

function renderAddress(address) {
    document.querySelector('.address-name').innerText = address
}