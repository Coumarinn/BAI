function usersNoticesShow(){
  var database = firebase.database().ref().child("notes");
  var frag = document.getElementById("notices");

  while (frag.firstChild) {
    frag.removeChild(frag.firstChild);
  }
  database.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      let note = child.val();
      if (firebase.auth().currentUser != null && firebase.auth().currentUser.email == note.userEmail) {
        notesFromFB(note.userEmail, note.place, note.date, note.time, note.description, child.key);
    }
    });
  });
}
