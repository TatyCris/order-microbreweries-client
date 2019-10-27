import * as request from 'superagent'
import { localhost } from './constants'

export const SET_MICROBREWERIES = 'SET_MICROBREWERIES'

export function setMicrobreweries(microbreweries) {
    return {
        type: SET_MICROBREWERIES,
        payload: microbreweries
    }
}

export function getMicrobreweries() {
    return function (dispatch) {
        request(`${localhost}/microbreweries`)
            .then(response => {
                const res = JSON.parse(response.text)
                dispatch(setMicrobreweries(res.breweries))
            })
            .catch(console.error)
    }
} 