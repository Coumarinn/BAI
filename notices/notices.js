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