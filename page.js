$(function(){
    var includes = $('[data-include]');
    jQuery.each(includes, function(){
      var file = $(this).data('include') + '/' + $(this).data('include') + '.html';
      $(this).load(file);
    });
  });

$( document ).ready(function() {
    setTimeout(function(){ 
        $("#content").load("home/home.html");
    },  100);
});

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