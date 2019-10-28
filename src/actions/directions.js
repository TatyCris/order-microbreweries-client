import * as request from 'superagent'
import { mapbox_host } from './constants'

export const SET_DIRECTIONS = 'SET_DIRECTIONS'

export function getDirections(coordinates) {
    return function (dispatch) {
        const url = `https://${mapbox_host}/directions/v5/mapbox/driving/${encodeURIComponent(coordinates)}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
        request(url)
            .then(response => {
                const res = JSON.parse(response.text)
                dispatch(setDirections(res.routes[0]))
            })
    }
}

export function setDirections(routes) {
    return {
        type: SET_DIRECTIONS,
        payload: routes
    }
}