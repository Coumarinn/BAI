function signInByFacebook(){
}

function signInByGoogle(){
}

function createAccount() {
    var userEmail = document.getElementById("inputEmail").value;
    var userPass = document.getElementById("inputPassword").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {

        window.alert("Udalo sie zarejestrowac, witamy!")

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("Error : " + errorMessage);
    });
}


