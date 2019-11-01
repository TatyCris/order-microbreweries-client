import { SET_MICROBREWERIES } from '../actions/microbreweries'

const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MICROBREWERIES:
            return payload
        default:
            return state
    }
}