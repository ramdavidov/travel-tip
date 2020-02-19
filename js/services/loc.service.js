import { KEYS } from '../../ignore/api-keys.js'
export const locService = {
    getLocs,
    getPosition,

}

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)

    })
}

function getCoordsAndAdress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${KEYS.googleMaps}`)
        .then(res => {
            return {
                adressLiteral: res.data.results[0].formatted_address,
                adressCordinates: res.data.results[0].geometry.location
            }
        })
}

