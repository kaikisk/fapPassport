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
function getUserData(key) {
    return new Promise(function (resolve, reject) {
        var db;
        var request = indexedDB.open('fapPassport');
        request.onsuccess = function (event) {
            db = event.target.result;
            var ts = db.transaction(["fapPass"], "readwrite");
            var store = ts.objectStore("fapPass");
            var requestName = store.get(key);
            requestName.onerror = function () {
                // 失敗した時
                alert("indexedDB is error");
                reject("失敗");
            }
            requestName.onsuccess = function (event) {
                console.log("in onsuccess");
                console.log("key: " + key + ", value: " + event.target.result.myvalue);
                resolve(event.target.result.myvalue);
            }
        }
        request.onerror = function () {
            alert("インデックスDBのエラーが起こっています");
        }
    });
}


$(function () {
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

    txtName = getUserData("txtName");
    txtPass = getUserData("txtPass");
    ErrText = getUserData("txtAAA");
    console.log("txtName1: " + txtName);
    console.log("txtPass1: " + txtPass);
    console.log("ErrText: " + ErrText);
    if (txtName == null && txtPass == null) {
        document.getElementById("signin").style.display = "none";
        console.log("")
    } else {
        document.getElementById("signup").style.display = "none";
    }

})

function clickLoginButton() {
    console.log("txtName2: " + txtName);
    console.log("txtPass2: " + txtPass);
    console.log("UserID: " + $('#txtUserID').val());
    console.log("pass: " + $('#txtPass').val());
    txtName.then((name) => {
        if ($('#txtUserID').val() != name) {
            alert('Not registered');
            return;
        }
    })
    // if ($('#txtUserID').val() != txtName) {
    //     alert('Not registered');
    //     return;
    // }
    txtPass.then((pass) => {
        if ($('#txtPass').val() != pass) {
            alert('Password is not confirmed');
            return;
        }
    })
    // if ($('#txtPass').val() != txtPass) {
    //     alert('Password is not confirmed');
    //     return;
    // }
    location.href = 'menu.html';
}