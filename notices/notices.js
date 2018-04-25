$(document).on("click",".btn.btn-outline-primary", function (event) {
    var element = event.target;
    element.parentElement.childNodes[1].classList.add("d-none");
    element.parentElement.childNodes[1].classList.remove("d-block");
    element.parentElement.childNodes[3].classList.add("d-block");
    element.parentElement.childNodes[3].classList.remove("d-none");
    join();
});

$(document).on("click",".btn.btn-outline-secondary", function (event) {
    var element = event.target;
    element.parentElement.childNodes[3].classList.add("d-none");
    element.parentElement.childNodes[3].classList.remove("d-block");
    element.parentElement.childNodes[1].classList.add("d-block");
    element.parentElement.childNodes[1].classList.remove("d-none");
    cancel();
});

function join(){
    console.log("dołącz");
}

function cancel(){
    console.log("anuluj");
}

function notesFromFB(place, time, description){
  var frag = document.getElementById("notices");

  var elem = document.createElement('div');
  elem.innerHTML = '<ul class="list-group col-md-6 d-inline-block" style="padding-bottom: 20px">\
    <li class="list-group-item active">Uzytkownik, ktory stworzyl</li>\
    <li class="list-group-item"><b>Miejsce:</b>'+ place +'</li>\
    <li class="list-group-item"><b>Data:</b>' + time +'</li>\
    <li class="list-group-item"><b>Opis: ...</b>' + description +'</li>\
    <li class="list-group-item">\
        <button type="button" class="btn btn-outline-primary col-md-4">Dołącz</button>\
        <button type="button" class="btn btn-outline-secondary col-md-4 d-none">Anuluj</button>\
    </li>\
  </ul>';

  while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }
    return frag;
}


function addFromFB(){
  var database = firebase.database().ref().child("notes");
  var frag = document.getElementById("notices");

  while (frag.firstChild) {
    frag.removeChild(frag.firstChild);
  }
  database.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      //console.log(child.key+": "+child.child("place").val());
      notesFromFB(child.child("place").val(), child.child("time").val(), child.child("description").val());
    });
  });
}
