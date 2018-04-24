function forgotPassword() { 
}

function register() {
}

function logIn(){
    console.log("wyświetla to:");
}

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