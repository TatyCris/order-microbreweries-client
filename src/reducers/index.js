import { combineReducers } from 'redux'
import microbreweries from './microbreweries'
import userLocation from './location'
import directions from './directions'

export default combineReducers({
    microbreweries,
    userLocation,
    directions
})