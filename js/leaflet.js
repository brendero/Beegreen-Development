
    
        //     initialize the map on the "map" div with a given center and zoom
          var mymap = L.map('mapid').setView([51.0543, 3.7174], 13);
//            var mymap = L.mapbox.map('mapid', 'mapbox.streets');
//
//                 L.mapbox.accessToken = 'pk.eyJ1IjoiYWRyaWdsaWIiLCJhIjoiY2l3bHVxYm1wMDAwMjJ0bnE2MWp3azhmdiJ9.E3Udm-vhUj4CEWJuCC_big';
//                 L.control.locate().addTo(mymap);

                L.tileLayer('https://api.mapbox.com/styles/v1/adriglib/ciwlv3jbb00062qmvav4g95i4/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRyaWdsaWIiLCJhIjoiY2l3bHVxYm1wMDAwMjJ0bnE2MWp3azhmdiJ9.E3Udm-vhUj4CEWJuCC_big', {
                attribution: '',
                maxZoom: 18,
                id: 'your.mapbox.project.id',
                accessToken: 'pk.eyJ1IjoiYWRyaWdsaWIiLCJhIjoiY2l3bHVxYm1wMDAwMjJ0bnE2MWp3azhmdiJ9.E3Udm-vhUj4CEWJuCC_big'
                }).addTo(mymap);

                
            


                
                   
