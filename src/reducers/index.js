import { combineReducers } from 'redux'
import microbreweries from './microbreweries'
import search from './search'

export default combineReducers({
    microbreweries,
    search
})