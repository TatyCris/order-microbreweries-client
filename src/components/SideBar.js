import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentPosition, getLocationFromZipcode } from '../actions/location'
import './SideBar.css'

class SideBar extends Component {
    state = {
        value: ''
    }

    setUserLocation = (location) => {
        if (location === 'current') {
            this.props.getCurrentPosition()
        }
        if (location === 'zipcode') {
            this.props.getLocationFromZipcode(this.state.value)
            this.setState({ value: '' })
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
        return <li key={brewery.name}>{brewery.name} - {Math.round(brewery.route.distance / 10) / 100} km</li>
    }

    render() {
        return (
            <div className="side-bar-container">
                {this.renderFormUserLocation()}
                <ul>{this.sortByDistance().map(this.renderBreweriesList)}</ul>
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