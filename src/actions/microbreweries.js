import * as request from 'superagent'
import { localhost } from './constants'
import { mapbox_host } from './constants'

export const SET_MICROBREWERIES = 'SET_MICROBREWERIES'

function getBreweriesLocation(search_text) {
    const url = `https://${mapbox_host}/geocoding/v5/mapbox.places/${encodeURIComponent(search_text)}.json?limit=1&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
    return request(url)
        .then(response => {
            const res = JSON.parse(response.text)
            return res.features[0].center
        })
}

export function setMicrobreweries(microbreweries) {
    return {
        type: SET_MICROBREWERIES,
        payload: microbreweries
    }
}

export function getMicrobreweries() {
    return async function (dispatch) {
        try {
            const response = await request(`${localhost}/microbreweries`)
            const data = JSON.parse(response.text)
            const address = data.breweries.map(brewery => {
                return brewery.address + ' ' + brewery.city + ' ' + (brewery['zip code'] || brewery.zipcode)
            })
            const locations = await Promise.all(address.map(address => getBreweriesLocation(address)))
            const breweriesWithLocation = data.breweries.map(brewery => {
                const center = locations.shift()
                return { ...brewery, center }
            })
            dispatch(setMicrobreweries(breweriesWithLocation))
        }
        catch (error) {
            console.error(error)
        }
    }
} 