import { SET_SELECTED_BREWERY } from '../actions/microbreweries'

const initialState = {};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_BREWERY:
            return payload
        default:
            return state
    }
}