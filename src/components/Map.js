import React, { Component } from 'react';


class Map extends Component {
  render() {
    return (
      <div
        tabIndex='0'
        id='mapview'
        role='application'
        aria-label='Google Maps'
      >
        <div
          className='map-container'
          id='map-canvas'
        />
      </div>
    );
  }
}

export default Map;
