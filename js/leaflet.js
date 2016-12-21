window.onLoad = init(); 

 var map;

Number.prototype.toRad = function () {  
	return this * Math.PI/180; 
};

      function init() {
          
         map = new L.Map('mapid');
         L.tileLayer('https://api.mapbox.com/styles/v1/adriglib/ciwlv3jbb00062qmvav4g95i4/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRyaWdsaWIiLCJhIjoiY2l3bHVxYm1wMDAwMjJ0bnE2MWp3azhmdiJ9.E3Udm-vhUj4CEWJuCC_big', {
            attribution: '&copy; BeeGreen',
            maxZoom: 18
         }).addTo(map);
         map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

         // map view before we get the location
          map.setView(new L.LatLng(51.0543, 3.7174), 13);
      }

      function onLocationFound(e) {
         var radius = 500;
         var radiusKM = radius/1000;
         var location = e.latlng;
         L.marker(location).addTo(map);
         L.circle(location, radius).addTo(map);

            for(var i =0; i<=180; i++) {
              var items = document.getElementById(i);
              var coordinates =items.getAttribute("data-latlon");

              var longlat = coordinates.split(",");
              var lat = longlat[1];
              var long = longlat[0];  

              var distance = Utils.calculateDistanceBetweenTwoCoordinates(lat,long,location.lat,location.lng);
              if(distance <= radiusKM){
               }
               else {
                 items.style.display = "none";
               }
            }  
      }
      function onLocationError(e) {
         alert(e.message);
      }

      function calculateDistanceBetweenTwoCoordinates(lat1, lng1, lat2, lng2){
        var R = 6371; // km
        var lat1 = parseFloat(lat1);
        var lng1 = parseFloat(lng1);
        var lat2 = parseFloat(lat2);
        var lng2 = parseFloat(lng2);

        var dLat = (lat2-lat1).toRad();
        var dLon = (lng2-lng1).toRad();
        var lat1 = lat1.toRad();
        var lat2 = lat2.toRad();

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c
        return d;//in km
    }

      function getLocationLeaflet() {
         map.on('locationfound', onLocationFound);
         map.on('locationerror', onLocationError);

         map.locate({setView: true, maxZoom: 15});
      }
         
        var nearbyButton = document.querySelector('#nearby');
                  nearbyButton.addEventListener('click',function() {
          getLocationLeaflet();
        });
          