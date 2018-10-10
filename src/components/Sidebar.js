import React, {Component} from 'react';

class Sidebar extends Component {
  
  
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-content">
            <input type={"search"} id={"search"} placeholder={"search for venues"}/>
              <ol className="venue-list">
              {this.props.locationNames.map(location => (
              <li className="venue">{location.venue.name}</li>))}
              </ol>
        </div>
      </div>
    );
  }
}

export default Sidebar;