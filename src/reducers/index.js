import { combineReducers } from 'redux'
import microbreweries from './microbreweries'
import userLocation from './location'
import directions from './directions'
import selectedBrewery from './brewery'
import beers from './beers'

export default combineReducers({
    microbreweries,
    userLocation,
    directions,
    selectedBrewery,
    beers
})