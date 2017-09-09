//model

  // var bars = 'bar';
  // var thingsToDo = 'todo';
  // var restaurants = 'restaurant';
  // var cafe = 'cafe';

  var locations = [{
          title: 'Northcote Arms',
          type: 'bar',
          location: {
              lat: 51.560395,
              lng: -0.001637
          }
      },
      {
          title: 'All you read is love',
          type: 'cafe',
          location: {
              lat: 51.570642,
              lng: 0.014055
          }
      },
      {
          title: 'Little Saigon',
          type: 'restaurant',
          location: {
              lat: 51.569132,
              lng: 0.012022
          }
      },
      {
          title: 'The Red Lion',
          type: 'bar',
          location: {
              lat: 51.567992,
              lng: 0.010976
          }
      },
      {
          title: 'Marmelo',
          type: 'restaurant',
          location: {
              lat: 51.564073,
              lng: -0.005854
          }
      },
      {
          title: 'Leyton Technical',
          type: 'bar',
          location: {
              lat: 51.558887,
              lng: -0.007482
          }
      },
      {
          title: 'Hitchcock house',
          type: 'thingsToDo',
          location: {
              lat: 51.560066,
              lng: 0.007322
          }
      },
      {
          title: 'Mora Italian',
          type: 'restaurant',
          location: {
              lat: 51.559262,
              lng: 0.006974
          }
      },
      {
          title: 'Olympic Stadium',
          type: 'thingsToDo',
          location: {
              lat: 51.539469,
              lng: -0.016590
          }
      },
      {
          title: 'Roof East',
          type: 'bar',
          location: {
              lat: 51.541811,
              lng: -0.001248
          }
      },
      {
          title: 'Westfield',
          type: 'thingsToDo',
          location: {
              lat: 51.543452,
              lng: -0.006527
          }
      },
      {
          title: 'London Aquatics Centre',
          type: 'Sports, Sights',
          location: {
              lat: 51.540972,
              lng: -0.010674
          }
      },
      {
          title: 'The Breakfast Club',
          type: 'Restaurants',
          location: {
              lat: 51.550681,
              lng: -0.024590
          }
      }
  ];



  //Create a map variable
  var map;
  var marker;
  var markers = [];
  var largeInfowindow; 
  var bounds;
      //var myObservable = ko.observableArray(locations);

      var viewModel = function() {
          var self = this;
          var marker;

          var Locations = function(element) {
          this.title = element.title,
          this.location = element.location,
          this.marker = element.marker,
          this.isVisible = ko.observable(true)
          }

          self.locationPlaces = ko.observableArray([]);

          locations.forEach(function(locationItem) {
          self.locationPlaces.push(new Locations(locationItem));
          });

          self.openWindow = function(place) {
          google.maps.event.trigger(place.marker, 'click');
          };

         self.clickHandler = function(place) {
              
              place.marker.setAnimation(google.maps.Animation.BOUNCE); // this = marker
                  setTimeout(function() {
                      place.marker.setAnimation(null)
                  }, 750);
          };



  //close viewModel
}
var vm = new viewModel();

          // marker.addclickFunction(place) {
          //     if (this.title) {
          //         //var self = this;
          //         //neither this nor self nor marker on its own works. marker just picks up the last marker.
          //         marker.setAnimation(google.maps.Animation.BOUNCE);
          //         setTimeout(function() {
          //             marker.setAnimation(null);
          //         }, 750);

          //     }
          //}


          // self.typeChoices = ['All places', 'Bars', 'Things to do', 'Restaurants', 'Cafes'];
          // self.typeSelector = ko.observable(self.typeChoices[0]);

          // self.filterItems = ko.computed(function() {
          // var listItem = self.locationPlaces();
          // var typeSelector = self.typeSelector();
          // for (var i = 0; i < listItem.length; i++) {
          // if (typeSelector === self.typeChoices[0]) {
          // listItem[i].isVisible(true);
          // if (marker) {
          // listItem[i].marker.setVisible(true);
          // }//13/7

          // } else if (typeSelector !== listItem[i].type) {
          //   listItem[i].isVisible(false);
          //   listItem[i].marker.setVisible(false);
          // } else {
          //   listItem[i].isVisible(true);
          //   listItem[i].marker.setVisible(true);
          // }
      //}
  //};

//  Initiate google event to open infoWindow when list item is clicked
//closes the VM

//store viewModel in variable, created in initMap


  function initMap() {
    //var self = this;
      map = new google.maps.Map(document.getElementById('map'), {
          center: {
              lat: 51.555111,
              lng: -0.001083
          },
          zoom: 14,
          //styles: styles,
          mapTypeControl: false
      });
      //??
      var infoWindow = new google.maps.InfoWindow({
    maxWidth: 150
  });
            var defaultIcon = makeMarkerIcon('0091ff');
            var highlightedIcon = makeMarkerIcon('FFFF24')

            largeInfowindow = new google.maps.InfoWindow();
            bounds = new google.maps.LatLngBounds();

            for (var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var title = locations[i].title;
          marker = new google.maps.Marker({
              position: position,
              title: title,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: defaultIcon,
              id: i
          });
          bounds.extend(marker.position);
          vm.locationPlaces()[i].marker = marker;
          markers.push(marker);

          marker.addListener('click', function() {
              var self = this;
              populateInfoWindow(this, largeInfowindow); 
              self.setAnimation(google.maps.Animation.BOUNCE);
                  setTimeout(function() {
                      self.setAnimation(null);
                  }, 750);
          });

          marker.addListener('mouseover', function() {
              this.setIcon(highlightedIcon);
          })



          marker.addListener('mouseout', function() {
              this.setIcon(defaultIcon);
          });

          bounds.extend(markers[i].position);

      }
      //closes the for loop
            map.fitBounds(bounds);


function makeMarkerIcon(markerColor) {
            var markerImage = new google.maps.MarkerImage(
              //'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +  '|40|_|%E2%80%A2',
              'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
              new google.maps.Size(21, 34),
              new google.maps.Point(0, 0),
              new google.maps.Point(10, 34),
              new google.maps.Size(21, 34));
          return markerImage;
      }


          function populateInfoWindow(marker, infowindow) {
            google.maps.event.trigger(this.marker, 'click');
          if (infowindow.marker != marker) {
              infowindow.marker = marker;
              infowindow.setContent('<div>' + marker.title + '</div>');
              infowindow.open(map, marker);

              //make sure marker window is cleared if infowindow is closed
              infowindow.addListener('closeclick', function() {
                  infowindow.marker = null;
              });

              var streetViewService = new google.maps.StreetViewService();
              var radius = 50;
              //in case status is okay, (pano found), compute position of streetview image, then calculate heading, then get a pano from that and set options
              function getStreetView(data, status) {
                  if (status == google.maps.StreetViewStatus.OK) {
                      var nearStreetViewLocation = data.location.latLng;
                      var heading = google.maps.geometry.spherical.computeHeading(
                          nearStreetViewLocation, marker.position);
                      infowindow.setContent('<div>' + marker.title + '</div><div id="pano"</div>');
                      var panoramaOptions = {
                          position: nearStreetViewLocation,
                          pov: {
                              heading: heading,
                              pitch: 30
                          }
                      };
                      var panorama = new google.maps.StreetViewPanorama(
                          document.getElementById('pano'), panoramaOptions);
                  } else {
                      infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No street view found</div>');
                  }
              }
              // use streetview service to get the closest streetview image witin 50m
              streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
              //open info window on correct market
              infowindow.open(map, marker);

          }

    };
         ko.applyBindings(vm);


};
          

          // self.filterItems = ko.computed(function() {
          //   var filter = self.filter();
          //   if (!filter) {
          //     return self.items;
          //   } else {
          //     return ko.utils.arrayFilter(self.items(), function(item) {
          //       return ko.utils.string
          //     })
          //   }
          //   }
          // })

      //};
      // var vm = new viewModel();
      // //ko.applyBindings(new viewModel());
      // ko.applyBindings(vm);


      //ko.applyBindings(new viewModel());

      //     this.myComputedObservable = ko.computed(function() {
      //         return self.personName() + " " + self.personAge();
      //     });
      // };




      //called by onclick

  //} //closes initMap


  // // Close the dropdown menu if the user clicks outside of it
  // window.onclick = function(event) {
  //   if (!event.target.matches('.dropbtn')) {

  //     var dropdowns = document.getElementsByClassName("dropdown-content");
  //     for (var i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // }



  // document.getElementById('show-listings').addEventListener('click', showListings);
  // document.getElementById('hide-listings').addEventListener('click', hideListings);
  // document.getElementById('toggle-drawing').addEventListener('click', function(){
  // toggleDrawing(drawingManager);
  // });

  // document.getElementById('zoom-to-area').addEventListener('click', function() {
  //         zoomToArea();
  //       });

  // document.getElementById('search-within-time').addEventListener('click', function() {
  //         searchWithinTime();
  //       });


  //   function zoomToArea() {
  //   // Initialize the geocoder.
  //   var geocoder = new google.maps.Geocoder();
  //   // Get the address or place that the user entered.
  //   var address = document.getElementById('zoom-to-area-text').value;
  //   // Make sure the address isn't blank.
  //   if (address == '') {
  //     window.alert('You must enter an area, or address.');
  //   } else {
  //     // Geocode the address/area entered to get the center. Then, center the map
  //     // on it and zoom in
  //     geocoder.geocode(
  //       { address: address,
  //         componentRestrictions: {locality: 'London'}
  //       }, function(results, status) {
  //         if (status == google.maps.GeocoderStatus.OK) {
  //           map.setCenter(results[0].geometry.location);
  //           map.setZoom(15);
  //         } else {
  //           window.alert('We could not find that location - try entering a more' +
  //               ' specific place.');
  //         }
  //       });
  //   }

  // }
  // </script>
  // <!--TffODO: Load the JS API ASYNCHRONOUSLY below.-->
  // <script async defer
  // src="https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=AIzaSyB_QOWtSCQ1B67BoVzsX_vM2KaOiFamI7U&v =3&callback=initMap">
  // //https://maps.googleapis.com/maps/api/distancematrix/json?origins=4800+ElCaminoReal+LosAltos+CA&destinations==2465+LathemStreet+MountainView+CA&key=AIzaSyB_QOWtSCQ1B67BoVzsX_vM2KaOiFamI7U
  // //milan to florecne
  // //https://maps.googleapis.com/maps/api/directions/json?origin=Florence&destination=Milan&waypoints=Bologna|Venice|Genoa&key=AIzaSyB_QOWtSCQ1B67BoVzsX_vM2KaOiFamI7U