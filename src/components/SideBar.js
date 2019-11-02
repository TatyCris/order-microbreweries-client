import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentPosition, getLocationFromZipcode } from '../actions/location'
import './SideBar.scss'

class SideBar extends Component {
    state = {
        value: '',
        breweriesList: false
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
        this.props.breweriesMarker(brewery)
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
        return <li className="list-elements" key={brewery.name} onClick={() => this.handleBreweryClick(brewery)}>
            <div className="main-info">{brewery.name}<span className="span-extra-info">{Math.round(brewery.route.distance / 10) / 100} km</span></div>
            <div className="mobile-span-extra-info">{Math.round(brewery.route.distance / 10) / 100} km</div>
            <div className="extra-info">{`${brewery.address}, ${(brewery['zip code'] || brewery.zipcode)} ${brewery.city}`}</div>
            <div className="extra-info">{`Open: ${brewery.open.join(', ')}`}</div>
        </li>
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
                </div>
                <div className="buttons-bar">
                    <img className="current-location-button" onClick={() => this.setUserLocation('current')} src="currentIcon.png" alt="current-location-icon" />
                    <button className="show-all-button" onClick={() => this.handleBreweryClick('all')}>Show All</button>
                    <img className="show-all-image mobile beerIcon" onClick={() => this.handleBreweryClick('all')} src="beerIcon.png" alt="beer-icon" />
                </div>
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
        directions: state.directions
    }
}

export default connect(mapStatetoProps, { getCurrentPosition, getLocationFromZipcode })(SideBar)