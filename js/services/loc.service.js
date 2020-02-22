import { KEYS } from '../../ignore/api-keys.js'
import { utilsService } from './utils.service.js'
export const locService = {
    getLocs,
    getPosition,
    getCoordsAndAddress,
    updateLocs,
    getLocNameFromLocs,
    // getCurrLocs
}

var locs = { lat: 29.5577, lng: 34.9519 }

// function getCurrLocs(){
//     return locs
// }

function getLocs() {
    const lat = +utilsService.getParameterByName('lat')
    const lng = +utilsService.getParameterByName('lng')

    if (lat && lng) locs = { lat, lng }
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

function updateLocs(updatedLocs){
    locs = updatedLocs;
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

function getLocNameFromLocs(locs){
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locs.lat},${locs.lng}&key=${KEYS.googleMaps}`)
    .then(res => {
        console.log('address name:',res.data.results[0].formatted_address);
        return {            
            addressName: res.data.results[0].formatted_address
        }
    })
}