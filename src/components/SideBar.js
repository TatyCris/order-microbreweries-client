import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentPosition, getLocationFromZipcode } from '../actions/location'
import './SideBar.css'

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

    handleBreweryClick = (event) => {
        console.log('event', event)
    }

    renderFormUserLocation = () => {
        return (
            <div className="form-user-location">
                <form onSubmit={this.handleSubmit}>
                    <label>Choose to find nearby microbreweries:</label><br />
                    <div className="zipcode-search">
                        <input type="text" placeholder="zip code" onChange={this.handleChange}></input>
                        <button className="search-button" type="submit"><img className="search-icon" src="searchIcon.png" alt="search-icon" /></button>
                    </div>
                </form>
                <button className="my-location-button" onClick={() => this.setUserLocation('current')}>Find my Location</button>
            </div>
        )
    }

    renderBreweriesList = (brewery) => {
        return <li key={brewery.name} onClick={this.handleBreweryClick}>
            <div className="main-info">{brewery.name} - {Math.round(brewery.route.distance / 10) / 100} km</div>
            <div className="extra-info">{`${brewery.address}, ${(brewery['zip code'] || brewery.zipcode)} ${brewery.city}`}</div>
            <div className="extra-info">{`Open: ${brewery.open.join(', ')}`}</div>
        </li>
    }

    render() {
        return (
            <div className="side-bar-container">
                <div className="side-bar">
                    {this.renderFormUserLocation()}
                </div>
                {this.state.breweriesList &&
                    <div className="side-bar breweries-list">
                        <ul >{this.sortByDistance().map(this.renderBreweriesList)}</ul>
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