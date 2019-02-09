import React, { Component } from 'react';
import Map from './components/Map.js';
import ListView from './components/ListView.js';
import Icon from './icons/marker.png';
import Header from './components/Header.js';
import * as FoursquareAPI from './FoursquareAPI.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.state ={
      markers: [],
      recommendations: [],
      filteredResults: [],
      venueDetails: [],
      animatedMarker: false,
      listOpen: false,
      mapref: '',
      itemClicked: false,
      listItem: ''
    }
  }

  startAnimation = (markerId) => {
    console.log('starting animation');
    var pickedMarker = this.state.markers.filter(marker => marker.id === markerId)[0];
    pickedMarker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.map.panTo(pickedMarker.position);

  }
  closeAnimation = (markerId) => {
    console.log('closing animation');
    var pickedMarker = this.state.markers.filter(marker => marker.id === markerId)[0];
    pickedMarker.setAnimation(-1);

  }
  toggleItemExpansion = (event) => {
    this.setState({
      listItem: event.target.getAttribute('id')
    })
    if (this.state.itemClicked) {
      this.setState({
        itemClicked: false,
        animatedMarker: false
      })
    } else {
      this.setState({
        itemClicked: true,
        animatedMarker: true
      })
    }
  }


  toggleList = () => {
    if (this.state.listOpen) {
      this.setState({
        listOpen: false
      })
    } else {
      this.setState({
        listOpen: true
      })
    }
  }

  filterResults = (query) => {
    if (query === '') {
      this.setState({
        filteredResults: [...this.state.recommendations]
      });
    } else {
      this.setState({
        filteredResults: [...this.state.recommendations].filter(place => new RegExp(query, 'i').exec(place.venue.name))
      })
    }
  }

  hideMarkers = (markers) => {
    for (var i=0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
  createMarkersForPlaces = (places) => {

    // TODO: FIX! MAKE ONLY FOR FOURSQUARE API
    for (var i = 0; i < places.length; i++) {
         var place = places[i];
         var icon = {
           url: Icon,
           size: new window.google.maps.Size(35, 35),
           origin: new window.google.maps.Point(0, 0),
           anchor: new window.google.maps.Point(15, 34),
           scaledSize: new window.google.maps.Size(25, 25)
         };

         var position = {lat: place.venue.location.lat, lng: place.venue.location.lng}

         var place_id = place.venue.id;

         var marker = new window.google.maps.Marker({
           map: this.map,
           icon: icon,
           title: place.name,
           position: position,
           animation: null,
           id: place_id
         });

         let self = this;
         var infoWindow = new window.google.maps.InfoWindow();
         marker.addListener('click', function() {
           if (infoWindow.marker === this) {
             console.log("infoWindow is already on the marker");
           } else {
             console.log(infoWindow);
             self.openInfoWindow(this, infoWindow);
           }
         });

         this.state.markers.push(marker);

  }
}
  openInfoWindow = (marker, infoWindow) => {
    let self = this;

    // TODO: Fix marker issue

    console.log(self.state.venueDetails);
    var venueFromState = self.state.venueDetails.filter(venue => venue.id === marker.id)[0];
    console.log(venueFromState);
    console.log('getting venue from state!!');
    infoWindow.marker = marker;
    console.log(infoWindow);
    var innerHTML = "<div className='infoWindow' style=' text-align: center'>";
    if (venueFromState.name) {
        innerHTML += '<strong>' + venueFromState.name + '</strong>';
      }
    if (venueFromState.location) {

      for (var i=0; i < venueFromState.location.length; i++ ) {
        innerHTML += '<br>' + venueFromState.location[i];
      }
    }

    if (venueFromState.contact) {
      innerHTML += '<br>' + venueFromState.contact.formattedPhone;
    }

    if (venueFromState.hours) {
      innerHTML += '<br><br><strong>Hours:</strong>';

      for (var j =0; j < venueFromState.hours.timeframes.length; j++ ) {
        innerHTML += '<br>' + venueFromState.hours.timeframes[j].days + ': ' + venueFromState.hours.timeframes[j].open[0].renderedTime;
      }
    }
    if (venueFromState.bestPhoto) {
      innerHTML +='<br><img src="' + venueFromState.bestPhoto.prefix + '200x100' + venueFromState.bestPhoto.suffix + '">';
    }

    innerHTML += '</div>';
    infoWindow.setContent(innerHTML);
    infoWindow.open(self.map, marker);
    infoWindow.addListener('closeclick', function() {
      infoWindow.setMarker = null;
      console.log(infoWindow);
    })
  }

  getRecs = () => {
    FoursquareAPI.getRecs().then((places) => {
      this.setState({
        recommendations: places,
        filteredResults: places
      })
      /*
      this.getRecommendationDetails(this.state.recommendations); */
    })

  }

  getRecommendationDetails = (places) => {
    console.log('USING THE FoursquareAPI');
    for (var i=0; i < places.length; i++ ) {
      var place = places[i].venue;
      // TODO: NEEDS A PROMISE TO WAIT FOR IT TO FINISH
      FoursquareAPI.getVenueDetails(place.id).then((venue) => {
        this.state.venueDetails.push(venue);
      })
    }
  }


  initMap() {
    var map = new window.google.maps.Map(
      document.getElementById('map-canvas'), {
        center: { lat: 41.8781, lng: -87.6298},
        zoom: 14
      });
    this.map = map;
    this.setState({
      mapref: map
    })

    this.getRecs();

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.filteredResults !== prevState.filteredResults) {
      this.hideMarkers(this.state.markers);
      this.createMarkersForPlaces(this.state.filteredResults);
    }
    //clicking on a new list item when the old one has not been closed
    if ((this.state.listItem !== prevState.listItem) && (prevState.itemClicked===true) && (prevState.animatedMarker===true)) {
      this.closeAnimation(prevState.listItem);
      this.setState({
        itemClicked: true,
        animatedMarker: true
      })
    } //clicking on an list item for the first time
      else if ((this.state.listItem !=='') && (prevState.listItem==='') && (this.state.animatedMarker===true) && (prevState.animatedMarker===false)) {
      console.log('clicking on a list item for the first time');
      this.startAnimation(this.state.listItem);
    } //clicking on the same list item to close it
      else if ((this.state.listItem !=='') && (this.state.listItem === prevState.listItem) && (this.state.animatedMarker===false)) {
      console.log('clicking on the same list item to close it');
      this.closeAnimation(this.state.listItem);
    } //clicking on a new list item when the old one has been closed
      else if ((this.state.listItem !=='') && (this.state.listItem !== prevState.listItem) && (this.state.animatedMarker===true)) {
      console.log('clicking on a new list item when the old one has been closed');
      this.startAnimation(this.state.listItem);
    } //clicking on the same list item to open it and/or if you had clicked on this list item without closing the old one first
      else if ((this.state.listItem !== '') && (this.state.listItem === prevState.listItem) && (this.state.animatedMarker===true)) {
      console.log('clicking on the same list item to open it');
      this.startAnimation(this.state.listItem);
    }
  }
  componentDidMount() {
    if (!window.google) {
      var ref = window.document.getElementsByTagName("script")[0];
      var script = window.document.createElement("script");
      script.type= 'text/javascript';
      script.src = 'https://maps.google.com/maps/api/js?libraries=places&key=AIzaSyC_-JQPgMeuucGSrSBhYAKmr-qNu1gPLZk';
      script.async = true;
      ref.parentNode.insertBefore(script, ref);
      script.addEventListener('load', event => {
        this.initMap();
      })
    } else {
      this.initMap();
    }
  }

  render() {
    return (
      <div className="homepage-container">
          <Header
            toggleList = {this.toggleList}
            filterResults={this.filterResults}
            />
          <ListView
            isOpen = {this.state.listOpen}
            recResults={this.state.recommendations}
            filteredResults={this.state.filteredResults}
            toggleItemExpansion={this.toggleItemExpansion}
            itemClicked={this.state.itemClicked}
            listItem={this.state.listItem}
            />
          <Map
            mapref = {this.state.mapref}
            />
      </div>

    );
  }
}

export default App;
