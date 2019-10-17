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
txtName;
txtPass;

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

function getUserData(key) {
    return new Promise(function (resolve, reject) {
        console.log("p0");
        var db;
        var request = indexedDB.open('fapPassport');
        request.onsuccess = function (event) {
            console.log("p1");
            db = event.target.result;
            var ts = db.transaction(["fapPass"], "readwrite");
            var store = ts.objectStore("fapPass");
            var requestName = store.get(key);
            console.log("p2");
            requestName.onsuccess = function (event) {
                console.log("key: " + key + ", value: " + event.target.result.myvalue);
                resolve(event.target.result.myvalue);
            }
            db.close();
        }
        request.onerror = function () {
            alert("インデックスDBのエラーが起こっています");
        }
    })

}


$(function () {
    getUserData("txtName").then((temp) => {txtName = temp})
    // txtName = getUserData("txtName")
    txtPass = getUserData("txtPass")
    console.log("txtName1: " + txtName);
    console.log("txtPass1: " + txtPass);
    if (txtName == null && txtPass == null) {
        document.getElementById("signin").style.display = "block";
        console.log("")
    } else {
        document.getElementById("signup").style.display = "none";
    }

    const resolvedProm = Promise.resolve(33);

    let thenProm = resolvedProm.then((value) => {
        console.log("this gets called after the end of the main stack. the value received and returned is: " + value);
        return value;
    });
    // instantly logging the value of thenProm
    console.log(thenProm);

    // using setTimeout we can postpone the execution of a function to the moment the stack is empty
    setTimeout(() => {
        console.log(thenProm);
    });ß
})

function clickLoginButton() {
    txtName = getUserData("txtName");
    txtPass = getUserData("txtPass");
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

