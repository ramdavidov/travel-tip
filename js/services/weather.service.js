'use strict';
import { KEYS } from '../../ignore/api-keys.js'
export const weatherService = {
    eilatCoords,
    getWeather,

}


window.KEYS = KEYS

// function getCurrencies() {
//     if (localStorage.currencieCodes) {
//         var currencieCodes = JSON.parse(localStorage.currencieCodes);
//         return Promise.resolve(currencieCodes);
//     }

//     return axios.get('https://free.currconv.com/api/v7/currencies?apiKey=0953ebbd733fb8d26b6e')
//         .then(res => {
//             localStorage.currencieCodes = JSON.stringify(res.data.results)
//             return res.data.results;
//         })
// }

// function getCurrenciesForDisplay() {
//     var currs = JSON.parse(localStorage.currencieCodes);
//     var ids = Object.keys(currs);
//     return ids;
// }


// function convert(amount, fromId, toId) {
//     var prm = axios.get(`https://free.currconv.com/api/v7/convert?q=${fromId}_${toId}&compact=ultra&apiKey=0953ebbd733fb8d26b6e`)
//         .then(res => {
//             var exchangeRate = Object.values(res.data)[0]
//             console.log(exchangeRate);
//             return exchangeRate * amount;
//         })
//     return prm
// }
var eilatCoords = {latitude: 29.55805, longitude: 34.94821}

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
            var weather = createWeather(name, country, desc, temp, minTemp, maxTemp, windSpeed)
            console.log(weather);
            return weather;
        })

}

function convertKalvToCel(deg) {
    return parseInt(deg - 273.15);
}

function convertMilToKm(speed) {
    return parseInt(speed * 1.609);
}

function createWeather(name, country, desc, temp, minTemp, maxTemp, windSpeed) {
    var weather = { name, country, desc, temp, minTemp, maxTemp, windSpeed };
    return weather;
}