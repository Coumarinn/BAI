//routing
var app = Sammy('#main', function() {  

    this.get('#/', function() {
        window.location = "#/login";
        $("#main").load("login/login.html");
    });

    this.get('#/login', function() {
        $("#main").load("login/login.html");
    });
    this.get('#/register', function() {
        $("#main").load("register/register.html");
    });
    this.get('#/forgotPassword', function() {
        $("#main").load("forgotPassword/forgotPassword.html");
    });

    this.get('#/home', function() {
        loadMultipleHtmlFiles("home");
    });

    this.get('#/5km', function() {
        loadMultipleHtmlFiles("notices");
    });

    this.get('#/10km', function() {
        loadMultipleHtmlFiles("notices");
    });

    this.get('#/20km', function() {
        loadMultipleHtmlFiles("notices");
    });

  });
  
  app.run('#/login');
//routing

function loadMultipleHtmlFiles(content) {
    var defArr = [];
    defArr.push($.get('navbar/navbar.html'));
    defArr.push($.get('sidebar/sidebar.html'));
    defArr.push($.get('stickyFooter/stickyFooter.html'));
    $.when.apply($,defArr).done(function(response1, response2, response3){
        if($('#sidebar').length == 0){
            $('#main').html(response1[2].responseText + response2[2].responseText 
                + response3[2].responseText);
            loadContent(content);
            $("#menuButton").click(); //tymczasowe rozwiązanie
        } else {
            loadContent(content);
        }        
    });
}

function loadContent(content){
    var url = content + '/' + content + '.html';
    var html = $.ajax({type: "GET", url: url, async: false}).responseText;
    $("#content").html(html);
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

        }

    } else {
        // No user is signed in.

        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";

    }
});

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
    firebase.auth()

        .signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token)
        console.log(user)
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
    });
}

var provider = new firebase.auth.FacebookAuthProvider();

function facebookLogin() {
    firebase.auth()

        .signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token)
        console.log(user)
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
    });
}

function register() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("Error : " + errorMessage);
    });
}

function logout() {
    firebase.auth().signOut();
}

// function myMap() {
//     var mapProp = {
//         center: new google.maps.LatLng(50.06465009, 19.94497990),
//         zoom: 10,
//     };
//     var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }

function myMap() {
    var mapCanvas = document.getElementById("googleMap");
    var myCenter = new google.maps.LatLng(50.06465009, 19.94497990);
    var mapOptions = {center: myCenter, zoom: 10};
    var map = new google.maps.Map(mapCanvas,mapOptions);
    var icon = {
        url: "mapmarker.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
        position: myCenter,
        icon: icon
    });
    marker.setMap(map);
}