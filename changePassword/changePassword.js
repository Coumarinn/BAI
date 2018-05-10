function changePassword() {
    var user = firebase.auth().currentUser;
    var newPassword = document.getElementById("newPassword").value;

    user.updatePassword(newPassword).then(function() {
        // Update successful.
        window.alert("Haslo zresetowane")
    }).catch(function(error) {
        // An error happened.
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });
}