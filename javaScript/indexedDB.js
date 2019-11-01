$(function createDatabase() {
    return new Promise(function (resolve, reject) {
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
                var store1 = db.createObjectStore("photo", { keyPath: "id", autoIncrement: true});
                store1.createIndex("myvalueIndex", "myvalue");
                var store2 = db.createObjectStore("tempPhoto", { keyPath: "id", autoIncrement: true});
                store2.createIndex("myvalueIndex", "myvalue");
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

function getData(key) {
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
                if (event.target.result !== undefined) {
                    console.log("key: " + key + ", value: " + event.target.result.myvalue);
                    resolve(event.target.result.myvalue);
                } else {
                    reject(key + "の取得の失敗")
                }
            }
        }
        request.onerror = function () {
            alert("インデックスDBのエラーが起こっています");
        }
    });
};

function getPhoto(index) {
    var canvas = $(".prevPhoto");
    var results = {};
    var i = 0;
    return new Promise(function (resolve, reject) {
        var db;
        var request = indexedDB.open('fapPassport');
        request.onsuccess = function (event) {
            db = event.target.result;
            var ts = db.transaction(["photo"], "readwrite");
            var store = ts.objectStore("photo");
            var requestName = store.openCursor();
            requestName.onsuccess = function (event) {
                var cursor = event.target.result;
                if(cursor.value.index == index){
                    results[i].img = cursor.value;
                    canvas.append('<canvas class="cnv" id="canvas'+ i + '" style="display:none;"></canvas>');
                    i++;
                    cursor.continue();
                }
                if(!cursor){
                    results.i = i;
                    console.dir(results);
                    console.log("end");
                    resolve(results);
                    return;
                }
            }
        }
        request.onerror = function () {
            reject("写真の取得が失敗しました")
            alert("インデックスDBのエラーが起こっています");
        }
    });
};

function save(key) {
    return new Promise((resolve, reject) => {
        var db;
        var request = indexedDB.open("fapPassport");
        request.onsuccess = function (event) {
            console.log("indexedDB.open pass onsuccess");
            db = event.target.result;
            var ts = db.transaction(["fapPass"], "readwrite");
            var store = ts.objectStore("fapPass");
            var request = store.put({ id: key, myvalue: $('#' + key).val() });
            request.onsuccess = function (event) {
                resolve(key + " : " + $('#' + key).val());
            }
            request.onerror = function (event) {
                reject("エラーが発生しました。");
            }
        }
        request.onerror = function () {
            console.log("indexedDBを開くのに失敗しました");
        }
    });
}

function load(key) {
    var db;
    var request = indexedDB.open('fapPassport');
    request.onsuccess = function (event) {
        db = event.target.result;
        var ts = db.transaction(["fapPass"], "readwrite");
        var store = ts.objectStore("fapPass");
        var request = store.get(key);
        request.onsuccess = function (event) {
            if (event.target.result !== undefined) {
                console.log("key: " + key + ", value: " + event.target.result.myvalue);
                $("#" + key).val(event.target.result.myvalue);
                $("#" + key).text(event.target.result.myvalue);
            } else {
                console.error(key + "の取得の失敗");
            }
        }
        request.onerror = function (event) {
            console.log("エラーが発生しました。");
        }
    }
}

function saveReservation(key, appoint) {
    return new Promise((resolve, reject) => {
        var db;
        var request = indexedDB.open("fapPassport");
        request.onsuccess = function (event) {
            console.log("pass onsuccess");
            db = event.target.result;
            var ts = db.transaction(["fapPass"], "readwrite");
            var store = ts.objectStore("fapPass");
            var request = store.put({ id: key, myvalue: appoint });
            request.onsuccess = function (event) {
                resolve(key + " : " + $('#' + key).val());
            }
            request.onerror = function (event) {
                reject("エラーが発生しました。");
            }
        }
        request.onerror = function () {
            console.log("indexedDBを開くのに失敗しました");
        }
    });
}

function saveAppointment(appoint) {
    var key = "appointments"
    return new Promise((resolve, reject) => {
        var db;
        var request = indexedDB.open("fapPassport");
        request.onsuccess = function (event) {
            console.log("pass onsuccess");
            db = event.target.result;
            var ts = db.transaction(["fapPass"], "readwrite");
            var store = ts.objectStore("fapPass");
            var request = store.put({ id: "appointments", myvalue: appoint });
            request.onsuccess = function (event) {
                resolve(key + " : " + $('#' + key).val());
            }
            request.onerror = function (event) {
                reject("エラーが発生しました。");
            }
        }
        request.onerror = function () {
            console.log("indexedDBを開くのに失敗しました");
        }
    });
}

function deleteAppointment(index) {
    var appointmentsString = getData("appointments");
    appointmentsString.then(ap => {
        if (ap) {
            var appointments = JSON.parse(ap);
            appointments.splice(index, 1);
            console.log("削除後のappointments");
            console.dir(appointments);
            var temp = JSON.stringify(appointments);
            saveAppointment(temp).then(() => {
                $('#table' + index).remove();
                console.log("削除成功");
            }).catch(err => {
                console.error("削除後のappointmentsの更新失敗");
            });
            console.log(temp);
        }
    })
}

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
