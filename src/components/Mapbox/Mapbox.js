import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMapGL, { Marker } from "react-map-gl";
import { getCurrentPosition, getLocationFromZipcode } from '../../actions/location'
import './Mapbox.css'

class Mapbox extends Component {
    TOKEN = process.env.REACT_APP_MAPBOX_API_KEY || "pk.eyJ1IjoidGF0eWNyaXMiLCJhIjoiY2syNmdlcnZqMWRkNzNkbXE1OWVqcjhrNiJ9.qsi-EJjOzbbLfgqaLXDBdA"

    state = {
        viewport: {
            width: 400,
            height: 400,
            latitude: 52.3723396,
            longitude: 4.8375686,
            zoom: 8
        },
        microbreweries: [],
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
        // this.setState({
        //     viewport: {
        //         width: 400,
        //         height: 400,
        //         latitude: this.props.userLocation.center[1],
        //         longitude: this.props.userLocation.center[0],
        //         zoom: 10
        //     }
        // })
    }

    renderBreweriesMarkers = () => {
        return this.props.breweries.map(brewery => {
            return (
                <Marker
                    key={brewery.name}
                    latitude={brewery.center[1]}
                    longitude={brewery.center[0]}
                >
                    <img src="beerIcon.png" alt="beer-icon" />
                </Marker>
            )
        })
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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Type a zip code to find the closest microbrewery:</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    <input type="submit" value="Search"></input>
                    <label>or</label>
                </form>
                <button onClick={() => this.setUserLocation('current')}>Find my Location</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderFormUserLocation()}
                <div className='map'>
                    <ReactMapGL
                        {...this.state.viewport}
                        mapStyle='mapbox://styles/mapbox/streets-v11'
                        onViewportChange={(viewport) => this.setState({ viewport })}
                        mapboxApiAccessToken={this.TOKEN}
                    >
                        {Object.keys(this.props.userLocation).length !== 0 ? (
                            <Marker
                                latitude={this.props.userLocation.center[1]}
                                longitude={this.props.userLocation.center[0]}
                            >
                                <img className="location-icon" src="pinIcon.png" alt="pin-icon" />
                            </Marker>
                        ) : (
                                <div></div>
                            )
                        }
                        {this.renderBreweriesMarkers()}
                    </ReactMapGL>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        breweries: state.microbreweries,
        userLocation: state.userLocation
    }
}

export default connect(mapStatetoProps, { getCurrentPosition, getLocationFromZipcode })(Mapbox)