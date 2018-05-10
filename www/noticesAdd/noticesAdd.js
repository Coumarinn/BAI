function initialize() {
    // var input = document.getElementById('place');
    var input = $("#place")[0];
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place1 = autocomplete.getPlace();
        document.getElementById('city').value = place1.name;
        document.getElementById('Lat').value = place1.geometry.location.lat();
        document.getElementById('Lng').value = place1.geometry.location.lng();
//
        lat = place1.geometry.location.lat();
        lng = place1.geometry.location.lng();

        // window.alert(latitude);
        // window.alert(longitude);

    });
}

google.maps.event.addDomListener(window, 'load', initialize);

function pushData() {
    var place = $("#place").val();
    var date = document.getElementsByName("date")[0].value
    var time = document.getElementsByName("time")[0].value
    var description = $("#description").val();
    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email;
    var createdAt = firebase.database.ServerValue.TIMESTAMP;

    //walidacja czy data ogloszenia nie jest w przeszlosci
    var q = new Date();
    var currentDate = q.getTime();
    var noticeDate = Date.parse(date + ' ' + time);

    if ((place == '' || place == undefined) ||
        (time == '' || time == undefined) ||
        (date == '' || date == undefined)) {
        window.alert("Uzupelnij pole miejsce i czas");

      } else if (currentDate>noticeDate){

        window.alert("Nie pobiegniesz w przeszlosci");

      } else {

        var firebaseRef = firebase.database().ref();

        var dataToPush = {
            userId: userId,
            userEmail: userEmail,
            place: place,
            lat: lat,
            lng: lng,
            date: date,
            time: time,
            description: description,
            createdAt: createdAt
        }

        firebaseRef.child("notes").push().set(dataToPush);

        window.alert("Zgloszenie dodane");

        loadMultipleHtmlFiles("noticesUsers");

    }

}
