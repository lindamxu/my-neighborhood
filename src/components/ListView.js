import React, { Component } from 'react';
import Header from './Header.js';
import ListItem from './ListItem';

class ListView extends Component {
  render() {
    console.log('list page!');
    return(
      <div>
        <Header
          getRecs={this.props.getRecs}
          />
        <div className='search-results-list'>
          <ol className='results-grid'>
            {this.props.searchResults.map((result,i) => {
              console.log(result);
              return <ListItem
                key={result.id}
                name={result.name}
                address={result.formatted_address}
                placeId = {result.id}
                imgSrc={result.photos[0].getUrl()}
                priceLevel = {result.price_level}
                rating = {result.rating}
                types={result.types}
                />
            })}
          </ol>
        </div>
      </div>
    );
  }
}
export default ListView;
