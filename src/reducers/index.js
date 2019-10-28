import { combineReducers } from 'redux'
import microbreweries from './microbreweries'
import userLocation from './location'

export default combineReducers({
    microbreweries,
    userLocation
})