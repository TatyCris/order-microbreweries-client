import * as request from 'superagent'
import { getLocation } from './location'
import { localhost } from './constants'

export const SET_MICROBREWERIES = 'SET_MICROBREWERIES'

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
            const locations = await Promise.all(address.map(address => getLocation(address)))
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