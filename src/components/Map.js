import React, { Component } from 'react';

let map;

class Map extends Component {

  componentDidMount() {
    this.initMap()
    }

initMap = () => {
  map = new window.google.maps.Map(this.refs.map, {
    center: {lat: 32.713631, lng: -117.155602},
    zoom: 15
  });

  console.log("map "+this.props.fourSquareReady)
  
  this.props.locationNames.map(location => {
    var marker = new window.google.maps.Marker({
      position: {lat: location.venue.location.lat, lng: location.venue.location.lng},
      map: map,
      id: 888,
      title: location.venue.name,
      id: location.venue.id,
      address: location.venue.location.address,
      animation: window.google.maps.Animation.DROP
    })
        
    var infowindow = new window.google.maps.InfoWindow({
      content:
        `<p>${marker.title}</p>
        <p>${marker.address}</p>`
    });
      
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    
    /* Optional work
    marker.addListener('click', function() {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    });
    */
    
  });
}
  
  render() {
    console.log(this.props.locationNames)
    return (
      <div>
        <div id="map" ref="map"></div>
      </div>
    );
  }
}

export default Map;

/*

--------------------

The following is maintained as notes for reference.
Previous approach when using static locations. 10/3/19

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
 
 ------------------------
 
*/