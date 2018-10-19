import React, {Component} from 'react';

class Sidebar extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      filteredSearch:[],
      filteredMarkers:[]
    }
  }
  
  updateQuery = (query) => {
    this.setState({query: query});
    this.searchLocations(query);
    this.showMarkers(query)
  }

  
  //Run search query form search box input. Filter and show locations based on query
  searchLocations = (query) => {
    let filteredSearch =
      this.props.locationNames.filter(place => place.venue.name.toLowerCase().includes(query)
      )
      this.setState({filteredSearch: filteredSearch})
  }
  
  //Show markers for when match on search query by setting marker visibility true
  //and false if not a match from query.
  showMarkers = (query) => {
    //filtered markers (filtered to mean exclude from list) 
      this.props.markers.filter(place =>
      !place.title.toLowerCase().includes(query)
      )
      .map(place => (place.setVisible(false)));
    //unfiltered markers (to mean include in list)
      this.props.markers.filter(place =>
      place.title.toLowerCase().includes(query)
      )
      .map(place => (place.setVisible(true)));
  }

  //Open infowindow if id from click on marker matches in array of markers
  //and close all others if not match to id for the rest in array
  openWindow = (id) => {
    this.props.markers.map(marker => {
      if (marker.id === id) {
        window.google.maps.event.trigger(marker,"click")
      } else {marker.infoWindow.close(this.map,marker)}
    })
  }
  
  //perform marker bounce with timeout if clicked
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
      <div className="sidebar" tabIndex="-1" >
        <div className="sidebar-content" tabIndex="-1">
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
              <li className="venue-name" tabIndex="0" key={location.venue.id}
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
              <li className="venue-name" tabIndex="0" key={location.venue.id}
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