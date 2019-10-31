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
        console.log("result: " + result);
        console.dir(result);

        $('#txtDate').val(result.date);
        $('#txtdetail').val(result.detail);
        $('#RblExamination').val(result.val);
        $('#btn_update').html('<button class="btn-square-shadow btn_left green_color" id="update" onclick="resultRegistration()">更新</button>'
            + '<button class="btn-square-shadow btn_right yellow_color" id="cancel">キャンセル</button>');
    } else {
        return;
    }
});

function resultRegistration() {
    var date = $('#txtDate').val();
    var detail = $('#txtdetail').val();
    var val = $('#RblExamination').val();
    var res = $("#RblResult").val();

    // for (var i = 1; i <= 7; i++) {
    //     if ($("#RblExamination" + i).selected) {
    //         val = $('#RblExamination' + i).val();
    //         break;
    //     }
    // }
    // for (var i = 1; i <= 3; i++) {
    //     if ($("#RblResult" + i).selected) {
    //         res = $('#RblResult' + i).val();
    //         break;
    //     }
    // }

    var client = {
        dateClient: date,
        valClient: val,
        resClient: res,
        detailClient: detail
    }

    var resultsString = getData("results");

    resultsString.then(result => {
        var results = JSON.parse(result);
        var L = results.length;
        results[L] = client;
        var temp = JSON.stringify(results);
        saveReservation("results", temp).then(() => {
            alert("登録が完了しました");
            $('#Table1').append('<tr id=table' + L + '><td>' + results[L].dateClient +
                '</td><td>' + results[L].valClient + '</td><td>' + results[L].detailClient
                + "</td><td>" + results[L].resClient
                + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult1(' + L + ')">結果</button></td></tr>');
        }).catch(() => alert("error saveReservation"));
    }).catch(err => {
        console.log(err);
        var results = [client];
        var temp = JSON.stringify(results);
        saveReservation("results", temp).then(() => {
            $('#Table1').append('<tr id=table' + 0 + '><td>' + results[0].dateClient +
                '</td><td>' + results[0].valClient + '</td><td>' + results[0].detailClient
                + "</td><td>" + results[0].resClient
                + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult1(' + 0 + ')">結果</button></td></tr>');
        }).catch(err => alert(err));
    });
}

function resetElement(){
    $('#txtDate').val("");
    $('#txtdetail').val("");
    $('#Examination').val("");
    $('#rblresult').val("");
}

$('#cancel').click(() => {
    resetElement();
    $('#btn_update').html('<button class="btn-square-shadow btn_center green_color" id="submit" onclick="resultRegistration()">登録</button>');
    return;
})

