function myMap() {
    var mapCanvas = document.getElementById("googleMap");
    var myCenter = new google.maps.LatLng(50.06465009, 19.94497990);
    var mapOptions = {center: myCenter, zoom: 10};
    var map = new google.maps.Map(mapCanvas,mapOptions);
    var icon = {
        url: "mapmarker.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
        position: myCenter,
        icon: icon
    });
    marker.setMap(map);
}

// function geoFindMe() {
//     var output = document.getElementById("out");
//
//     if (!navigator.geolocation){
//         output.innerHTML = "<p>Geolokalizacja nie jest wspierana przez Twoja przegladarke!</p>";
//         return;
//     }
//
//     var icon = {
//         url: "mapmarker.png",
//         scaledSize: new google.maps.Size(50, 50), // scaled size
//         origin: new google.maps.Point(0,0), // origin
//         anchor: new google.maps.Point(0, 0) // anchor
//     };
//     var marker = new google.maps.Marker({
//         position: myCenter,
//         icon: icon
//     });
//
//     function success(position) {
//         var latitude  = position.coords.latitude;
//         var longitude = position.coords.longitude;
//
//         output.innerHTML = '<p>Szerokoscc geograficzna ' + latitude + '° <br>Dlugosc geograficzna ' + longitude + '°</p>';
//
//         var img = new Image();
//         img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
//         output.appendChild(img);
//     }
//
//     function error() {
//         output.innerHTML = "BLAD!";
//     }
//
//     output.innerHTML = "<p>Locating…</p>";
//
//     navigator.geolocation.getCurrentPosition(success, error);
// }