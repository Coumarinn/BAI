// function initialize() {
//     var infowindow = new google.maps.InfoWindow();
//     var map = new google.maps.Map(
//         document.getElementById("map_canvas"), {
//             center: new google.maps.LatLng(37.4419, -122.1419),
//             zoom: 13,
//             mapTypeId: google.maps.MapTypeId.ROADMAP
//         });
//     // Initialize Firebase
//     var config = {
//         apiKey: "AIzaSyDqm0kYgHjvWz7h56lOo4oIqCd3xcTq1t8",
//         authDomain: "runme-723cc.firebaseapp.com",
//         databaseURL: "https://runme-723cc.firebaseio.com",
//         projectId: "runme-723cc",
//         storageBucket: "runme-723cc.appspot.com",
//         messagingSenderId: "216795094485"
//     };
//     firebase.initializeApp(config);
//
//     //Create a node at firebase location to add locations as child keys
//     var locationsRef = firebase.database().ref("notes");
//     var bounds = new google.maps.LatLngBounds();
//     locationsRef.on('child_added', function(snapshot) {
//         console.log(snapshot)
//         var data = snapshot.val();
//         console.log(data);
//         var marker = new google.maps.Marker({
//             position: {
//                 lat: data.lat,
//                 lng: data.lng
//             },
//             map: map
//         });
//         bounds.extend(marker.getPosition());
//         marker.addListener('click', (function(data) {
//             return function(e) {
//                 infowindow.setContent(this.getPosition().toUrlValue(6) + "<br>" + data.userEmail);
//                 infowindow.open(map, this);
//             }
//         }(data)));
//         map.fitBounds(bounds);
//     });
// }
// google.maps.event.addDomListener(window, "load", initialize);