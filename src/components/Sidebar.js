import React, {Component} from 'react';
import Map from './Map.js';

class Sidebar extends Component {
  
  constructor(props) {
  super(props)
  this.state = {
    query: "",
    filteredSearch:[],
    filteredMarkers:[]
  }}
  
  updateQuery = (query) => {
    this.setState({query: query});
    this.searchLocations(query);
    this.showMarkers(query)
  }

  searchLocations = (query) => {
    let filteredSearch =
      this.props.locationNames.filter(place => place.venue.name.toLowerCase().includes(query)
      )
      this.setState({filteredSearch: filteredSearch})
  }
  
  showMarkers = (query) => {
    let filteredMarkers = 
      this.props.markers.filter(place =>
      place.title.toLowerCase().includes(query)
      )
      //this.setState({filteredMarkers: filteredMarkers})
      this.props.markers[11].setVisible(false);
      this.setState({filteredMarkers: filteredMarkers})
  }

  openWindow = (id) => {
    this.props.markers.map(marker => {
      if (marker.id === id) {
        window.google.maps.event.trigger(marker,"click")
      } else {marker.infoWindow.close(this.map,marker)}
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
            {this.state.query &&
             this.state.filteredSearch.map(location => (
              <li className="venue-name" key={location.venue.id}
                onClick={() => {
                  this.openWindow(location.venue.id);
                  this.bounceMarker(location.venue.id)
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
            
            {!this.state.query && 
              this.props.locationNames.map(location => (
              <li className="venue-name" key={location.venue.id}
                onClick={() => {
                  this.openWindow(location.venue.id);
                  this.bounceMarker(location.venue.id)
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

//{this.props.locationNames.map(location => (