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

// function createDatabase() {
//     return new Promise(function(resolve, reject) {
//         var db;
//         var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

//         if(indexedDB) {
//             // データベースを削除したい場合はコメントを外します。
//             //indexedDB.deleteDatabase("mydb");
//             var openRequest = indexedDB.open("fapPassport");

//             openRequest.onupgradeneeded = function (event) {
//                 // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
//                 console.dir(event);
//                 db = event.target.result;
//                 var store = db.createObjectStore("fapPass", { keyPath: "id" });
//                 store.createIndex("myvalueIndex", "myvalue");
//                 console.log("pass onupgradeneeded");
//                 var store1 = db.createObjectStore("photo", { keyPath: "id" });
//                 store1.createIndex("myvalueIndex", "myvalue");
//             }


//             openRequest.onsuccess = function (event) {
//                 db = event.target.result;
//                 console.log("pass onsuccess");
//                 console.dir("db: " + db);
//                 db.close();
//             }
//         } else {
//             window.alert("このブラウザではIndexed DataBase API は使えません。");
//         }
//     })
// }

// async function createDatabase() {
//         var db;
//         var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

//         if(indexedDB) {
//             // データベースを削除したい場合はコメントを外します。
//             //indexedDB.deleteDatabase("mydb");
//             var openRequest = indexedDB.open("fapPassport");

//             openRequest.onupgradeneeded = function (event) {
//                 // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
//                 console.dir(event);
//                 db = event.target.result;
//                 var store = db.createObjectStore("fapPass", { keyPath: "id" });
//                 store.createIndex("myvalueIndex", "myvalue");
//                 console.log("pass onupgradeneeded");
//                 var store1 = db.createObjectStore("photo", { keyPath: "id" });
//                 store1.createIndex("myvalueIndex", "myvalue");
//             }

//             openRequest.onsuccess = function (event) {
//                 db = event.target.result;
//                 console.log("pass onsuccess");
//                 console.dir("db: " + db);
//                 db.close();
//                 return;
//             }
//         } else {
//             window.alert("このブラウザではIndexed DataBase API は使えません。");
//         }
// }


// function getUserData(key) {
//     return new Promise(function (resolve, reject) {
//         var db;
//         var request = indexedDB.open('fapPassport');
//         request.onsuccess = function (event) {
//             db = event.target.result;
//             console.log("confirm db: ");
//             console.dir(db);
//             console.log("key: " + key);
//             var ts = db.transaction(["fapPass"], "readwrite");
//             var store = ts.objectStore("fapPass");
//             var requestName = store.get(key);
//             requestName.onsuccess = function (event) {
//                 if(event.target.result !== undefined){
//                     console.log("key: " + key + ", value: " + event.target.result.myvalue);
//                     resolve(event.target.result.myvalue);
//                 }else{
//                     console.log(key + " は登録されていません");
//                     reject("失敗")
//                 }
//             }
//         }
//         request.onerror = function () {
//             alert("インデックスDBのエラーが起こっています");
//         }
//     });
// }

// async function getUserData(key) {
//         var db;
//         var request = indexedDB.open('fapPassport');
//         request.onsuccess = function (event) {
//             db = event.target.result;
//             // console.log("confirm db: ");
//             // console.dir(db);
//             // console.log("key: " + key);
//             var ts = db.transaction(["fapPass"], "readwrite");
//             var store = ts.objectStore("fapPass");
//             var requestName = store.get(key);
//             requestName.onsuccess = function (event) {
//                 if(event.target.result !== undefined){
//                     console.log("key: " + key + ", value: " + event.target.result.myvalue);
//                     return event.target.result.myvalue;
//                 }else{
//                     console.log(key + " は登録されていません");
//                     throw new Error("失敗");
//                 }
//             }
//         }
//         request.onerror = function () {
//             alert("インデックスDBのエラーが起こっています");
//         }
// }

function getNamePass(){
    txtName.then((name) => {
        txtPass.then((pass) => {
            return {name, pass};
        })
    })
}

$(function () {
    createDatabase();
    txtName = getUserData("txtName");
    txtPass = getUserData("txtPass");
    ErrText = getUserData("txtAAA");
    getNamePass().then((name,pass) => console.log("name: " + name + " ,pass: " + pass))

    ErrText.catch((err) => {
        console.log("indexeddb is not" + err);
    });
    txtName.catch((err) => {
        console.log(err);
    });
    txtPass.catch((err) => {
        console.log(err);
    });

    txtName.then((name) => {
        txtPass.then((pass) => {
            if (name == null && pass == null) {
                document.getElementById("signin").style.display = "none";
                console.log("");
            } else {
                document.getElementById("signup").style.display = "none";
            }
        })
    })

    // console.log("txtName1: " + txtName);
    // console.log("txtPass1: " + txtPass);
    // console.log("ErrText: " + ErrText);

    // if (txtName == null && txtPass == null) {
    //     document.getElementById("signin").style.display = "none";
    //     console.log("")
    // } else {
    //     document.getElementById("signup").style.display = "none";
    // }
})

function clickLoginButton() {
    var flag = 0;
    console.log("txtName2: " + txtName);
    console.log("txtPass2: " + txtPass);
    console.log("UserID: " + $('#txtUserID').val());
    console.log("pass: " + $('#txtPass').val());
    txtName.then((name) => {
        if ($('#txtUserID').val() != name) {
            alert('Not registered');
            flag = 1;
            return;
        }
    })
    if (flag != 0) {
        return;
    }
    // if ($('#txtUserID').val() != txtName) {
    //     alert('Not registered');
    //     return;
    // }
    txtPass.then((pass) => {
        if ($('#txtPass').val() != pass) {
            alert('Password is not confirmed');
            flag = 1;
            return;
        }
    })
    if (flag != 0) {
        return;
    }
    // if ($('#txtPass').val() != txtPass) {
    //     alert('Password is not confirmed');
    //     return;
    // }
    location.href = 'menu.html';
}