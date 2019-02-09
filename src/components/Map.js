import React, { Component } from 'react';


class Map extends Component {
  render() {
    return (
      <div id='mapview'>
        <div className='map-container' id='map-canvas'/>
      </div>
    );
  }
}

export default Map;
