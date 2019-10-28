import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Route } from 'react-router-dom'
// import MicrobreweriesList from './components/MicrobreweriesList';
// import Map from './components/Map'
import Mapbox from './components/Mapbox/Mapbox'
import ZipCodeSearcher from './components/ZipCodeSearcher';
import { getMicrobreweries } from './actions/microbreweries'
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getMicrobreweries()
  }

  render() {
    return (
      <div className="App">
        <main className="App-main">
          {/* <Route exact path="/" component={MicrobreweriesList} /> */}
          {/* <Map /> */}
          <ZipCodeSearcher />
          <Mapbox />
        </main>
      </div>
    )
  }
}

export default connect(null, { getMicrobreweries })(App)