import * as request from 'superagent'
import { heroku } from './constants'

export const SET_BEERS = 'SET_BEERS'

export function setBeers(beers) {
    return {
        type: SET_BEERS,
        payload: beers
    }
}

export function getAllBeers() {
    return async function (dispatch) {
        try {
            const response = await request(`${heroku}/beers`)
            const beers = JSON.parse(response.text)

            dispatch(setBeers(beers.beers))
        }
        catch (error) {
            console.error(error)
        }
    }
}

export function getBeersFromBrewery(breweryName) {
    return async function (dispatch) {
        try {
            const response = await request(`${heroku}/microbreweries/${encodeURIComponent(breweryName)}/beers`)
            const beers = JSON.parse(response.text)

            dispatch(setBeers(beers))
        }
        catch (error) {
            console.error(error)
        }
    }
} 