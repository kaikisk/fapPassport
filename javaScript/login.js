var txtName;
var txtPass;

var db;
var request = indexedDB.open('fapPassport');
request.onsuccess = function (event){
    db = event.target.result;
    var ts = db.transaction(["fapPass"], "readwrite");
    var store = ts.objectStore("fapPass");
    var requestName = store.get("txtName");
    requestName.onsuccess = function(event){
        console.dir("success get txtName");
        console.log("event.target.result.myvalue is " + event.target.result.myvalue);
        txtName = event.target.result.myvalue;
    }
    var requestPass = store.get("txtPass");
    requestPass.onsuccess = function(event){
        console.dir("success get txtPass");
        console.log("event.target.result.myvalue is " + event.target.result.myvalue);
        txtPass = event.target.result.myvalue;
    }
    console.log("txtName: " + txtName + " ,txtPass: " + txtPass);
    db.close();
}

$(function () {
    console.log("txtName: " + txtName);
    console.log("txtPass: " + txtPass);
    if (txtName == null && txtPass == null) {
        document.getElementById("signin").style.display = "block";
        console.log("")
    } else {
        document.getElementById("signup").style.display = "none";
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
