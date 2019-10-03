var idb;
var indexeddb = window.indexeddb || window.mozIndexeddb || window.msIndexeddb;

if (indexeddb) {
    // データベースを削除したい場合はコメントを外します。
    //indexedidb.deleteDatabase("myidb");
    var openRequest = indexeddb.open("fapPassport", 1.0);

    openRequest.onupgradeneeded = function (event) {
        // データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
        console.dir(event);
        idb = event.target.result;
        var store = idb.createObjectStore("fapPass", { keyPath: "id" });
        store.createIndex("myvalueIndex", "myvalue");
        console.log("pass onupgradeneeded");
    }


    openRequest.onsuccess = function (event) {
        idb = event.target.result;
        console.log("pass onsuccess");
        console.dir(idb);
    }
} else {
    window.alert("このブラウザではIndexed DataBase API は使えません。");
}


