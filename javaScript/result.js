$(function () {
    var queryStr = decodeURI(location.search);
    var result = {};

    if (queryStr) {
        var queryArr = queryStr.slice(1).split("&");
        console.dir(queryArr);

        queryArr.forEach(query => {
            var query1 = query.split("=");
            result[query1[0]] = query1[1];
        });
        console.log("result: "+result);
        console.dir(result);

        $('#txtDate').val(result.date);
        $('#txtdetail').val(result.detail);
        $('select[name="type"]').val(result.val);
    } else {
        return;
    }
});

function resultRegistration() {
    var date = $('#txtDate').val();
    var detail = $('#txtdetail').val();
    var val = '';
    var res = 'OK';
    for (var i = 1; i <= 7; i++) {
        if (document.getElementById("RblExamination" + i).checked) {
            val = $('#RblExamination' + i).val();
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
    localStorage.setItem('results', resultsString);
    location.href = 'menu.html';
}