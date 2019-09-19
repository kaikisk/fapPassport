$(function() {
    var keys = ['telFam', 'telAtten','bloodType','height',
    'weight','medi1','medi2','medi3','medi4','medi5',
    'anam','txtName','txtMail','txtPass'];
    for(var i = 0; i < keys.length; i++) {
        load(keys[i]);
    }
});

function load(download1) {
    // $( "#"+download1 ).text(localStorage.getItem(download1));

    var db;
    var request = indexedDB.open('hhsw');
    request.onsuccess = function (event){
        db = event.target.result;
        var ts = db.transaction(["store1"], "readwrite");
        var store = ts.objectStore("store1");
        var request = store.get(download1);
        request.onsuccess = function(event){
            $( "#"+download1 ).text(event.target.result.myvalue);
        }
        request.onerror = function(event){
            console.log("エラーが発生しました。");
        }
    }
}