var txtName;
var txtPass;

var db;
var request = indexedDB.open('fapPassport');
request.onsuccess = function (event){
    db = event.target.result;
    var ts = db.transaction(["fapPass"], "readwrite");
    var store = ts.objectStore("fapPass");
    var requestName = store.get('txtName');
    requestName.onsuccess = function(event){
        console.dir(event);
        txtName = event.target.result.myvalue;
    }
    var requestPass = store.get('txtPass');
    requestPass.onsuccess = function(event){
        console.dir(event);
        txtPass = event.target.result.myvalue;
    }
    db.close();
}

$(function () {
    if (txtName == null) {
        document.getElementById("signin").disabled = true;
    } else {
        document.getElementById("signup").disabled = true;
    }
})
function clickLoginButton () {
    if ($('#txtUserName').val()!=txtName) {
        alert('Not registered');
        return;
    }
    if ($('#txtPass').val()!=txtPass) {
        alert('Password is not confirmed');
        return;
    }
    location.href='menu.html';
}
