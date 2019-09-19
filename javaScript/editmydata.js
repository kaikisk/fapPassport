$(function() {
    var keys = ['telFam', 'telAtten','bloodType','height',
    'weight','medi1','medi2','medi3','medi4','medi5',
    'anam','txtName','txtMail','txtPass'];
    for(var i = 0; i < keys.length; i++) {
        load(keys[i]);
    }
    $('#b').click(function(e){
        for(var i = 0; i < keys.length; i++) {
            save(keys[i]);
        }
        location.href="myData.html";
    });
});
function save(x) {
    //localStorage.setItem(x, $('#'+x).val());

    var db;
    var request = indexedDB.open('hhsw');
    request.onsuccess = function (event){
        db = event.target.result;
        var ts = db.transaction(["store1"], "readwrite");
        var store = ts.objectStore("store1");
        var request = store.put({mykey: x, myvalue: $('#'+x).val()});
        request.onsuccess = function(event){
            console.log("成功しました");
        }
        request.onerror = function(event){
            console.log("エラーが発生しました。");
        }
    }
}

function load(download1) {
    //$( "#"+download1 ).val(localStorage.getItem(download1));

    var db;
    var request = indexedDB.open('hhsw');
    request.onsuccess = function (event){
        db = event.target.result;
        var ts = db.transaction(["store1"], "readwrite");
        var store = ts.objectStore("store1");
        var request = store.get(download1);
        request.onsuccess = function(event){
            $( "#"+download1 ).val(event.target.result.myvalue);
        }
        request.onerror = function(event){
            console.log("エラーが発生しました。");
        }
    }
}