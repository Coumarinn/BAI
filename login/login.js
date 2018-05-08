firebase.auth().onAuthStateChanged(user => {
    if(user) {
        window.location = '#/home'; //After successful login, user will be redirected to home
    } else {
        window.location = '#/login';
    }
});

function forgotPassword() {
}

function register() {
}

function logIn(){

    var userEmail = document.getElementById("inputEmail").value;
    var userPass = document.getElementById("inputPassword").value;


    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
    });

}

var providerFB = new firebase.auth.FacebookAuthProvider();
function logInByFacebook(){
    firebase.auth()

        .signInWithPopup(providerFB).then(function (result) {
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

        .signInWithRedirect(provider).then(function(result) {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...

        console.log(token)
        console.log(user)
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
    });
    //
    // firebase.auth().getRedirectResult().then(function(result) {
    //     if (result.credential) {
    //         // This gives you a Google Access Token.
    //         // You can use it to access the Google API.
    //         var token = result.credential.accessToken;
    //         // The signed-in user info.
    //         var user = result.user;
    //         // ...
    //     }
    // }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    // });
}