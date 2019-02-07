import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    console.log(this.props);
    const { name } = this.props;
    return (
      <ul className='result-item-list'>
        <h2>{name}</h2>
      </ul>
    );
  }

}
export default ListItem;
