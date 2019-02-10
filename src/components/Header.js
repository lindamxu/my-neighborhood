import React, { Component } from 'react';
class Header extends Component {

  filterResults(query) {
    this.props.filterResults(query);
  }

  render() {
    const { listOpen } = this.props;
    return (
      <div className='header' tabIndex='0'>
        <button
          aria-label='button to toggle list view'
          className='hamburger-menu'
          aria-pressed={listOpen ? true : false }
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
