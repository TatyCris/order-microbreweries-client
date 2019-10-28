import { SET_DIRECTIONS } from '../actions/directions'

const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_DIRECTIONS:
            return [...state, payload]
        default:
            return state
    }
}