$(function () {
    var resultsString = getData("results");
    
    resultsString.then(result => {
        var results = JSON.parse(result);
        console.log("pass results");
        for (var i = 0; i < results.length; i++) {
            $('#Table1').append('<tr id=table' + i + '><td>' + results[i].dateClient +
                '</td><td>' + results[i].valClient + '</td><td>' + results[i].detailClient
                + "</td><td>" + results[i].resClient
                + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult1(' +
                i + ')">結果</button></td></tr>');
                console.log("pass for results : " + + results[i].dateClient);
        }
    }).catch(() => console.log("診察予約、結果が登録されていません"));
})

function clickResult1(index) {
    var resultsString = getData("results");

    resultsString.then(result => {
        var results = JSON.parse(result);
        var target = results[index];
        $('#txtDate').val(target.dateClient);
        $('#txtdetail').val(target.detailClient);
        $('#Examination').val(target.valClient);
        $('#rblresult').val(target.resClient);
        $('#btn_Update').html('<button class="btn-square-shadow btn_left green_color" id="update">更新</button>'
            + '<button class="btn-square-shadow btn_right yellow_color" id="cancel">キャンセル</button>');
        $('#update').click(() => {
            target.dateClient = $("#txtDate").val();
            target.detailClient = $('#txtdetail').val();
            target.valClient = $('#RblExamination').val();
            target.resClient = $("#RblResult").val();
            results[index] = target;
            var temp = JSON.stringify(results);
            saveReservation("results", temp).then(() => {
                $('#table' + index).html('<td>' + results[index].dateClient +
                    '</td><td>' + results[index].valClient + '</td><td>' + results[index].detailClient
                    + '</td><td>' + results[index].resClient
                    + '<td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult1(' + index + ')">結果</button></td>');
            })
        });
        $('#cancel').click(() => {
            resetElement();
            $('#btn_update').html('<button class="btn-square-shadow btn_center green_color" id="submit" onclick="resultRegistration()">登録</button>');
            return;
        })
    }).catch((err) => alert(err));
}