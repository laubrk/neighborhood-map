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
    //this.getBooksSearched(query)
  }
  
  openWindow = (id) => {
    console.log(this.props.markers)
    this.props.markers.map(marker => {
      if (marker.id === id) {
        window.google.maps.event.trigger(marker,"click")
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
                }}
                
              >
                {location.venue.name}
              <div id="venue-address">
                {location.venue.location.address}, San Diego, CA
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