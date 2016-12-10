//IIFE
(function(){
    
    //WeatherString Object maken
    function WeatherString(id, weatherClass){
        
        this.API_URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D970013%20AND%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        
        this.id = id;
        this.weatherClass = weatherClass;
        
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
                        
                        var query = data.query;
                        
                        console.log(query);
                        
                        var results = query.results;
                        var channel = results.channel;
                        var item = channel.item;
                        var condition = item.condition;
                        
                        //Haal temperatuur uit condition query
                        var temp = condition.temp;
                        
                        //We initialiseren/maken er een string van en plaatsen temp in een string variable.
                        var temperatuurString = '';
                        
                        //Gaan de string declareren.
                        temperatuurString = temp;
                        
                        console.log('Temperatuur is ' + temperatuurString + '°C in Gent');
                        
                        //Voegen de string toe aan de HTML pagina. 1. Selecteer de span 2. Voeg textContent toe aan de span.
                        var span = document.getElementById('weatherString');
                        span.textContent = temperatuurString + '°C' ; 
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
           return `Weather widget with id: ${this.id}`
        };
    };
    
    var weerTemp = new WeatherString(1, document.querySelector('#weatherString'));
    weerTemp.loadData();
    console.log(weerTemp.toString());
    
    
})();