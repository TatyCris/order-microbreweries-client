import { SET_BEERS } from '../actions/beers'

const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_BEERS:
            return payload
        default:
            return state
    }
}