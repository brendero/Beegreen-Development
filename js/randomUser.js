function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function() {

 var App = {
        "init": function() {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('Beegreen.users'); // Initialize the ApplicationDbContext object via the methode init. Do not forget the connection string as a parametervalue of this function
            this._listUser = document.querySelector('.feed-container');
             if(this._applicationDbContext.getLecturers() == null) {

                // Load JSON from corresponding RandomUserMe API with certain URL
                Utils.getJSONPByPromise(this.URLRANDOMUSERME).then(
                    function(data) {
                        var users = data.results, lecturer = null, user = null;
                        for(var i=0;i<users.length;i++) {
                            user = users[i];
                            lecturer = new Lecturer();
                            lecturer.FirstName = user.name.first;
                            lecturer.SurName = user.name.last;
                            lecturer.DayOfBirth = new Date(user.dob);
                            lecturer.UserName = user.login.username;
                            lecturer.PassWord = user.login.password;
                            lecturer.Email = user.email;
                            lecturer.Picture = user.picture.thumbnail;
                            switch(user.gender) {
                                case 'male': lecturer.Gender = Genders.MALE;break;
                                case 'female': lecturer.Gender = Genders.FEMALE;break;
                                default: lecturer.Gender = Genders.NOTKNOWN;break;
                            }
                            var lecturerAdded = self._applicationDbContext.addLecturer(lecturer);
                        }
                    },
                    function(status) {
                        console.log(status);
                    }
                );

            } else {
                // Update a lecturer
                var id = this._applicationDbContext.getLecturers()[0].Id;
                var lecturer = this._applicationDbContext.getLecturerById(id);
                this.updateUiusersList();
                if(lecturer != null) {
                    lecturer.FirstName = 'Olivia';
                    var result = this._applicationDbContext.updateLecturer(lecturer);
                    console.log(result);
                }
            }
        },
            
     "updateUiusersList" : function() {

        var lecturers = this._applicationDbContext.getLecturers(); // Get all tweets
        console.log(lecturers);
        if(lecturers != null) {

          var strHTML = '', lecturer = null;
          for(var i=0; i < 30;i++) {
            lecturer = lecturers[i];
            strHTML += '<a>';
            strHTML += '<div class="items-container">';
            strHTML += '<div class="imagecontainer">';
            strHTML += '<img class="square-picture" src="'+ lecturer.Picture +'">';
            strHTML += '</div>';
            strHTML += '<div class="text-content">';
            strHTML += '<h4 class="bitter friend-name">'+ lecturer.FirstName+ " " +lecturer.SurName+'</h4>';
            strHTML += '<span class="raleway">'+ "Walked in Zuidpark"+'</span><br>'
            strHTML += '<span class="raleway">'+ "Recieved 4 Bees"+'</span>'
            strHTML += '</div>';
            strHTML += '</div>';
            strHTML += '</a>';
          }
          this._listUser.innerHTML = strHTML;
        }

      }
    }

App.init();
});