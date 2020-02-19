'use strict';
import { KEYS } from '../../ignore/api-keys.js'
export const weatherService = {
    eilatCoords,
    getWeather,

}


window.KEYS = KEYS

var eilatCoords = { latitude: 29.55805, longitude: 34.94821 }

function getWeather(coords) {
    var lat = coords.latitude
    var lon = coords.longitude



    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${KEYS.weather}`)
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
            var weather = createWeather(name, country, desc, temp, minTemp, maxTemp, windSpeed, imgCode)
            console.log(weather);
            return weather;
        })

}


function createWeather(name, country, desc, temp, minTemp, maxTemp, windSpeed, imgCode) {
    var weather = { name, country, desc, temp, minTemp, maxTemp, windSpeed, imgCode };
    return weather;
}