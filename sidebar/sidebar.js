function goTo5kmNotices (){
    loadNotices ();
    //...
}
function goTo10kmNotices (){
    loadNotices ();
}
function goTo20kmNotices (){
    loadNotices ();
}

function loadNotices (){
    setAsActive();
}

function goToHomePage(){
    setAsActive();
}

function setAsActive() {
    console.log("setAsActive")
}

function logOut(){
    firebase.auth().signOut();
}