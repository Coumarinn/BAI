function forgotPassword() {
    var auth = firebase.auth();
    var emailAddress = document.getElementById("inputEmail").value;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });
}