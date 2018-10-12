/*
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

 updateMarkers = (array) => {this.setState({markers: array})}

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
          updateMarkers={this.updateMarkers}
        />
      </div>
    );} else {return "Fetching Data"}
  }
}

export default App;
*/

import React, { Component } from 'react';
import './App.css';
//import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js'
import axios from 'axios'

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      locationNames: [],
      fourSquareReady: false,
      markers: []
    }
  }
  
  componentDidMount() {
    this.foursquareLocations()
  }
  
  componentDidUpdate(prevProps,prevState){
    if (prevProps.fourSquareReady !==this.state.fourSquareReady){
      this.initMap()
    }
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
    
    axios.get(endpoint + new URLSearchParams(params))
      .then(response => {
        this.setState({
          locationNames: response.data.response.groups[0].items,
          fourSquareReady: true,
        })
          console.log("FourSquareReady"+this.state.fourSquareReady)
    })
      .catch(error => {
        alert(`There was an error with Foursquare`)
    })
  }

  
initMap = () => {
  const map = new window.google.maps.Map(this.refs.map, {
    center: {lat: 32.713631, lng: -117.155602},
    zoom: 15
  });

  console.log("map "+this.state.fourSquareReady)
  
  this.state.locationNames.map(location => {
    const marker = new window.google.maps.Marker({
      position: {lat: location.venue.location.lat, lng: location.venue.location.lng},
      map: map,
      id: location.venue.id,
      title: location.venue.name,
      address: location.venue.location.address,
      animation: window.google.maps.Animation.DROP,
      isOpen: false,
      isVisible: true
    })
    
    this.state.markers.push(marker)
    
    const infowindow = new window.google.maps.InfoWindow({
      content:
        `<p>${marker.title}</p>
        <p>${marker.address}</p>`
    });
      
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    
  });
}

  render() {
    
    return (
      <div className="App">
      <div id="navbar">
        <div id="navbar-text">Neighborhood Breweries</div>
      </div>
      <Sidebar {...this.state}/>
        <div id="map" ref="map"></div>
      </div>
    )
  }
}
export default App;