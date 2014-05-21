// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function(){
  function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 2
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        console.log(map);

          var pins = [];
  $.get('/pins.json').done(function(data) {
    pins = data
    $.each(pins, function(index, item){
      // addPin(item);
      addPin(item.latitude, item.longitude);
    });
  });

  var addPin = function(lat, long){
    var loc = new google.maps.LatLng(lat, long);
    var newMarker = new google.maps.Marker({
      position: loc,
      map: map,
      title: "BLAH"
    });
  };

  var placeMarker = function(loc){
    var newMarker = new google.maps.Marker({
      position: loc,
      map: map,
      title: "BLAH"
    });
  };

  google.maps.event.addListener(map, 'click', function(event) {
    var lat = event.latLng.k
    var lng = event.latLng.A

    $.ajax({
      url: "/pins",
      method: "post",
      data: {
        "pin": {
          "latitude": lat,
          "longitude": lng
        }
      },
      dataType: "json",
      success: function(data) {
        addPin(data.latitude, data.longitude)
      },
      error: function(){
        alert("Server is broken!");
      }
    });
});


      }
      google.maps.event.addDomListener(window, 'load', initialize);


});


