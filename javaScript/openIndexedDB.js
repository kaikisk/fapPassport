var db;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

if (indexedDB) {
// データベースを削除したい場合はコメントを外します。
//indexedDB.deleteDatabase("mydb");
var openRequest = indexedDB.open("fapPassport", 1.0);
    
openRequest.onupgradeneeded = function(event) {
    // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
    console.dir(event);
    db = event.target.result;
    var store = db.createObjectStore("store1", { keyPath: "id"});
    store.createIndex("myvalueIndex", "myvalue");
    console.log("pass onupgradeneeded");
}

    
openRequest.onsuccess = function(event) {
        db = event.target.result;
        console.log("success");
        console.dir(db);
        db.close();
    }
} else {
window.alert("このブラウザではIndexed DataBase API は使えません。");
}


