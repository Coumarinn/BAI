function changePassword() {
    var user = firebase.auth().currentUser;
    var newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(function() {
        // Update successful.
        window.alert("Haslo zresetowane")
    }).catch(function(error) {
        // An error happened.
        window.alert("Error : " + errorMessage);
    });
}