function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function() {

var App = {
    "init": function() {
        this.URLRANDOMUSERME = 'http://api.randomuser.me/?results=100&callback=json_callback';// Cache the url with random users in variable URLRANDOMUSERME
        this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
        this._applicationDbContext.init('Beegreen.users'); // Initialize the ApplicationDbContext object via the methode init. Do not forget the connection string as a parametervalue of this function

        this.unitTests();

        this._userManager = UserManager;
        this._userManager.init(this._applicationDbContext);
        
        this._frmLogin = document.querySelector("#frm-login");
        this.registerEventListeners();
 },
 "unitTests": function() {
            
            var self = this; // Closure

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
                            lecturer.Bees = Math.floor((Math.random() * 100) + 1);
                            lecturer.UserName = user.login.username;
                            lecturer.PassWord = user.login.password;
                            lecturer.Email = user.email;
                            lecturer.Picture = user.picture.large;
                            
                            var lecturerAdded = self._applicationDbContext.addLecturer(lecturer);
                        }
                    },
                    function(status) {
                    }
                );

            } else {
                // Update a lecturer
                var id = this._applicationDbContext.getLecturers()[0].Id;
                var lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    lecturer.FirstName = 'Olivia';
                    var result = this._applicationDbContext.updateLecturer(lecturer);
                    }
            }
        },
            
    "registerEventListeners": function() {

            // Event Listeners for Form Login
            if(this._frmLogin != null) {
                var self = this; // Hack for this keyword within an event listener of another object

                this._frmLogin.addEventListener('submit', function(ev) {
                    ev.preventDefault();

                    var userName = Utils.trim(this.querySelectorAll('[name="txtUserName"]')[0].value);
                    var passWord = Utils.trim(this.querySelectorAll('[name="txtPassWord"]')[0].value);
                    var result = self._userManager.login(userName, passWord);
                    if(result == null) {

                    } else if(result == false) {

                    } else {
                        self._activeUser = result; // User is Logged in
                        self.unitTests();
                        window.location.assign("./discover-page.html");
                    }
                    
                    return false;
                });
            }

        },
};
App.init();
});