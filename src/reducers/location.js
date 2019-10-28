import { SET_USER_LOCATION } from '../actions/location'

const initialState = '';

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USER_LOCATION:
            return payload
        default:
            return state
    }
}