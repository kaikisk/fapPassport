// function getUserData(key) {
//     var db;
//     var request = indexedDB.open('fapPassport');
//     request.onsuccess = function (event) {
//         db = event.target.result;
//         var ts = db.transaction(["fapPass"], "readwrite");
//         var store = ts.objectStore("fapPass");
//         var requestName = store.get(key);
//         requestName.onsuccess = function (event) {
//             console.log("key: " + key + ", value: " + event.target.result.myvalue);
//             return event.target.result.myvalue;
//         }
//         db.close();
//     }

// }

var db;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

if (indexedDB) {
    // データベースを削除したい場合はコメントを外します。
    //indexedDB.deleteDatabase("mydb");
    var openRequest = indexedDB.open("fapPassport");

    openRequest.onupgradeneeded = function (event) {
        // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
        console.dir(event);
        db = event.target.result;
        var store = db.createObjectStore("fapPass", { keyPath: "id" });
        store.createIndex("myvalueIndex", "myvalue");
        console.log("pass onupgradeneeded");
        var store1 = db.createObjectStore("photo", { keyPath: "id" });
        store1.createIndex("myvalueIndex", "myvalue");
    }


    openRequest.onsuccess = function (event) {
        db = event.target.result;
        console.log("pass onsuccess");
        console.dir("db: " + db);
    }
} else {
    window.alert("このブラウザではIndexed DataBase API は使えません。");
}

setTimeout(function(){
    console.log("5sの遅延を作成")
},5000)

function getUserData(key) {
    console.log("p0");
    var db;
    var request = indexedDB.open('fapPassport');
    setTimeout(function(){
        console.log("5sの遅延を作成")
    },5000);
    request.onerror = function(){
        alert("インデックスDBのエラーが起こっています");
    }
    request.onsuccess = function (event) {
        console.log("p1");
        db = event.target.result;
        var ts = db.transaction(["fapPass"], "readwrite");
        var store = ts.objectStore("fapPass");
        var requestName = store.get(key);
        console.log("p2");
        requestName.onsuccess = function (event) {
            console.log("key: " + key + ", value: " + event.target.result.myvalue);
            return event.target.result.myvalue;
        }
        db.close();
    }
}


$(function () {
    const txtName = getUserData("txtName");
    const txtPass = getUserData("txtPass");
    console.log("txtName1: " + txtName);
    console.log("txtPass1: " + txtPass);
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
    console.log("tN: " + getUserData("txtName"));
    console.log("tP: " + getUserData("txtPass"));
    console.log("txtName2: " + txtName);
    console.log("txtPass2: " + txtPass);
    console.log("UserID: " + $('#txtUserID').val());
    console.log("pass: " + $('#txtPass').val());
    if ($('#txtUserID').val() != txtName) {
        alert('Not registered');
        return;
    }
    if ($('#txtPass').val() != txtPass) {
        alert('Password is not confirmed');
        return;
    }
    location.href = 'menu.html';
}

