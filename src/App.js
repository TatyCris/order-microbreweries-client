import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MicrobreweriesList from './components/MicrobreweriesList';
import Map from './components/Map'
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <main className="App-main">
          <Route exact path="/" component={MicrobreweriesList} />
          <Map />
        </main>
      </div>
    )
  }
}