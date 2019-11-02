import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import WebMercatorViewport from 'viewport-mercator-project';
import { getDirections } from '../../actions/directions'
import SideBar from '../SideBar';
import './Mapbox.css'

class Mapbox extends Component {
    TOKEN = process.env.REACT_APP_MAPBOX_API_KEY || "pk.eyJ1IjoidGF0eWNyaXMiLCJhIjoiY2syNmdlcnZqMWRkNzNkbXE1OWVqcjhrNiJ9.qsi-EJjOzbbLfgqaLXDBdA"

    state = {
        viewport: {
            width: "100vw",
            height: "100vh",
            latitude: 52.3723396,
            longitude: 4.8375686,
            zoom: 8
        },
        microbreweries: [],
        selectedBrewery: ''
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userLocation !== this.props.userLocation) {
            this.setDirections()

            this.setState({
                viewport: {
                    width: "100vw",
                    height: "100vh",
                    latitude: this.props.userLocation.center[1],
                    longitude: this.props.userLocation.center[0],
                    transitionDuration: 2000,
                    transitionInterpolator: new FlyToInterpolator(),
                    zoom: 10
                }
            })
        }
        if (prevProps.directions !== this.props.directions) {
            console.log('directions', this.props.directions.map(brewery => {
                return brewery.center
            }))
        }
    }

    boundingBox = (center2) => {
        const { longitude, latitude, zoom } = new WebMercatorViewport(this.state.viewport)
            .fitBounds([this.props.userLocation.center, center2], {
                padding: 50,
                offset: [0, -100]
            })

        this.setState({
            viewport: {
                width: "100vw",
                height: "100vh",
                latitude: latitude,
                longitude: longitude,
                transitionDuration: 2000,
                transitionInterpolator: new FlyToInterpolator(),
                zoom: zoom
            }
        })
    }

    setDirections = () => {
        if (this.props.userLocation.length !== 0) {
            this.props.getDirections(this.props.breweries, this.props.userLocation)
        }
    }

    setSelectedBrewery = (brewery) => {
        this.setState({ selectedBrewery: brewery })
    }

    renderBreweriesMarkers = (brewery) => {
        if (brewery === 'all') {
            return this.props.breweries.map(brewery => {
                return (
                    <Marker
                        key={brewery.name}
                        latitude={brewery.center[1]}
                        longitude={brewery.center[0]}
                    >
                        <img className="icon beer-icon" src="beerIcon.png" alt="beer-icon" />
                    </Marker>
                )
            })
        } else {
            return (
                <Marker
                    key={brewery.name}
                    latitude={brewery.center[1]}
                    longitude={brewery.center[0]}
                >
                    <img className="icon beer-icon" src="beerIcon.png" alt="beer-icon" />
                </Marker>
            )
        }
    }

    render() {
        return (
            <div className="mapbox-container">
                <SideBar breweriesMarker={this.setSelectedBrewery} boundingBox={this.boundingBox} />
                <div className='map'>
                    <ReactMapGL
                        {...this.state.viewport}
                        style={{ width: '100%', height: '100%' }}
                        mapStyle='mapbox://styles/mapbox/streets-v11'
                        onViewportChange={(viewport) => this.setState({ viewport })}
                        mapboxApiAccessToken={this.TOKEN}
                    >
                        {Object.keys(this.props.userLocation).length !== 0
                            ? (
                                <Marker
                                    latitude={this.props.userLocation.center[1]}
                                    longitude={this.props.userLocation.center[0]}
                                >
                                    <img className="icon location-icon" src="pinIcon.png" alt="pin-icon" />
                                </Marker>
                            ) : (
                                <div></div>
                            )
                        }
                        {this.state.selectedBrewery && this.renderBreweriesMarkers(this.state.selectedBrewery)}
                    </ReactMapGL>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        breweries: state.microbreweries,
        userLocation: state.userLocation,
        directions: state.directions
    }
}

export default connect(mapStatetoProps, { getDirections })(Mapbox)