import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    const { name, itemClicked, placeId, listItem, rating, imgSrc, contact, address, hours, city, state, zipCode, tip } = this.props;
    return (
      <li
        className='result-item-list'
        aria-label={'list item details for '+ name}
        >
        <h2>{name}</h2>
        <div id={placeId}
          className={(itemClicked && listItem===placeId) ? 'item-list-details-expanded' : 'item-list-details'}>
          <h3
            tabIndex='0'
            className='list-item-rating'>
            Rating: {rating}
          </h3>
          <div
            tabIndex='0'
            aria-label='formattedAddress'
            >
            <p tabIndex='0'>{address}</p>
            <span tabIndex='0'>{city}</span><span tabIndex='0'>{state}</span><span tabIndex='0'>{zipCode}</span>
          </div>
          <div tabIndex='0' aria-label='phone number'>
            <p tabIndex='0'>{contact}</p>
          </div>
          <div tabIndex='0' aria-label='current status'>
            <strong>Status: </strong><span tabIndex='0'>{hours}</span>
          </div>
          <br></br>
          <img
            tabIndex='0'
            className='list-item-image'
            alt={'photo of ' + name}
            src= {imgSrc}
            >
          </img>
          <div aria-label='description' tabIndex='0'>
            <p tabIndex='0' className='list-item-tip'>{tip}</p>
          </div>

        </div>
        <button
          id={placeId}
          aria-label={'expand list item details for ' + name}
          aria-pressed={ itemClicked ? true : false }
          className={ (itemClicked && listItem===placeId) ? 'up-button' : 'down-button'}
          onClick={this.props.toggleItemExpansion.bind(this)}
          />
      </li>
    );
  }

}
export default ListItem;
