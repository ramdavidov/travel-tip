'use strict';
import { KEYS } from '../../ignore/api-keys.js'
export const weatherService = {
    // eilatCoords,
    getWeather,

}

// var eilatCoords = { latitude: 29.55805, longitude: 34.94821 }

function getWeather(coords) {
    var lat;
    var lng;
    if (coords.lat && coords.lng) {
        lat = coords.lat
        lng = coords.lng
    } else {
        lat = coords.latitude
        lng = coords.longitude

    }

    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${KEYS.weather}`)
        .then(res => {
            const weatherDetails = res.data
            let name = weatherDetails.name
            let country = weatherDetails.sys.country
            let desc = weatherDetails.weather[0].description
            let temp = weatherDetails.main.temp
            let minTemp = weatherDetails.main.temp_min
            let maxTemp = weatherDetails.main.temp_max
            let windSpeed = weatherDetails.wind.speed
            let imgCode = weatherDetails.weather[0].icon
            var weather = { name, country, desc, temp, minTemp, maxTemp, windSpeed, imgCode }
            return weather;
        })

}


// function createWeather(name, country, desc, temp, minTemp, maxTemp, windSpeed, imgCode) {
//     var weather = { name, country, desc, temp, minTemp, maxTemp, windSpeed, imgCode };
//     return weather;
// }