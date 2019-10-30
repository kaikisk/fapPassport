$(function() {
    var query = decodeURI(location.search);
    var queryStr = query.slice(1).split("&");
    var queries = {};
    console.log(typeof query);
    console.log("queryStr" + typeof queryStr);
    console.log("query" + query);

    if(query){
        $('#txtDate').val("");
        $('#txtdetail').val("test");
        $('select[name="type"]').val();
    }else{
        return;
    }
});

function resultRegistration(){
    var date = $('#txtDate').val();
    var detail = $('#txtdetail').val();
    var val = ''; 
    var res = 'OK';
    for (var i=1; i<=7; i++) {
        if (document.getElementById("RblExamination"+i).checked) {
            val = $('#RblExamination'+i).val();
            break;
        }
    }
    if (document.getElementById("RblResult2").checked) {
        res = 'TREATMENT';
    }
    var client = {
        dateClient: date,
        valClient: val,
        resClient: res,
        detailClient: detail
    }
    var resultsString = localStorage.getItem('results');
    if (resultsString) {
        var results = JSON.parse(resultsString);
        var L = results.length;
        results[L] = client;
    } else {
        var results = [client]; 
    }
    resultsString = JSON.stringify(results);
    localStorage.setItem('results',resultsString);
    location.href='menu.html';
}