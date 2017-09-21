var Maps = (function(){   

    var markersOrigen = [];
    var markersDes

    var markerOrigen;
    var markerDestino;
    var markerOrigenDos;
    var markerDestinoDos;
    var inputorigenLat;
    var inputdestinoLat;
    var inputorigenLng;
    var inputdestinoLng;

    var initMap = function(){
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var bangalore = {lat: 17.06, lng: -96.72}
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: bangalore
        });
        directionsDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };

        inputorigenLat = document.getElementById('origenLat');
        inputorigenLng = document.getElementById('origenLng');
        inputdestinoLat = document.getElementById('destinoLat');
        inputdestinoLng = document.getElementById('destinoLng');        
        
        markerOrigen = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: 17.065297, lng: -96.722882}
        });         
         
        markerOrigen.addListener('click', onChangeHandler);

        markerDestino = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: {lat: 16.966045, lng: -96.705956}
        });
        markerDestino.addListener('click', onChangeHandler);

        console.log(markerDestino.position);

        inputorigenLat.setAttribute("value", markerOrigen.position.lat());
        inputorigenLng.setAttribute("value", markerOrigen.position.lng());
        inputdestinoLat.setAttribute("value", markerDestino.position.lat());
        inputdestinoLng.setAttribute("value", markerDestino.position.lng());

      };

    var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
        inputorigenLat.setAttribute("value", markerOrigen.position.lat());
        inputorigenLng.setAttribute("value", markerOrigen.position.lng());
        inputdestinoLat.setAttribute("value", markerDestino.position.lat());
        inputdestinoLng.setAttribute("value", markerDestino.position.lng());        
        directionsService.route({
          origin: markerOrigen.position,
          destination: markerDestino.position,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

      var calculateAndDisplayRouteDos = function(directionsService, directionsDisplay) {
        inputorigenLat.setAttribute("value", markerOrigenDos.position.lat());
        inputorigenLng.setAttribute("value", markerOrigenDos.position.lng());
        inputdestinoLat.setAttribute("value", markerDestinoDos.position.lat());
        inputdestinoLng.setAttribute("value", markerDestinoDos.position.lng());        
        directionsService.route({
          origin: markerOrigenDos.position,
          destination: markerDestinoDos.position,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

    return {
        "initMap": initMap 
    }      
})();