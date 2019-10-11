function getUserData(key) {
    var db;
    var request = indexedDB.open('fapPassport');
    request.onsuccess = function (event) {
        db = event.target.result;
        var ts = db.transaction(["fapPass"], "readwrite");
        var store = ts.objectStore("fapPass");
        var requestName = store.get(key);
        requestName.onsuccess = function (event) {
            console.log("key: " + key + "value: " + event.target.result.myvalue);
            return event.target.result.myvalue;
        }
        db.close();
    }

}

$(function () {
    const txtName = getUserData("txtName");
    const txtPass = getUserData("txtPass");
    console.log("txtName: " + txtName);
    console.log("txtPass: " + txtPass);
    if (txtName == null && txtPass == null) {
        document.getElementById("signin").style.display = "block";
        console.log("")
    } else {
        document.getElementById("signup").style.display = "none";
    }
})
function clickLoginButton() {
    const txtName = getUserData("txtName");
    const txtPass = getUserData("txtPass");
    if ($('#txtUserName').val() != txtName) {
        alert('Not registered');
        return;
    }
    if ($('#txtPass').val() != txtPass) {
        alert('Password is not confirmed');
        return;
    }
    location.href = 'menu.html';
}
