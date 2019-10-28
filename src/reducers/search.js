import { SET_ZIPCODE_SEARCHED } from '../actions/search'

const initialState = '';

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ZIPCODE_SEARCHED:
            return payload
        default:
            return state
    }
}