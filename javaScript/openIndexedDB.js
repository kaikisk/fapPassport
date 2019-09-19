var db;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

if (indexedDB) {
// データベースを削除したい場合はコメントを外します。
//indexedDB.deleteDatabase("mydb");
var openRequest = indexedDB.open("hhsw");
    
openRequest.onupgradeneeded = function(event) {
    // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
    db = event.target.result;
    var store = db.createObjectStore("store1", { keyPath: "mykey"});
    store.createIndex("myvalueIndex", "myvalue");
}
    
openRequest.onsuccess = function(event) {
        db = event.target.result;
    }
} else {
window.alert("このブラウザではIndexed DataBase API は使えません。");
}


