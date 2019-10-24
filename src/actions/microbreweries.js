import * as request from 'superagent'

export const SET_MICROBREWERIES = 'SET_MICROBREWERIES'

export function setMicrobreweries(microbreweries) {
    return {
        type: SET_MICROBREWERIES,
        payload: microbreweries
    }
}

export function getMicrobreweries() {
    return function (dispatch) {
        request('http://localhost:4000/microbreweries')
            .then(response => {
                const res = JSON.parse(response.text)
                dispatch(setMicrobreweries(res.breweries))
            })
            .catch(console.error)
    }
} 