// Firebase
var config = {
    apiKey: "AIzaSyDqm0kYgHjvWz7h56lOo4oIqCd3xcTq1t8",
    authDomain: "runme-723cc.firebaseapp.com",
    databaseURL: "https://runme-723cc.firebaseio.com",
    projectId: "runme-723cc",
    storageBucket: "runme-723cc.appspot.com",
    messagingSenderId: "216795094485"
};
firebase.initializeApp(config);
//routing
var app = Sammy('#main', function() {

    this.get('#/', function() {
        window.location = "#/login";
        $("#main").load("login/login.html");
    });

    this.get('#/login', function() {
        $("#main").load("login/login.html");
    });
    this.get('#/register', function() {
        $("#main").load("register/register.html");
    });
    this.get('#/forgotPassword', function() {
        $("#main").load("forgotPassword/forgotPassword.html");
    });

    this.get('#/home', function() {
        loadMultipleHtmlFiles("home");
    });

    this.get('#/5km', function() {
        loadMultipleHtmlFiles("notices");
    });

    this.get('#/10km', function() {
        loadMultipleHtmlFiles("notices");
    });

    this.get('#/20km', function() {
        loadMultipleHtmlFiles("notices");
    });

    this.get('#/add', function() {
        loadMultipleHtmlFiles("noticesAdd");
    });

    this.get('#/changePassword', function() {
        loadMultipleHtmlFiles("changePassword");
    });
  });

  app.run('#/login');
//routing

function loadMultipleHtmlFiles(content) {
    var defArr = [];
    defArr.push($.get('navbar/navbar.html'));
    defArr.push($.get('sidebar/sidebar.html'));
    defArr.push($.get('stickyFooter/stickyFooter.html'));
    $.when.apply($,defArr).done(function(response1, response2, response3){
        if($('#sidebar').length == 0){
            $('#main').html(response1[2].responseText + response2[2].responseText
                + response3[2].responseText);
            loadContent(content);
            $("#menuButton").click(); //tymczasowe rozwiązanie
        } else {
            loadContent(content);
        }
        getMyAccountWidth();
    });
}

function loadContent(content){
    var url = content + '/' + content + '.html';
    var html = $.ajax({type: "GET", url: url, async: false}).responseText;
    if(html.indexOf('id="date" value=""', 'type="date"') >= 0){
        html = addCurrentDateAndTime(html);
    }
    $("#content").html(html);
}

function addCurrentDateAndTime(html){
    var currentDate = new Date();
    var options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    var dateAndTime = currentDate.toLocaleDateString('pl-PL', options).split(',');
    var date = dateAndTime[0].replace(/\s/g, '').split('.').reverse().join('-');
    var time = dateAndTime[1].replace(/\s/g, '');
    var dateString = 'type="date" value="' + date + '"';
    var timeString = 'type="time" value="' + time + '"';
    var newHtml = html
    .replace('id="date" value=""', dateString)
    .replace('id="time" value=""', timeString);
    return newHtml;
}

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

$(window).resize(function(){
    getMyAccountWidth();
});

function getMyAccountWidth() {
    var width = window.innerWidth;
    if(width < 576){
        $('#myAccount').css({"width": width, 'border-left': "0", 'border-right': "0"});
    } else {
        $('#myAccount').css({"width": 400, 'border-left': "1px solid #ddd", 
        'border-right': "1px solid #ddd"});
    }
}