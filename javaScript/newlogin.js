$(function() {
    $('#registration').click(function(e){
        if ($('#txtName').val()==""||$('#txtMail').val()==""||
            $('#txtPass').val()=="") {
            alert(`名前, メールアドレス, パスワードを全て入力してください
                Please, input your name, e-mail and password`);
            return;
        }
        if ($('#txtPass').val()!=$('#txtPassCheck').val()) {
            alert(`パスワードが一致していません
                Password is not confirmed`);
            return;
        }
        var keys = ['txtName','txtMail','txtPass'];
        for(var i = 0; i < keys.length; i++) {
            console.log("point1")
            save(keys[i]);
        }
        alert(`ユーザーを登録しました
            Registered new account`);
        location.href='menu.html';
    });
});
function save(x) {
    //localStorage.setItem(x, $('#'+x).val());
    console.log("point2")

    var db;
    var request = indexedDB.open('fapPassport');
    request.onsuccess = function (event){
        console.log("pass save");
        db = event.target.result;
        var ts = db.transaction(["fapPass"], "readwrite");
        var store = ts.objectStore("fapPass");
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
    var request = indexedDB.open('fapPassport');
    request.onsuccess = function (event){
        db = event.target.result;
        var ts = db.transaction(["fapPass"], "readwrite");
        var store = ts.objectStore("fapPass");
        var request = store.get(download1);
        request.onsuccess = function(event){
            $( "#"+download1 ).val(event.target.result.myvalue);
        }
        request.onerror = function(event){
            console.log("エラーが発生しました。");
        }
    }
}