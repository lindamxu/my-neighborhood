import React, { Component } from 'react';
class Header extends Component {

  filterResults(query) {
    this.props.filterResults(query);
  }

  render() {
    return (
      <div className='header'>
        <button
          className='hamburger-menu'
          onClick={this.props.toggleList.bind(this)}
          />
        <input
          id='search-bar-input'
          type="text"
          placeholder="Filter by name"
          onChange={event => this.filterResults(event.target.value)}
        />
      </div>
    );
  }

}
export default Header;
