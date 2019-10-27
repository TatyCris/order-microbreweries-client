import { SET_MICROBREWERIES } from '../actions/microbreweries'
import { SET_BREWERIES_LOCATION } from '../actions/location';

const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MICROBREWERIES:
            return payload
        case SET_BREWERIES_LOCATION:
            return payload
        default:
            return state
    }
}