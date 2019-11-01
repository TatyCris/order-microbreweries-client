import { SET_DIRECTIONS } from '../actions/directions'

const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_DIRECTIONS:
            return payload
        default:
            return state
    }
}