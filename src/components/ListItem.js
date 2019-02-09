import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    const { name, itemClicked, placeId, listItem } = this.props;
    return (
      <ul
        className='result-item-list'
        >
        <h2>{name}</h2>
        <div id={placeId}
          className={(itemClicked && listItem===placeId) ? 'item-list-details-expanded' : 'item-list-details'}>
          <h1>Address</h1>
        </div>
        <button
          id={placeId}
          className={ (itemClicked && listItem===placeId) ? 'up-button' : 'down-button'}
          onClick={this.props.toggleItemExpansion.bind(this)}
          />
      </ul>
    );
  }

}
export default ListItem;
