import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js'
import axios from 'axios'

let locations, endpoint, params, ApiVenues;

class App extends Component {

  state = {
    locationNames: [],
    fourSquareReady: false,
    markers: []
  }
  
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
          console.log(this.state.fourSquareReady)
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

//reference: https://www.codementor.io/thomastuts/integrate-google-maps-api-react-refs-du10842zd
//reference: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs



/*
Alternate reference for loading map -------------------------

class App extends Component {
  
  componentDidMount() {
    this.displayMap()
  }
  
  displayMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC11yTTz1zLj-wJ-q5BYRFdNLSsIWtprvU&v=3&callback=initMap")
    window.initMap = this.initMap
  }
  
  initMap = () => {
   const map = new window.google.maps.Map(document.getElementById("map"), {
     center: {lat: 40.712776, lng: -74.005974},
     zoom: 13
   });
  }
  
  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

function loadScript(string) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = string
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
*/

/*
class App extends Component {
  
  componentDidMount() {
    this.initMap()
  }
  
 initMap = () => {
    map = new window.google.maps.Map(this.mapArea, {
     center: {lat: 40.712776, lng: -74.005974},
     zoom: 13
   });
  }
  
  render() {
    return (
      <div
      id="map"
        ref={div => {this.mapArea = div}}>
      </div>
    );
  }
}

*/