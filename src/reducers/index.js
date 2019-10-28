import { combineReducers } from 'redux'
import microbreweries from './microbreweries'
import search from './location'

export default combineReducers({
    microbreweries,
    search
})