$(function() {
    var resultsString;

    var appointments = getData("appointments");

    appointments.then(ap => {
        resultsString = ap;
        if (resultsString) {
            var results = JSON.parse(resultsString);
            for(var i = 0; i < results.length; i++) {
                $('#Table1').append('<tr id=table' + i + '><td>' + results[i].dateClient +
                '</td><td>' + results[i].valClient + '</td><td>' + results[i].detailClient
                + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult(' +
                i + ')">結果</button></td></tr>');
            }
        }
    }).catch(() => console.log("診察予約、結果が登録されていません"));
})

function clickResult(index){

}