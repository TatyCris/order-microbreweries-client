import * as request from 'superagent'
import { mapbox_host } from './constants'

export const SET_DIRECTIONS = 'SET_DIRECTIONS'

export function getDirections(breweries, userLocation) {
    return async function (dispatch) {
        try {
            const response = await Promise.all(breweries.map(brewery => {
                const coordinates = `${userLocation.center};${brewery.center}`
                const url = `https://${mapbox_host}/directions/v5/mapbox/driving/${encodeURIComponent(coordinates)}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`
                return request(url)
            }))
            const res = response.map(response => JSON.parse(response.text))
            const routes = res.map(location => location.routes[0])
            const breweriesWithLocation = breweries.map(brewery => {
                const route = routes.shift()
                return { ...brewery, route }
            })
            dispatch(setDirections(breweriesWithLocation))
        } catch (error) {
            console.error(error)
        }
    }
}

export function setDirections(breweries) {
    return {
        type: SET_DIRECTIONS,
        payload: breweries
    }
}