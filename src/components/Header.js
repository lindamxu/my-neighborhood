import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <div className='header'>
        <h3> Welcome to Chicago! </h3>
        <div className='button-container'>
          <input
            id='search-bar-input'
            type="text"
            placeholder="Search a place in Chicago"
          />
          <button
            onClick={this.props.getRecs.bind(this)}
            >
            Recommendations
          </button>
          <select id='search-bar-drop-down'>
            <option> Venue Type </option>
          </select>
          <select id='search-bar-drop-down'>
            <option> Neighborhood </option>
          </select>
          <Link
            to='/'
            onClick={() => this.props.initializeMap.bind()}
            >
            <button
              >
              Map View
            </button>
          </Link>
          <Link to="list">
            <button
              >
              List View
            </button>
          </Link>
        </div>
      </div>
    );
  }

}
export default Header;
