import React, {Component} from 'react';
import Map from './Map.js';

class Sidebar extends Component {
  
  constructor(props) {
  super(props)
  this.state = {
    query: ""
  }}
  
  updateQuery = (query) => {
    this.setState({query: query});
  }
  
  openWindow = (id) => {
    this.props.markers.map(marker => {
      if (marker.id === id) {
        window.google.maps.event.trigger(marker,"click")
      } else {marker.infoWindow.close(this.map,marker)}
    })
  }
  
  closeWindows = (id) => {
    this.props.markers.map(marker => {
    if (marker.id !== id) {
        //this.props.infoWindow.close(this.props.map, marker)
      }
  })
}
  
  //https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once
  bounceMarker = (id) => {
    this.props.markers.map(marker => {
      if (marker.id === id) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function(){marker.setAnimation(null);},3000);
      }
    })
  }
  
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-content">
          <input
            type={"search"}
            id={"search"}
            placeholder={"Search for Locations"}
            role={"search"}
            aria-label={"searchfield"}
            value={this.state.value}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <ol className="venue-list">
            {this.props.locationNames.map(location => (
              <li className="venue-name" key={location.venue.id}
                onClick={() => {
                  this.openWindow(location.venue.id);
                  this.bounceMarker(location.venue.id);
                  this.closeWindows(location.venue.id)
                }}
              >
                {location.venue.name}
              <div id="venue-address">
                <p>
                  {location.venue.location.formattedAddress[0]}
                </p>
                <p>
                  {location.venue.location.formattedAddress[1]}
                </p>
              </div>
              </li>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Sidebar;