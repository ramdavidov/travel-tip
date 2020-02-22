import { KEYS } from '../../ignore/api-keys.js'
import { utilsService } from './utils.service.js'
export const locService = {
    getLocs,
    getPosition,
    getCoordsAndAddress
}

var locs = [{ lat: 29.5577, lng: 34.9519 }]


function getLocs() {
    const lat = +utilsService.getParameterByName('lat')
    const lng = +utilsService.getParameterByName('lng')

    if (lat && lng) locs = [{ lat, lng }]
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getCoordsAndAddress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${KEYS.googleMaps}`)
        .then(res => {
            return {
                addressLiteral: res.data.results[0].formatted_address,
                addressCordinates: res.data.results[0].geometry.location
            }
        })
}

