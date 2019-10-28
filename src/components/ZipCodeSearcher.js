import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getZipcode } from '../actions/search'

class ZipCodeSearcher extends Component {
    state = {
        value: ''
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.getZipcode(this.state.value)
        this.setState({ value: '' })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Type a zip code to find the closest microbrewery:
                    </label>
                    <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                    <input type="submit" value="Search"></input>
                </form>
            </div>
        )
    }
}

export default connect(null, { getZipcode })(ZipCodeSearcher)