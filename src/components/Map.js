import React, { Component } from 'react';
import Header from './Header.js'


class Map extends Component {
  render() {
    console.log(this.props.searchResults);
    return (
      <div>
        <Header
          getRecs={this.props.getRecs}
          initializeMap={this.props.initializeMap}
          searchResults={this.props.searchResults}
          />
        <div className='map-container' id='map-canvas'/>
      </div>
    );
  }
}

export default Map;
