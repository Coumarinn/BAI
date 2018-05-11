$(document).on("click",".btn.btn-outline-primary.join", function (event) {
  var element = event.target;
  /*element.parentElement.childNodes[1].classList.add("d-none");
  element.parentElement.childNodes[1].classList.remove("d-block");
  element.parentElement.childNodes[3].classList.add("d-block");
  element.parentElement.childNodes[3].classList.remove("d-none");
  join();*/

  let noteId = element.id;
  let userEmail = firebase.auth().currentUser.email;
  let userId = firebase.auth().currentUser.uid;
  firebase.database().ref().child("notes/"+ noteId + "/members/"+userId).set({user: userEmail});

  window.alert("Dolaczyles do wydarzenia");

  loadMultipleHtmlFiles("noticesJoined");
});

$(document).on("click",".btn.btn-outline-secondary.cancel", function (event) {
  var element = event.target;
  /*element.parentElement.childNodes[3].classList.add("d-none");
  element.parentElement.childNodes[3].classList.remove("d-block");
  element.parentElement.childNodes[1].classList.add("d-block");
  element.parentElement.childNodes[1].classList.remove("d-none");
  cancel();*/

  let noteId = element.id;
  let userId = firebase.auth().currentUser.uid;
  let firebaseRef = firebase.database().ref().child("notes/"+ noteId + "/members/"+userId + "/user/");
  firebaseRef.remove();

  window.alert("Anulowales udzial");

  loadMultipleHtmlFiles("noticesJoined");
});

$(document).on("click",".btn.btn-outline-danger.delete", function (event) {
  var element = event.target;
  /*element.parentElement.childNodes[3].classList.add("d-none");
  element.parentElement.childNodes[3].classList.remove("d-block");
  element.parentElement.childNodes[1].classList.add("d-block");
  element.parentElement.childNodes[1].classList.remove("d-none");
  cancel();*/

  let noteId = element.id;
  let userId = firebase.auth().currentUser.uid;
  let firebaseRef = firebase.database().ref().child("notes/"+ noteId);
  firebaseRef.remove();

  window.alert("Usunales wydarzenie");

  loadMultipleHtmlFiles("noticesUsers");
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
  <li class="list-group-item active" id="title-'+ key + '">' + user.substring(0, user.lastIndexOf("@")) +'</li>\
  <li class="list-group-item"><b>Miejsce: </b>'+ place +'</li>\
  <li class="list-group-item"><b>Data: </b>' + date +'</li>\
  <li class="list-group-item"><b>Godzina: </b>' + time +'</li>\
  <li class="list-group-item"><b>Opis: </b>' + description +'</li>\
  <li class="list-group-item"><b>Uczestnicy: </b>\
  <ul list-group d-inline-block id="members-'+ key + '">\
  </ul></li>\
  <li class="list-group-item" id="button-'+ key + '" style="text-align: center;">\
  <button type="button" class="btn btn-outline-primary join col-md-4 rounded-0" id=' + key + '>DOŁĄCZ</button>\
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

  let elem = document.createElement("li");
  elem.classList.add('list-group-item');
  elem.classList.add('custom-members-list');
  elem.innerHTML = "<span class='member-display'>" + member.substring(0, member.lastIndexOf("@")) + "</span>";

  frag.appendChild(elem);
}

function markYourNotice(user, key) {
  let ident = "title-" + key;
  let frag = document.getElementById(ident);

  let ident2 = "button-" + key;
  let frag2 = document.getElementById(ident2);

  if (user == frag.textContent) {
    frag.innerHTML = '<i class="fa fa-star"></i> &#09;'+ user;
    frag2.innerHTML = '<button type="button" class="btn btn-outline-danger delete  col-md-4 rounded-0" id=' + key + '>USUŃ</button>';
  }

}

function anulujButton(key){
  let ident = "button-" + key;
  let frag = document.getElementById(ident);

  frag.innerHTML = '<button type="button" class="btn btn-outline-secondary cancel col-md-4 rounded-0" id=' + key + '>ANULUJ</button>';
}


function addFromFB(distParam){
  var database = firebase.database().ref().child("notes");
  var frag = document.getElementById("notices");

  while (frag.firstChild) {
    frag.removeChild(frag.firstChild);
  }

  navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
              })


  database.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      let note = child.val();

      let distance = getDistanceFromLatLonInKm(lat,lng,note.lat,note.lng).toFixed(1);
      if (distance < distParam){
      notesFromFB(note.userEmail, note.place, note.date, note.time, note.description, child.key);

      // wyroznienie ogloszen, ktore uzytkownik stworzyl
      let userEmail = firebase.auth().currentUser.email;
      let user = userEmail.substring(0, userEmail.lastIndexOf("@"))
      markYourNotice(user, child.key);


      // wyciagniecie z firebase listy uczestnikow ogloszenia
      let membersRef = firebase.database().ref().child("notes/" + child.key + "/members/");

      let key = child.key;
      membersRef.once("value", function(snapshot){
        snapshot.forEach(function(child) {
          addMembers(child.val().user, key);
        });
      });

      // dolaczony uzytkonik ma wyswietlany button anuluj
      let userId = firebase.auth().currentUser.uid;
      if (firebase.auth().currentUser != null && note.members != undefined) {
        if (note.members[userId] != undefined) {
          anulujButton(key);
    }}
  }
    });


  });
}


//obliczanie odleglosci miedzy wspolrzednymi

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
