import React, { Component } from 'react';
import Map from './components/Map.js';
import ListView from './components/ListView.js';
import { Route, Switch } from 'react-router-dom';
import Icon from './icons/marker.png';
import * as FoursquareAPI from './FoursquareAPI.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.searchBoxPlaces = this.searchBoxPlaces.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.state ={
      searchResults: [],
      markers: [],
      recommendations: [],
      mapref: ''
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

         if (place.geometry) {
           //Google Map Suggestions
           var position = place.geometry.location;
         } else {
           //FourSquare recommendations
           position = {lat: place.venue.location.lat, lng: place.venue.location.lng}
         }

         if (place.place_id) {
           var place_id = place.place_id;
         } else {
           place_id = place.venue.id;
         }
         var marker = new window.google.maps.Marker({
           map: this.map,
           icon: icon,
           title: place.name,
           position: position,
           id: place_id
         });

         let self = this;
         var infoWindow = new window.google.maps.InfoWindow();
         marker.addListener('click', function() {
           if (infoWindow.marker === this) {
             console.log("infoWindow is already on the marker");
           } else {
             self.openInfoWindow(this, infoWindow);
           }
         });

         this.state.markers.push(marker);

  }
}
  openInfoWindow = (marker, infoWindow) => {
    var service = new window.google.maps.places.PlacesService(this.map);

    let self = this;

    if (this.state.recommendations.length === 0) {
      service.getDetails({
        placeId: marker.id
      }, function(place, status) {
        console.log(place);
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          infoWindow.marker = marker;
          var innerHTML = "<div className='infoWindow' style=' text-align: center'>";
          if (place.name) {
              innerHTML += '<strong>' + place.name + '</strong>';
            }

         if (place.formatted_address) {
           var address_strs = place.formatted_address.split(',');

           for (var i=0; i < address_strs.length; i++ ) {
             innerHTML += '<br>' + address_strs[i];
           }
         }
         if (place.formatted_phone_number) {
           innerHTML += '<br>' + place.formatted_phone_number;
         }
         if (place.opening_hours) {
           innerHTML += '<br><br><strong>Hours:</strong><br>' +
               place.opening_hours.weekday_text[0] + '<br>' +
               place.opening_hours.weekday_text[1] + '<br>' +
               place.opening_hours.weekday_text[2] + '<br>' +
               place.opening_hours.weekday_text[3] + '<br>' +
               place.opening_hours.weekday_text[4] + '<br>' +
               place.opening_hours.weekday_text[5] + '<br>' +
               place.opening_hours.weekday_text[6];
         }
         if (place.photos) {
           innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
               {maxHeight: 100, maxWidth: 200}) + '">';
         }
         innerHTML += '</div>';


        infoWindow.setContent(innerHTML);
        infoWindow.open(self.map, marker);
        infoWindow.addListener('closeclick', function() {
          infoWindow.setMarker = null;
        })
         }
        }
      )

    } else {
      FoursquareAPI.getVenueDetails(marker.id).then((venue) => {
        infoWindow.marker = marker;
        var innerHTML = "<div className='infoWindow' style=' text-align: center'>";
        if (venue.name) {
            innerHTML += '<strong>' + venue.name + '</strong>';
          }
        if (venue.location) {

          for (var i=0; i < venue.location.length; i++ ) {
            innerHTML += '<br>' + venue.location[i];
          }
        }

        if (venue.contact.phone) {
          innerHTML += '<br>' + venue.contact.formattedPhone;
        }



        if (venue.hours) {
          innerHTML += '<br><br><strong>Hours:</strong><br>';

          for (var j =0; j < venue.hours.timeframes.length; j++ ) {
            innerHTML += '<br>' + venue.hours.timeframes[j].days + ': ' + venue.hours.timeframes[j].open[0].renderedTime;
          }

        }

        innerHTML += '</div>';
        infoWindow.setContent(innerHTML);
        infoWindow.open(self.map, marker);
        infoWindow.addListener('closeclick', function() {
          infoWindow.setMarker = null;
        })

      })
    }


  }
  searchBoxPlaces = (searchBox) => {
    this.hideMarkers(this.state.markers);
    this.setState({
      recommendations: []
    })
    var places = searchBox.getPlaces();
    this.setState({
      searchResults: places
    })

    this.createMarkersForPlaces(places);
  }

  getRecs = () => {
    this.hideMarkers(this.state.markers);
    FoursquareAPI.getRecs().then((places) => {
      this.setState({
        recommendations: places
      })
      this.createMarkersForPlaces(this.state.recommendations)
    })
  }


  initMap(searchResults) {
    console.log(this.props.searchResults);
    var map = new window.google.maps.Map(
      document.getElementById('map-canvas'), {
        center: { lat: 41.8781, lng: -87.6298},
        zoom: 14
      });
    this.map = map;

    this.setState({
      mapref: map
    })

    // TODO: set bounds for searchbox

    var searchBox = new window.google.maps.places.SearchBox(
      document.getElementById('search-bar-input')
    )
    searchBox.bindTo('bounds', map);
    let self = this;
    searchBox.addListener('places_changed', function() {
      self.searchBoxPlaces(this);
    });

    if (this.state.searchResults) {
      this.createMarkersForPlaces(this.state.searchResults);
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
        this.initMap(this.state.searchResults);
      })
    } else {
      this.initMap(this.state.searchResults);
    }
  }

  render() {
    return (
      <div className="homepage-container">
        <Switch>
          <Route exact path="/" render={() => (
            <Map
              getRecs={this.getRecs}
              initializeMap={this.initMap}
              searchResults={this.state.searchResults}
              />
          )}
          />
          <Route path='/list' render={() => (
            <ListView
              searchResults={this.state.searchResults}
              recResults={this.state.recommendations}
              getRecs={this.getRecs}
              />
            )}
          />
        </Switch>

      </div>

    );
  }
}

export default App;
