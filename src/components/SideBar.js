import React, { Component } from 'react'
import { connect } from 'react-redux'

class SideBar extends Component {
    sortByDistance = () => {
        return this.props.directions.sort((a, b) => (a.route.distance - b.route.distance))
    }

    renderBreweriesList = (brewery) => {
        return <li>{brewery.name} - {Math.round(brewery.route.distance / 10)/100} km</li>
    }

    render() {
        return (
            <ul>{this.sortByDistance().map(this.renderBreweriesList)}</ul>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        directions: state.directions
    }
}

export default connect(mapStatetoProps)(SideBar)