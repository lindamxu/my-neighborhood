import React, { Component } from 'react';
import Map from './components/Map.js';
import ListView from './components/ListView.js';
import { Route, Switch } from 'react-router-dom';
import Icon from './icons/marker.png';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.searchBoxPlaces = this.searchBoxPlaces.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.state ={
      searchResults: [],
      markers: []
    }
  }
  hideMarkers = (markers) => {
    for (var i=0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  createMarkersForPlaces = (places) => {
    for (var i = 0; i < places.length; i++) {
         var place = places[i];
         var icon = {
           url: Icon,
           size: new window.google.maps.Size(35, 35),
           origin: new window.google.maps.Point(0, 0),
           anchor: new window.google.maps.Point(15, 34),
           scaledSize: new window.google.maps.Size(25, 25)
         };
         var marker = new window.google.maps.Marker({
           map: this.map,
           icon: icon,
           title: place.name,
           position: place.geometry.location,
           id: place.place_id
         });
         this.state.markers.push(marker);

         let self = this;
         marker.addListener('click', function() {
           self.openInfoWindow(this);
         });
  }
}
  openInfoWindow = (marker) => {
    var infoWindow = new window.google.maps.InfoWindow({
      map: this.map,
      title: marker.title,
      id: marker.id,
      maxWidth: 200,
      content: 'Hello InfoWindow!'
    })

    infoWindow.open(this.map, marker);
  }
  searchBoxPlaces = (searchBox) => {
    this.hideMarkers(this.state.markers);
    var places = searchBox.getPlaces();
    console.log(places);
    this.setState({
      searchResults: places
    })

    this.createMarkersForPlaces(places);
    console.log(places);
  }


  initMap() {
    console.log('creating map!');
    var map = new window.google.maps.Map(
      document.getElementById('map-canvas'), {
        center: { lat: 41.8781, lng: -87.6298},
        zoom: 14
      });
    this.map = map;

    var searchBox = new window.google.maps.places.SearchBox(
      document.getElementById('search-bar-input')
    )
    searchBox.bindTo('bounds', map);
    let self = this;
    searchBox.addListener('places_changed', function() {
      self.searchBoxPlaces(this);
    });
  }


  componentDidMount() {
    console.log('does this execute again');
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
        <Switch>
          <Route exact path="/" render={() => (
            <Map
              />
          )}
          />
          <Route path='/list' render={() => (
            <ListView
              searchResults={this.state.searchResults}
              />
            )}
          />
        </Switch>

      </div>

    );
  }
}

export default App;
