import React, { Component } from 'react'
import ReactMapGL, { Marker } from "react-map-gl";
import './Mapbox.css'

export default class Mapbox extends Component {
    TOKEN = process.env.REACT_APP_MAPBOX_API_KEY || "pk.eyJ1IjoidGF0eWNyaXMiLCJhIjoiY2syNmdlcnZqMWRkNzNkbXE1OWVqcjhrNiJ9.qsi-EJjOzbbLfgqaLXDBdA"

    state = {
        viewport: {
            width: 400,
            height: 400,
            latitude: 52.3723396,
            longitude: 4.8375686,
            zoom: 8
        },
        userLocation: {}
    }

    setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let setUserLocation = {
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
            });
        });
    };

    render() {
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
                                <img className="location-icon" src="beerIcon.png" alt="beer-icon" />
                            </Marker>
                        ) : (
                                null
                            )
                        }
                    </ReactMapGL>
                </div>
            </div>
        )
    }
}