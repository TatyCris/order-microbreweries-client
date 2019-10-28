import { getLocation } from './microbreweries'

export const SET_ZIPCODE_SEARCHED = 'SET_ZIPCODE_SEARCHED'

export function getZipcode(zipcode) {
    return async function (dispatch) {
        const location = await getLocation(zipcode)
        dispatch(setZipcode({
            zipcode,
            location
        }))
    }
}

export function setZipcode(user_zipcode) {
    return {
        type: SET_ZIPCODE_SEARCHED,
        payload: user_zipcode
    }
}