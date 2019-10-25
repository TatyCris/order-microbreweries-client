import React, { Component } from 'react'

export default class Map extends Component {
    getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                console.log('position', position)
            })
        } else {
            console.log("geolocation is not supported!")
        }

    }

    render() {
        return (
            <div>
                Position:
                {this.getGeolocation()}
            </div>
        )
    }
}
