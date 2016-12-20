<<<<<<< HEAD
var currentTotalBees = JSON.parse(localStorage.getItem("currentTotalBees"));

if(currentTotalBees < 100){
            progressPercentage = currentTotalBees;
        }
        else if(currentTotalBees < 200){
            progressPercentage = currentTotalBees - 100;
        }
        else if(currentTotalBees < 300){
           progressPercentage = currentTotalBees - 200;
           
        } 
        else if(currentTotalBees < 400){
          progressPercentage = currentTotalBees -300;
        }
        else if(currentTotalBees < 500){
            progressPercentage = currentTotalBees - 400;
        }
        else if(currentTotalBees >= 500){
            progressPercentage = 100;
            alert("You've reached the maximum amount of bees earner, we thank you for doing such a great job protecting nature.")
        }
        
    
    
    
var progress =  progressPercentage + "%";
=======

var progress = 20 + "%";
>>>>>>> b2eab1d566e06f9a547871645475da98671d6e11

function progressbar() {
  var indicator = document.querySelector(".progressbar-indicator");
  indicator.style.width = progress;
}
progressbar();

