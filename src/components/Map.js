import React, { Component } from 'react';

let map;

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markers:[]
    }
  }
  
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
    
    /* Optional work
    marker.addListener('click', function() {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    });
    */
    
  });
}
  
  render() {
    //console.log(this.state.markers)
    return (
      <div id="map" ref="map">
      </div>
    );
  }
}

export default Map;
