$(function() {
    var resultsString;

    var db;
    var request = indexedDB.open('hhsw');
    request.onsuccess = function (event){
        db = event.target.result;
        var ts = db.transaction(["store1"], "readwrite");
        var store = ts.objectStore("store1");
        var request = store.get('results');
        request.onsuccess = function(event){
            resultsString = event.target.result.myvalue;
        }
        request.onerror = function(event){
            console.log("エラーが発生しました。");
        }
    }
    //var resultsString = localStorage.getItem('results');
    if (resultsString) {
        var results = JSON.parse(resultsString);
        for(var i = 0; i < results.length; i++) {
            $('#Table1').append( '<tr><td>' + results[i].dateClient + 
'</td><td>' + results[i].valClient + '</td><td>' + results[i].resClient + 
'</td><td>' + results[i].detailClient + '</td></tr>')
        }
    }
})