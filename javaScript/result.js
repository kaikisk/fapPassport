$(function() {
    var query = decodeURI(location.search);
    console.log(query);
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