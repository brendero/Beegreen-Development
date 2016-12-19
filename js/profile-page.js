;(function(){
    
     var profilePageContent = localStorage.getItem('addToProfile');
     var arrayOfActivity = JSON.parse(profilePageContent);
    
    console.log(arrayOfActivity);
     
     for(i = 0; i < arrayOfActivity.length; i++){
         
         var oneActivityItem = '<a href="#"><div class="col-xs-12 col-sm-6 discover-items"><div class="imagecontainer"><img class="square-picture"  src="images/activity-images/' + arrayOfActivity[i].image + '.jpg"></div><div class="text-content height-content"><h4 class="bitter main-title">' + arrayOfActivity[i].productname + '</h4><span  class="raleway">' + 'Went to an ecopoint' + '</span><br><span  class="raleway">' + 'and recieved ' +  arrayOfActivity[i].bees + ' bees' + '</span></div></div></a>';
    
     var activity = document.createElement('li');
     activity.innerHTML = oneActivityItem;    
     activity.id = [i];   
     var innerContainer = document.getElementById('inner-container');    
     innerContainer.appendChild(activity);
     }
     
    
})();