//IIFE
(function(){
    
    //EcoString Object maken
    function EcoString(id, ecoClass){
        
        this.API_URL = 'https://datatank.stad.gent/4/milieuennatuur/ecoplan.geojson';
        
        this.id = id;
        this.ecoClass = ecoClass;
        
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

                        for (var i = 0; i < arrayOfObjects.length; i++) { //Dus 180x deze loop doorlopen want 180 objecten
                            
                            
                            
                            var object = arrayOfObjects[i];
                            
                            object.id = [i];
                            
                            for(var x=0; x < object.length; x++){
                            
                            var oneObject = object[x];
                            var properties = oneObject.properties;
                                
                                
                                         
                            var name = properties.NAAM;
                            var category = properties.CATEGORIE;
  
                                
                                
                            //ALS JE KLIKT OP 1 SPECIFIEK OBJECT WORDT DIENS INFO OPGESLAGEN IN LOCALSTORAGE

                           
                            var oneDiscoverItem = 
                                
                            '<a href="#"><div class="col-xs-12 col-sm-6 discover-items"><div class="imagecontainer"><img class="square-picture"  src="images/activity-images/' + category + '.jpg"></div><div class="text-content height-content"><h4 class="bitter main-title">' + name + '</h4><span  class="raleway">' + 'Go to an ecopoint' + '</span><br><span  class="raleway">' + 'and recieve ' +  2 + ' bees' + '</span></div></div></a>';
                                
                            

                            var activity = document.createElement('li');
                            activity.innerHTML = oneDiscoverItem;    
                            activity.id = [x];    
                            var innerContainer = document.getElementById('innerContainer');    
                            innerContainer.appendChild(activity);
               
                            activity.onclick = function(){
                                document.getElementById('nearbyAndList').style.display = "none";
                                
                                var clickedItem = object[this.id];
                                var properties = clickedItem.properties;       
                                var name = properties.NAAM;
                                var city = properties.GEMEENTE;
                                var street = properties.STRAAT;
                                var streetnumber = properties.NUMMER;
                                var telophone = properties.telefoon;
                                var website = properties.WEBADRES;
                                var category = properties.CATEGORIE;
                                var label = properties.LABEL;
                                var notes = properties.opmerkingen; 
                                
                                var moreInfoExplanation = 'You can find ' + name + ' in ' + city + ' at ' + street + ' ' + streetnumber + '<br><br>You can contact them by calling or visiting their website:<br>' + telophone + '<br>' + website + '<br><br>' + 'More info: <br> Category: ' + category + '<br> Label: ' + label + '<br> Note: ' + notes + '<br><br> <a href="discover-page.html">Go back</a>'; 
                                
                                var moreInfoTitle = document.createElement('h1');
                                var moreInfoDescription = document.createElement('p');
                                moreInfoTitle.innerHTML = name;    
                                moreInfoDescription.innerHTML = moreInfoExplanation;   
                                var moreInfoContainer = document.getElementById('moreInfo');    
                                moreInfoContainer.appendChild(moreInfoTitle);
                                moreInfoContainer.appendChild(moreInfoDescription);
                                
                            }    
                            
                            
                            
                            }    
         
                            var JSONReadyObjects = JSON.stringify(arrayOfObjects);
                            localStorage.setItem('objects', JSONReadyObjects);                    
                    }
                                                       
                 }
                    else {
                        window.alert("Couldn't connect with API");
                    } 
                   
                }
                
                //Als xhr niet is geladen maar dus onerror weergeeft.
                xhr.onerror = function(){
                    window.alert('No inernetconnection/Access to Database');
                }
                xhr.send();               
            };
        
   
        //Maken verder deel uit van object
        this.updateUI = function(){
                
            };
        
        this.toString = function(){
           return `Ecoplan with id: ${this.id}`
        };
    };
    
    var ecoZaak = new EcoString(1, document.querySelector('#ecoString'));
    ecoZaak.loadData();
    
})();