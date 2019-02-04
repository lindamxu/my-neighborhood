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
          <select id='search-bar-drop-down'>
            <option> Filter By </option>
          </select>
          <Link to='/'>
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
