function pushData(){
    var place = $("#place").val();
    var date = document.getElementsByName("date")[0].value
    var time = document.getElementsByName("time")[0].value
    var description = $("#description").val();
    var userId =   firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email;
    var createdAt = firebase.database.ServerValue.TIMESTAMP;

    if ((place == '' || place == undefined) || 
       (time == '' || time == undefined)  || 
       (date == '' || date == undefined) ) {
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
