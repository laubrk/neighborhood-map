import React, { Component } from 'react';

let map;

class Map extends Component {
  
  componentDidMount() {
    this.initMap()
  }
  
 initMap = () => {
  map = new window.google.maps.Map(this.refs.map, {
    center: {lat: 32.713631, lng: -117.155602},
    zoom: 14
  });
  
  const locations = [
    {title: 'Mission Brewery', location: {lat: 32.720450, lng: -117.166210}},
    {title: 'Resident Brewery', location: {lat: 32.716518, lng: -117.160782}},
    {title: 'Ballast Point Brewing', location: {lat: 32.727780, lng: -117.169740}},
    {title: '10 Barrel Brewing Co', location: {lat: 32.714430, lng: -117.150190}},
    {title: 'Coronado Brewing Company', location: {lat: 32.697760 , lng: -117.173440}}
  ];
 
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new window.google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: window.google.maps.Animation.DROP,
      id: i
    });
  }
 }

  render() {
    return (
      <div>
        <div id="map" ref="map"></div>
      </div>
    );
  }
}

export default Map;