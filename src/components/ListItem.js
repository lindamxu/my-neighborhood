import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    const { name, itemClicked, placeId, listItem, rating, imgSrc, contact, address, hours, city, state, zipCode, tip } = this.props;
    return (
      <ul
        className='result-item-list'
        >
        <h2>{name}</h2>
        <div id={placeId}
          className={(itemClicked && listItem===placeId) ? 'item-list-details-expanded' : 'item-list-details'}>
          <h3 className='list-item-rating'>Rating: {rating}</h3>
          <p>{address}</p>
          <span>{city}</span><span>{state}</span><span>{zipCode}</span>
          <p>{contact}</p>
          <strong>Status: </strong><span>{hours}</span>
          <br></br>
          <img
            className='list-item-image'
            alt={'photo of ' + name}
            src= {imgSrc}
            >
          </img>
          <p className='list-item-tip'>{tip}</p>

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
