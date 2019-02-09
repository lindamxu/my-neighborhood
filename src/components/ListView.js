import React, { Component } from 'react';
import ListItem from './ListItem';

class ListView extends Component {

  render() {
    const { isOpen, toggleItemExpansion, listItem, itemClicked } = this.props;

    return(
      <div id='listview'>
        <aside
          className={ 'list-view ' + (isOpen ? 'show-list': 'hide-list')}
          >
          <div className='search-results-list'>
            <ol className='results-grid'>
              {this.props.filteredResults.map((result,i) => {
                return <ListItem
                  key={result.venue.id}
                  name={result.venue.name}
                  address={result.venue.formatted_address}
                  placeId = {result.venue.id}
                  imgSrc={result.venue.bestPhoto}
                  priceLevel = {result.venue.price_level}
                  rating = {result.venue.rating}
                  types={result.venue.types}
                  itemClicked={itemClicked}
                  listItem={listItem}
                  toggleItemExpansion={toggleItemExpansion.bind(this)}
                  />
              })}
            </ol>
          </div>
        </aside>
      </div>
    );
  }
}
export default ListView;
