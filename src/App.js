import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js'
import axios from 'axios'

let locations, endpoint, params, ApiVenues;

class App extends Component {

  constructor(props) {
  super(props)
    this.state = {
    locationNames: [],
    fourSquareReady: false,
    markers: []
  }}
  
  componentDidMount() {
    this.foursquareLocations()
  }
  
  foursquareLocations = () => {
    const endpoint = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "4GEVXOTWI0JXY51A0DS1K5CA3TCC5YWKEOTRMEYEGE2JO1CJ",
      client_secret: "SBCF5FNWEE1XHCHOQINY0T2U3UAUYYQSFOMD0GZ5VAGTDRBX",
      query: "brewery",
      ll: "32.713631,-117.155602",
      limit: 12,
      v: '20180323',
    }
    
    const ApiVenues = 
    axios.get(endpoint + new URLSearchParams(params))
      .then(response => {
        this.setState({
          locationNames: response.data.response.groups[0].items,
          fourSquareReady: true,
        })
          console.log("FourSquareReady"+this.state.fourSquareReady)
    }).catch(error => {
        alert(`There was an error with Foursquare`)
    })
  }

  render() {
    if (this.state.fourSquareReady) {
    return (
      <div className="App">
      <div id="navbar">
        <div id="navbar-text">Neighborhood Breweries</div>
      </div>
      <Sidebar {...this.state}/>
        <Map
          locationNames={this.state.locationNames}
          fourSquareReady = {this.state.fourSquareReady}
        />
      </div>
    );} else {return "Fetching Data"}
  }
}

export default App;
