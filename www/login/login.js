firebase.auth().onAuthStateChanged(function(user) {

    if(user) {
        window.location.replace("#/home"); //After successful login, user will be redirected to home
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

        if (window.plugins) {
        window.location.replace("/android_asset/www/index.html#/home");
      } else {
        window.location.replace("#/home");
      }
    }).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
    });

}

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


function logInByGoogle(){


  if (window.plugins) {
    //podczas logowania sie z komorki
  window.plugins.googleplus.login(
          {
                   'webClientId' : '216795094485-njm6727e0hg2vd42afvrdadaopuh229q.apps.googleusercontent.com',
                   'offline': true
          },
          function (obj) {

              if (!firebase.auth().currentUser) {
                  firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
                  .then((success) => {
                  })
                  .catch((error) => {
                        });
              }else{
              }
          },

      );


} else {
    //podczas logowania sie z strony web
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider);

    } else {

        firebase.auth().signOut();

    }
  }

}
