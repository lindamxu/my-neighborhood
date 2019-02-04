import React, { Component } from 'react';
import Header from './Header.js'


class Map extends Component {
  render() {
    console.log('on map page!');
    return (
      <div>
        <Header />
        <div className='map-container' id='map-canvas'/>
      </div>
    );
  }
}

export default Map;
