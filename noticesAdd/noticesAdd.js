function pushData(){

    var place = document.getElementById("place").value;
    var time = document.getElementById("time").value;
    var description = document.getElementById("description").value;
    //dodac zmienna creator =   firebase.auth().currentUser

    if (place == '' || time == '') {
      window.alert("Uzupelnij pole miejsce i czas");
    } else {
      var firebaseRef = firebase.database().ref();

      var dataToPush = {
        place: place,
        time: time,
        description: description
      }

      firebaseRef.child("notes").push().set(dataToPush);

      window.alert("Zgloszenie dodane");

      loadMultipleHtmlFiles("notices");

    }

}
