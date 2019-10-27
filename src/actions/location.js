import * as request from 'superagent'
import { mapbox_host } from './constants'

export const SET_BREWERIES_LOCATION = 'SET_BREWERIES_LOCATION'

export function setBreweriesLocation(microbreweries) {
    return {
        type: SET_BREWERIES_LOCATION,
        payload: microbreweries
    }
}

export function getBreweriesLocation(search_text) {
    return function (dispatch) {
        request(`https://${mapbox_host}/geocoding/v5/mapbox.places/${encodeURIComponent(search_text)}.json?limit=1&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`)
            .then(response => {
                const res = JSON.parse(response.text)
                dispatch(setBreweriesLocation(res.features[0].center))
            })
            .catch(console.error)
    }
} 