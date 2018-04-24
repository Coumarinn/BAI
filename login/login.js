firebase.auth().onAuthStateChanged(user => {
    if(user) {
        window.location = '#/home'; //After successful login, user will be redirected to home
    }
});

function forgotPassword() {
}

function register() {
}

function logIn(){

    var userEmail = document.getElementById("inputEmail").value;
    var userPass = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });
}

var provider = new firebase.auth.FacebookAuthProvider();
function logInByFacebook(){
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

var provider = new firebase.auth.GoogleAuthProvider();
function logInByGoogle(){
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