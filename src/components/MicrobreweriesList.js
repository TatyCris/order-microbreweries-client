import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMicrobreweries } from '../actions/microbreweries'

class MicrobreweriesList extends Component {
    componentDidMount() {
        this.props.getMicrobreweries()
    }

    renderBrewery = (brewery) => {
        return (
            <li key={brewery.name}>
                {brewery.name}
            </li>
        )
    }

    render() {
        const { breweries } = this.props
        return (
            <div>
                {!breweries && 'Loading...'}
                {breweries && <ul>{breweries.map(this.renderBrewery)}</ul>}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        breweries: state.microbreweries
    }
}

export default connect(mapStatetoProps, { getMicrobreweries })(MicrobreweriesList)
