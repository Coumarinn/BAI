$(document).on("click",".btn.btn-outline-primary.join", function (event) {
    var element = event.target;
    element.parentElement.childNodes[1].classList.add("d-none");
    element.parentElement.childNodes[1].classList.remove("d-block");
    element.parentElement.childNodes[3].classList.add("d-block");
    element.parentElement.childNodes[3].classList.remove("d-none");
    join();

    let noteId = element.id;
    let userEmail = firebase.auth().currentUser.email;
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref().child("notes/"+ noteId + "/members/"+userId).set({user: userEmail});
});

$(document).on("click",".btn.btn-outline-secondary.cancel", function (event) {
    var element = event.target;
    element.parentElement.childNodes[3].classList.add("d-none");
    element.parentElement.childNodes[3].classList.remove("d-block");
    element.parentElement.childNodes[1].classList.add("d-block");
    element.parentElement.childNodes[1].classList.remove("d-none");
    cancel();

    let noteId = element.id;
    let userId = firebase.auth().currentUser.uid;
    let firebaseRef = firebase.database().ref().child("notes/"+ noteId + "/members/"+userId + "/user/");
    firebaseRef.remove();
});

function join(){
    console.log("dołącz");

}

function cancel(){
    console.log("anuluj");
}

function notesFromFB(user, place, date, time, description, key){
  var frag = document.getElementById("notices");

  var elem = document.createElement('div');
  elem.innerHTML = '<ul class="list-group col-md-6 d-inline-block" style="padding-bottom: 20px">\
    <li class="list-group-item active">' + user.substring(0, user.lastIndexOf("@")) +'</li>\
    <li class="list-group-item"><b>Miejsce: </b>'+ place +'</li>\
    <li class="list-group-item"><b>Data: </b>' + date +'</li>\
    <li class="list-group-item"><b>Godzina: </b>' + time +'</li>\
    <li class="list-group-item"><b>Opis: </b>' + description +'</li>\
    <li class="list-group-item"><b>Uczestnicy:&nbsp; </b><span id="members-'+ key + '">\
    </span></li>\
    <li class="list-group-item">\
        <button type="button" class="btn btn-outline-primary join col-md-4 rounded-0" id=' + key + '>Dołącz</button>\
        <button type="button" class="btn btn-outline-secondary cancel col-md-4 d-none rounded-0" id=' + key + '>Anuluj</button>\
    </li>\
  </ul>';

  while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}

function addMembers(member, key) {
  let ident = "members-" + key;
  let frag = document.getElementById(ident);

  let elem = document.createElement("em");
  elem.innerHTML = member.substring(0, member.lastIndexOf("@")) + ';&emsp;';

  frag.appendChild(elem);
}


function addFromFB(){
  var database = firebase.database().ref().child("notes");
  var frag = document.getElementById("notices");

  while (frag.firstChild) {
    frag.removeChild(frag.firstChild);
  }
  database.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      let note = child.val();
      notesFromFB(note.userEmail, note.place, note.date, note.time, note.description, child.key);

      let membersRef = firebase.database().ref().child("notes/" + child.key + "/members/");

      let key = child.key;
      membersRef.once("value", function(snapshot){
        snapshot.forEach(function(child) {
          addMembers(child.val().user, key);
        });

      });
    });
  });
}
