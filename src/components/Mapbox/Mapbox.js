import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMapGL, { Marker } from "react-map-gl";
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
        userLocation: {}
    }

    setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let setUserLocation = {
                zip: position.zip,
                lat: position.coords.latitude,
                long: position.coords.longitude
            };
            let newViewport = {
                height: 400,
                width: 400,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 10
            };
            this.setState({
                viewport: newViewport,
                userLocation: setUserLocation
            })
        })
    }

    loadBreweriesMarkers = () => {
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

    render() {
        // console.log('state', this.state.userLocation)
        return (
            <div>
                <button onClick={this.setUserLocation}>My Location</button>
                <div className='map'>
                    <ReactMapGL
                        {...this.state.viewport}
                        mapStyle='mapbox://styles/mapbox/streets-v11'
                        onViewportChange={(viewport) => this.setState({ viewport })}
                        mapboxApiAccessToken={this.TOKEN}
                    >
                        {Object.keys(this.state.userLocation).length !== 0 ? (
                            <Marker
                                latitude={this.state.userLocation.lat}
                                longitude={this.state.userLocation.long}
                            >
                                <img className="location-icon" src="pinIcon.png" alt="pin-icon" />
                            </Marker>
                        ) : (
                                null
                            )
                        }
                        {this.loadBreweriesMarkers()}
                    </ReactMapGL>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        breweries: state.microbreweries
    }
}

export default connect(mapStatetoProps)(Mapbox)
