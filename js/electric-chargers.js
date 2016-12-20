//IIFE
(function(){
    
    //ElectricString Object maken
    function ElectricString(id, electroClass){
        
        this.API_URL = 'https://raw.githubusercontent.com/adriglib/BeeGreen/master/laapunten-met-naam.geojson';
        
        this.id = id;
        this.electroClass = electroClass;
        
        //Begin LoadData, laad de data/JSON uit de API URL
        this.loadData = function(){
            
            //Omdat 'this' verwijst naar vorig object
            var that = this;
            
            //Gebruik XMLHttpRequest om connenctie aan te maken.
            var xhr = new XMLHttpRequest();
            
                //Open connenctie
                xhr.open('get', this.API_URL, true);
                xhr.responseType = 'json';
            
                //Als connectie aangemaakt en geladen, voer de functie uit om data uit JSON te halen.
                xhr.onload = function(){
                    
                    //==200 wilt zeggen dat er een succesvol request is gebeurd.
                    if(xhr.status == 200) {
                        
                        //Boolean, als waar JSON.parse() en als niet waar XHR.Response.
                        var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                        
                        var features = data.features;
    

                        var arrayOfObjects = [features];
                        
                        console.log(arrayOfObjects);

                        for (var i = 0; i < arrayOfObjects.length; i++) { //Dus 7x deze loop doorlopen want 7 objecten
                            
                            var object = arrayOfObjects[i];
                            
                            for(var x=0; x < object.length; x++){
                            
                            var oneObject = object[x];
                            var properties = oneObject.properties;
                                         
                            var name = properties.NAAM;        
                                
    
                            var oneDiscoverItem = 
                                        '<a href="' + 'more-info.html' + '"><div class="col-xs-12 col-sm-6 discover-items"><div class="imagecontainer"><img class="square-picture"  src="images/activity-images/electriccharger.jpg"></div><div class="text-content height-content"><h4 class="bitter main-title">' + name + '</h4><span  class="raleway">' + 'Charge your vehicle' + '</span><br><span  class="raleway">' + 'and recieve ' +  5 + ' bees' + '</span></div></div></a>';
                                
                            

                            var activity = document.createElement('div');
                            activity.innerHTML = oneDiscoverItem;    
                            activity.className += "animated zoomIn";      
                            var innerContainer = document.getElementById('innerContainer');    
                            innerContainer.appendChild(activity);
                                
                               
                                
                                
                            }
                                                   
                        }
                 
                            
                    }
                    else{
                        window.alert("Couldn't connect with API");
                    }  
                }
                
                //Als xhr niet is geladen maar dus onerror weergeeft.
                xhr.onerror = function(){
                    window.alert('ERROR');
                }
                xhr.send();               
            };
        
        //Maken verder deel uit van object
        this.updateUI = function(){
                
            };
        
        this.toString = function(){
           return `ElectricString with id: ${this.id}`
        };
    };
    
    var electricCharger = new ElectricString(1, document.querySelector('#electricString'));
    electricCharger.loadData();
    console.log(electricCharger.toString());
    
    
})();