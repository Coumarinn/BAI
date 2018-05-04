// navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
//
// function onSuccess(position) {
//     var lat=position.coords.latitude;
//     var lang=position.coords.longitude;
//
// //Google Maps
//     var myLatlng = new google.maps.LatLng(lat,lang);
//     var mapOptions = {zoom: 10,center: myLatlng}
//     var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//     var marker = new google.maps.Marker({position: myLatlng,map: map});
// }
// function onError(error) {
//     alert('code: ' + error.code + '\n' +
//         'message: ' + error.message + '\n');
// }
// google.maps.event.addDomListener(window, 'load', onSuccess);
//
//
// //to powinno pracowac na apce tez, po konwersji phonegapa

function init() {
    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(
        document.getElementById("map_canvas"), {
            center: new google.maps.LatLng(37.4419, -122.1419),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    var config = {
        apiKey: "AIzaSyDqm0kYgHjvWz7h56lOo4oIqCd3xcTq1t8",
        authDomain: "runme-723cc.firebaseapp.com",
        databaseURL: "https://runme-723cc.firebaseio.com",
        projectId: "runme-723cc",
        storageBucket: "runme-723cc.appspot.com",
        messagingSenderId: "216795094485"
    };
    firebase.initializeApp(config);

    //Create a node at firebase location to add locations as child keys
    var locationsRef = firebase.database().ref("notes");
    var bounds = new google.maps.LatLngBounds();
    locationsRef.on('child_added', function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        var marker = new google.maps.Marker({
            position: {
                lat: data.lat,
                lng: data.lng
            },
            map: map
        });
        bounds.extend(marker.getPosition());
        marker.addListener('click', (function(data) {
            return function(e) {
                infowindow.setContent(data.name + "<br>" + this.getPosition().toUrlValue(6) + "<br>" + data.message);
                infowindow.open(map, this);
            }
        }(data)));
        map.fitBounds(bounds);
    });
}
google.maps.event.addDomListener(window, "load", init);
