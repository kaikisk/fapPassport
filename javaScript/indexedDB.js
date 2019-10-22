$(function createDatabase() {
    return new Promise(function(resolve, reject) {
        var db;
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

        if(indexedDB) {
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
                db.close();
                return;
            }
        } else {
            window.alert("このブラウザではIndexed DataBase API は使えません。");
        }
    })
});

function getUserData(key) {
    return new Promise(function (resolve, reject) {
        var db;
        var request = indexedDB.open('fapPassport');
        request.onsuccess = function (event) {
            db = event.target.result;
            // console.log("confirm db: ");
            // console.dir(db);
            console.log("key: " + key);
            var ts = db.transaction(["fapPass"], "readwrite");
            var store = ts.objectStore("fapPass");
            var requestName = store.get(key);
            requestName.onsuccess = function (event) {
                if(event.target.result !== undefined){
                    console.log("key: " + key + ", value: " + event.target.result.myvalue);
                    resolve(event.target.result.myvalue);
                }else{
                    console.log(key + " は登録されていません");
                    reject(key + "の取得の失敗")
                }
            }
        }
        request.onerror = function () {
            alert("インデックスDBのエラーが起こっています");
        }
    });
};

// async function createDatabase() {
//     var db;
//     var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

//     if(indexedDB) {
//         // データベースを削除したい場合はコメントを外します。
//         //indexedDB.deleteDatabase("mydb");
//         var openRequest = indexedDB.open("fapPassport");

//         openRequest.onupgradeneeded = function (event) {
//             // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
//             // console.dir(event);
//             db = event.target.result;
//             var store = db.createObjectStore("fapPass", { keyPath: "id" });
//             store.createIndex("myvalueIndex", "myvalue");
//             // console.log("pass onupgradeneeded");

//             var store1 = db.createObjectStore("photo", { keyPath: "id" });
//             store1.createIndex("myvalueIndex", "myvalue");

//             var store2 = db.createObjectStore("tempPhoto", {keyPath: "id"});
//             store2.createIndex("myvalueIndex", "myvalue");
//         }

//         openRequest.onsuccess = function (event) {
//             db = event.target.result;
//             console.log("pass onsuccess");
//             console.dir("db: " + db);
//             db.close();
//             return;
//         }
//     } else {
//         window.alert("このブラウザではIndexed DataBase API は使えません。");
//     }
// }

// async function getUserData(key) {
//     var db;
//     var request = indexedDB.open('fapPassport');
//     request.onsuccess = function (event) {
//         db = event.target.result;
//         // console.log("confirm db: ");
//         // console.dir(db);
//         // console.log("key: " + key);
//         var ts = db.transaction(["fapPass"], "readwrite");
//         var store = ts.objectStore("fapPass");
//         var requestName = store.get(key);
//         requestName.onsuccess = function (event) {
//             if(event.target.result !== undefined){
//                 console.log("key: " + key + ", value: " + event.target.result.myvalue);
//                 return event.target.result.myvalue;
//             }else{
//                 console.log(key + " は登録されていません");
//                 return new Error(key + "の取得の失敗");
//             }
//         }
//     }
//     request.onerror = function () {
//         alert("インデックスDBのエラーが起こっています");
//     }
// }
