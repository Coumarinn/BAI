$(document).on("click","#menuButton", function (event) {
    if(event.currentTarget.className == "collapsed"){
        $("main").removeClass("col-lg-10").addClass("col-lg-12");
        $("main").removeClass("col-md-9").addClass("col-md-12");
        $("main").removeClass("col-sm-8").addClass("col-sm-12");
        $("main").removeClass("col-xs-11").addClass("col-xs-12");
    } else {
        $("main").removeClass("col-lg-12").addClass("col-lg-10");
        $("main").removeClass("col-md-12").addClass("col-md-9");
        $("main").removeClass("col-sm-12").addClass("col-sm-8");
        $("main").removeClass("col-xs-12").addClass("col-xs-11");
    }
});

$(document).on("click", "#navbarDropdownMenuLink", function (event) {
  let elem = document.getElementById('emailUsernameMenu');
  let elem2 = document.getElementById('shortUsernameMenu');
    if(firebase.auth().currentUser != null){
      let userEmail = firebase.auth().currentUser.email;
      elem.innerHTML = userEmail;
      elem2.innerHTML = userEmail.substring(0, userEmail.lastIndexOf("@"));
    } else {
      elem.innerHTML = 'Użytkownik niezalogowany';
      elem2.innerHTML = 'Użytkownik niezalogowany';
    }
});

function logOut(){
    firebase.auth().signOut();
}

function closeMyAccountWindow() {
    $('#myAccount').removeClass("show");
}
