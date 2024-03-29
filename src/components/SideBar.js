import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentPosition, getLocationFromZipcode } from '../actions/location'
import { setSelectedBrewery } from '../actions/microbreweries'
import { getBeersFromBrewery } from '../actions/beers'
import './SideBar.scss'

class SideBar extends Component {
    state = {
        value: '',
        breweriesList: false,
        beers: '',
        openBeers: false
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState)
        if (prevState.openBeers !== this.state.openBeers) {
            if (this.state.openBeers !== false) {
                this.handleAvailableBeersClick(this.state.openBeers) 
            }
        }
    }

    setUserLocation = (location) => {
        if (location === 'current') {
            this.props.getCurrentPosition()
            setTimeout(
                () => this.setState({ breweriesList: true }), 1000
            )
        }
        if (location === 'zipcode') {
            this.props.getLocationFromZipcode(this.state.value)
            setTimeout(
                () => this.setState({ value: '', breweriesList: true }), 500
            )
        }
    }

    sortByDistance = () => {
        return this.props.directions.sort((a, b) => (a.route.distance - b.route.distance))
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setUserLocation('zipcode')
    }

    handleBreweryClick = (brewery) => {
        console.log(brewery.name)
        if (brewery !== 'all') {
            this.props.boundingBox(brewery.center)
        }
        this.props.setSelectedBrewery(brewery)
        this.setState({openBeers: brewery.name})
    }

    handleAvailableBeersClick = (breweryName) => {
        this.setState({ openBeers: breweryName }, () => this.props.getBeersFromBrewery(breweryName))
    }

    closeBeersList = () => {
        this.setState({ openBeers: false })
    }

    renderFormUserLocation = () => {
        return (
            <div className="form-user-location">
                <form className="zipcode-form" onSubmit={this.handleSubmit}>
                    <div className="zipcode-search">
                        <input type="text" placeholder="zip code" onChange={this.handleChange}></input>
                        <button className="search-button" type="submit"><img className="search-icon" src="searchIcon.png" alt="search-icon" /></button>
                    </div>
                </form>
                <button className="find-my-location-button" onClick={() => this.setUserLocation('current')}>Find my Location</button>
            </div>
        )
    }

    renderBreweriesList = (brewery) => {
        const openDays = `Open: ${brewery.open.length > 3 ?
            brewery.open[0].slice(0, 3) + ' to ' + brewery.open[brewery.open.length - 1].slice(0, 3) :
            brewery.open.map(day => day.slice(0, 3)).join(', ')}`

        return <li className="list-elements" key={brewery.name} onClick={() => this.handleBreweryClick(brewery)}>
            <div className="main-info">{brewery.name}<span className="span-extra-info">{Math.round(brewery.route.distance / 10) / 100} km</span></div>
            <div className="mobile-span-extra-info">{Math.round(brewery.route.distance / 10) / 100} km</div>
            <div className="extra-info">{`${brewery.address}, ${(brewery['zip code'] || brewery.zipcode)} ${brewery.city}`}</div>
            <div className="extra-info">{openDays}</div>
            <button className="availables-beers-button" onClick={() => this.handleAvailableBeersClick(brewery.name)}>Available beers</button>
            <img className="mobile-availables-beers-button" onClick={() => this.handleAvailableBeersClick(brewery.name)} src="caskIcon.png" alt="cask-icon" />
        </li>
    }

    renderAvailablesBeers = (beers) => {
        return beers.map(beer => {
            return (
                <div className="beer-container" key={beer.name}>
                    <div className="beer-info">{beer.name}<span className="span-extra-beer-info">({beer.alcohol}%)</span></div>
                    <div className="extra-beer-info">
                        <div>Style: {beer.style}</div>
                        <div>Keg: {beer.keg} - {beer.volume}l</div>
                    </div>
                    <div className="mobile-extra-beer-info">
                        <div>{beer.style} - {beer.keg} - {beer.volume}l</div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="all-bars">
                <div className="side-bar-container">
                    <div className="form-wrapper">
                        {this.renderFormUserLocation()}
                    </div>
                    {this.state.breweriesList &&
                        <div className="breweries-list">
                            <ul >{this.sortByDistance().map(this.renderBreweriesList)}</ul>
                        </div>
                    }
                    {this.props.beers.length > 0 &&
                        <div className="beers-list">{this.renderAvailablesBeers(this.props.beers)}</div>
                    }
                </div>
                <div className="buttons-bar">
                    <img className="current-location-button" onClick={() => this.setUserLocation('current')} src="currentIcon.png" alt="current-location-icon" />
                    <button className="show-all-button" onClick={() => this.handleBreweryClick('all')}>Show All</button>
                    <img className="show-all-image mobile beerIcon" onClick={() => this.handleBreweryClick('all')} src="beerIcon.png" alt="beer-icon" />
                </div>
                {(this.props.beers.length > 0 && this.state.openBeers) &&
                    <div className="mobile-beers-list">
                        <div className="button-close-beers" onClick={this.closeBeersList}>x</div>
                        {this.renderAvailablesBeers(this.props.beers)}
                    </div>
                }
                {this.state.breweriesList &&
                    <div className="mobile-breweries-list-container">
                        <ul className="mobile-breweries-list">{this.sortByDistance().map(this.renderBreweriesList)}</ul>
                    </div>
                }
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        directions: state.directions,
        beers: state.beers
    }
}

export default connect(mapStatetoProps, {
    getCurrentPosition,
    getLocationFromZipcode,
    setSelectedBrewery,
    getBeersFromBrewery
})(SideBar)