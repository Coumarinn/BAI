firebase.auth().onAuthStateChanged(function(user) {

    if(user) {
        window.location.replace("/android_asset/www/index.html#/home"); //After successful login, user will be redirected to home
    } else {
        // window.location = '#/login';
    }
});

function forgotPassword() {
}

function register() {
}

function logIn(){

    var userEmail = document.getElementById("inputEmail").value;
    var userPass = document.getElementById("inputPassword").value;


    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(user) {

        window.alert("Udalo sie zalogowac, witamy!")
        // window.location.replace('/android_asset/www/index.html#/home')
    }).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
    });

}

// var providerFB = new firebase.auth.FacebookAuthProvider();
function logInByFacebook(){

    if (!firebase.auth().currentUser) {
        var providerFB = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithRedirect(providerFB);

    } else {

        firebase.auth().signOut();

    }
    // firebase.auth()
    //
    //     .signInWithPopup(providerFB).then(function (result) {
    //     var token = result.credential.accessToken;
    //     var user = result.user;
    //
    //     console.log(token)
    //     console.log(user)
    // }).catch(function (error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //
    //     console.log(error.code)
    //     console.log(error.message)
    // });
}


// var provider = new firebase.auth.GoogleAuthProvider();
function logInByGoogle(){

    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider);

    } else {

        firebase.auth().signOut();

    }
    // firebase.auth()
    //
    //     .signInWithRedirect(provider).then(function(result) {
    //     // This gives you a Google Access Token.
    //     // You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    //
    //     console.log(token)
    //     console.log(user)
    // }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //
    //     console.log(error.code)
    //     console.log(error.message)
    // });

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