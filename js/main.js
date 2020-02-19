console.log('Main! + Ignore!!!!');
import { weatherService } from './services/weather.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilsService } from './services/utils.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(err => {
            console.log('INIT MAP ERROR', err)
        });

    locService.getPosition()
        // getPosition is a PROMISE!
        .then(pos => {
            // Pan to:
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            // mapService.addMarker(pos.coords)
            // getWeather is a PROMISE!
            weatherService.getWeather(pos.coords)
            // console.log('User position is:', pos.coords);
            // return pos
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    // console.log('Aha!', ev.target);
    mapService.panTo(35.6895, 139.6917);
})

document.querySelector('.my-loc-btn').addEventListener('click', (ev) => {
    // console.log('My location btn pressed', ev.target)
    locService.getPosition()
        .then(pos => {
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
            weatherService.getWeather(pos.coords)
            // Next is render weather
        })
})
