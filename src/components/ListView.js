import React, { Component } from 'react';
import Header from './Header.js';
import ListItem from './ListItem';

class ListView extends Component {
  render() {
    console.log('list page!');
    return(
      <div>
        <Header />
        <div className='search-results-list'>
          <ol className='results-grid'>
            {this.props.searchResults.map((result,i) => {
              return <ListItem
                name={result.name}
                />
            })}
          </ol>
        </div>
      </div>
    );
  }
}
export default ListView;
