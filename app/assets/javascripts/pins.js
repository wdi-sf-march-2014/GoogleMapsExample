
$(document).ready(function(){
  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(37.160317, -29.53125),
      zoom: 3
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    console.log(map);

    var pins = [];
    $.get('/pins.json').done(function(data) {
      pins = data
      $.each(pins, function(index, item){
        addPin(item.latitude, item.longitude, item.name);
      });
    });

    var addPin = function(lat, long, name){
      var loc = new google.maps.LatLng(lat, long);
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        title: "BLAH"
      });

      var newInfoWindow = new google.maps.InfoWindow({
        content: "<h3>Added By: " + name + "</h3>"
      });
      addInfoWindowListener(newMarker, newInfoWindow);
    };

    var placeMarker = function(loc){
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        title: "BLAH"
      });
    };

    var lastInfoWindow;
    var addInfoWindowListener = function(marker, newInfoWindow){
      google.maps.event.addListener(marker, 'click', function() {
        if(!!lastInfoWindow){
          lastInfoWindow.close();
        }
        if(lastInfoWindow === newInfoWindow){
          lastInfoWindow = null;
        }
        else {
          newInfoWindow.open(map,this);
          lastInfoWindow = newInfoWindow;
        }
      });
    }
    google.maps.event.addListener(map, 'click', function(event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      $.ajax({
        url: "/pins",
        method: "post",
        data: {
          "pin": {
            "latitude": lat,
            "longitude": lng,
          }
        },
        dataType: "json",
        success: function(data) {
          addPin(data.latitude, data.longitude, data.name)
        },
        error: function(){
          alert("Server is broken!");
        }
      });
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
});
