import { weatherService } from './services/weather.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onload = () => {
    // debugger
    locService.getLocs()
        .then(locs => {
            const lat = locs.lat
            const lng = locs.lng
            mapService.initMap(lat, lng)
                .then(() => {
                    mapService.addMarker(locs)
                    locService.updateLocs(locs)
                    weatherService.getWeather(locs)
                        .then(weather => {
                            renderWeather(weather)
                        })
                    locService.getLocNameFromLocs(locs)
                        .then(res => {


                            renderAddressText(res.addressName)
                        })
                })
                .catch(err => {
                    console.log('INIT MAP ERROR', err)
                })
        })
}



document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
    locService.getPosition()
        .then(() => {
            locService.getPosition()
                // getPosition is a PROMISE!
                .then(pos => {
                    mapService.panTo(pos.coords.latitude, pos.coords.longitude)
                    let userLocs = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                    locService.updateLocs(userLocs)
                    mapService.addMarker(userLocs)
                    // getWeather is a PROMISE!
                    weatherService.getWeather(pos.coords)
                        .then(weather => {
                            renderWeather(weather)
                        })
                    // let currLocs = locService.getCurrLocs()
                    locService.getLocNameFromLocs(userLocs)
                        .then(res => {


                            renderAddressText(res.addressName)
                        })
                        .catch(err => {
                            console.log('USERPOSITION ERROR', err)
                        })
                })
        })
})

document.querySelector('.copy-loc-btn').addEventListener('click', (ev) => {
    onCopyPosUrl()
})


document.querySelector('.go-to-btn').addEventListener('click', (ev) => {
    onAddressEntered()
})


function onCopyPosUrl() {
    let locs = locService.getLocs()
        .then(locs => {
            const lat = locs.lat
            const lng = locs.lng
            console.log('LAT:', lat, 'LNG:', lng)
        })
    /* Get the text field */
    //   const copyText = document.querySelector('.copy-loc-txt')
    //   /* Select the text field */
    //   copyText.select();
    //   copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    //   /* Copy the text inside the text field */
    //   document.execCommand("copy");
}

function renderWeather(weather) {
    const strHTMLs = `
    <h2>Weather Today</h2>
    <img src="http://openweathermap.org/img/wn/${weather.imgCode}.png">
    <p>${weather.name}, ${weather.country} ${weather.desc}</p>
    <p>${weather.temp}°C temperature from ${weather.minTemp} to ${weather.maxTemp}°C, wind ${weather.windSpeed} m/s </p>`;
    document.querySelector('.weather-container').innerHTML = strHTMLs;
}


function onAddressEntered() {
    var elAddressInput = document.querySelector('.address-input')
    var addressEntered = elAddressInput.value
    locService.getCoordsAndAddress(addressEntered)
        .then(addressDetails => {
            locService.updateLocs(addressDetails.addressCordinates)
            renderAddressText(addressDetails.addressLiteral)
            mapService.panTo(addressDetails.addressCordinates.lat, addressDetails.addressCordinates.lng)
            mapService.addMarker(addressDetails.addressCordinates)

            return weatherService.getWeather(addressDetails.addressCordinates)
        })
        .then(weather => {
            renderWeather(weather)
        })
    elAddressInput.value = ''
}

function renderAddressText(address) {
    document.querySelector('.address-name').innerText = address
}

