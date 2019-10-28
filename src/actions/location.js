import * as request from 'superagent'
import { mapbox_host } from './constants'

export const SET_USER_LOCATION = 'SET_USER_LOCATION'

export function getLocation(search_text) {
    const url = `https://${mapbox_host}/geocoding/v5/mapbox.places/${encodeURIComponent(search_text)}.json?limit=1&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
    return request(url)
        .then(response => {
            const res = JSON.parse(response.text)
            return res.features[0].center
        })
}

export function getCurrentPosition() {
    return function (dispatch) {
        navigator.geolocation.getCurrentPosition(position => {
            dispatch(userLocation({
                center: [position.coords.longitude, position.coords.latitude]
            }))
        })
    }
}

export function getLocationFromZipcode(zipcode) {
    return async function (dispatch) {
        const center = await getLocation(zipcode)
        dispatch(userLocation({
            zipcode,
            center
        }))
    }
}

export function userLocation(location) {
    return {
        type: SET_USER_LOCATION,
        payload: location
    }
}