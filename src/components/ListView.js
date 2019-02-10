import React, { Component } from 'react';
import ListItem from './ListItem';

class ListView extends Component {


  render() {
    const { isOpen, toggleItemExpansion, listItem, itemClicked, venueDetails, filteredResults } = this.props;

    return(
      <div id='listview'>
        <aside
          className={ 'list-view ' + (isOpen ? 'show-list': 'hide-list')}
          >
          <div className='search-results-list'>
            <ol className='results-grid'>
              {filteredResults.map((result,i) => {
                console.log(venueDetails);
                console.log(result);
                var venueFromState = venueDetails.filter(venue => venue.id === result.venue.id)[0];
                console.log(venueFromState);
                return <ListItem
                  key={result.venue.id}
                  name={result.venue.name}
                  placeId = {result.venue.id}
                  address={ venueFromState ? (venueFromState.location ? (venueFromState.location.address) : "No Address" ): "No Address" }
                  city={ venueFromState ? (venueFromState.location ? (venueFromState.location.city) : " " ): " " }
                  state={ venueFromState ? (venueFromState.location ? (', '+ venueFromState.location.state) : " " ): " " }
                  zipCode={ venueFromState ? (venueFromState.location ? (' '+ venueFromState.location.postalCode) : " " ): " " }
                  hours={ venueFromState ? (venueFromState.hours ? (venueFromState.hours.status) : 'No hours') : 'No hours'}
                  imgSrc={venueFromState ? ( venueFromState.bestPhoto ? (venueFromState.bestPhoto.prefix + '250x200' + venueFromState.bestPhoto.suffix) : ' ') : ' '}
                  contact= {venueFromState ? ( venueFromState.contact ? (venueFromState.contact.formattedPhone) : 'none') : 'none'}
                  rating = {venueFromState ? ( venueFromState.rating ? (venueFromState.rating) : 'none' ) : 'none'}
                  tip = { venueFromState ? ( venueFromState.tips ? (`"`+venueFromState.tips.groups[0].items[0].text + `"`) : " " ) : " "}
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
