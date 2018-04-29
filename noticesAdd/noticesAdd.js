function pushData(){

    var place = document.getElementById("place").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var description = document.getElementById("description").value;
    var userId =   firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email;
    var createdAt = firebase.database.ServerValue.TIMESTAMP;

    if (place == '' || time == '' || date == '') {
      window.alert("Uzupelnij pole miejsce i czas");
    } else {
      var firebaseRef = firebase.database().ref();

      var dataToPush = {
        userId: userId,
        userEmail: userEmail,
        place: place,
        date: date,
        time: time,
        description: description,
        createdAt: createdAt
      }

      firebaseRef.child("notes").push().set(dataToPush);

      window.alert("Zgloszenie dodane");

      loadMultipleHtmlFiles("notices");

    }

}
