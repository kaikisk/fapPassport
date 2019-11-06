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

        Aindex = result.index;
        $('#txtDate').val(result.date);
        $('#txtdetail').val(result.detail);
        $('#RblExamination').val(result.val);
        getData("results").then(rs => {
            var results = JSON.parse(rs);
            index = results.length;
            console.log("result index: " + index);
        }).catch(err => {
            result.index = 0;
            $("#index").val(result.index);
            console.log(err);
        });
        $('#btn_update').html('<button class="btn-square-shadow btn_fifty green_color" id="update" onclick="resultRegistration()">更新</button>'
            + '<button class="btn-square-shadow btn_fifty yellow_color" id="cancel">キャンセル</button>');
    } else {
        getData("tempResult").then(rs => {
            var results = JSON.parse(rs);
            $('#txtDate').val(results.dateClient);
            $('#txtdetail').val(results.detailClient);
            $('#Examination').val(results.valClient);
            $('#rblresult').val(results.resClient);
        }).catch(err => {
            return;
        });
    }
});

function resultRegistration() {
    var date = $('#txtDate').val();
    var detail = $('#txtdetail').val();
    var val = $('#Examination').val();
    var res = $("#rblresult").val();

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
        client.index = L;
        results[L] = client;
        console.log("client: ");
        console.dir(client);
        var temp = JSON.stringify(results);
        saveReservation("results", temp).then(() => {
            alert("登録が完了しました");
            for (var i = 0; i < results.length; i++) {
                $('#Table1').append('<tr id=table' + i + '><td>' + results[i].dateClient +
                    '</td><td>' + results[i].valClient + '</td><td>' + results[i].detailClient
                    + "</td><td>" + results[i].resClient
                    + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult1(' + L + ')">結果</button></td></tr>');
            }
            deleteValue("fapPass", "tempResult");
        }).catch(() => alert("error saveReservation"));
    }).catch(err => {
        console.log(err);
        client.index = 0;
        var results = [client];
        var temp = JSON.stringify(results);
        saveReservation("results", temp).then(() => {
            $('#Table1').append('<tr id=table' + 0 + '><td>' + results[0].dateClient +
                '</td><td>' + results[0].valClient + '</td><td>' + results[0].detailClient
                + "</td><td>" + results[0].resClient
                + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickResult1(' + 0 + ')">結果</button></td></tr>');
            deleteValue("fapPass", "tempResult");
        }).catch(err => alert(err));
    });

    console.log("index" + index);
    if (index) {
        deleteAppointment(index);
    }
}

function resetElement() {
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


function movePhoto() {
    var date = $('#txtDate').val();
    var detail = $('#txtdetail').val();
    var val = $('#Examination').val();
    var res = $("#rblresult").val();
    // var Aindex = $("#index").val();
    console.log("index: " + Aindex);
    if (!Aindex) {
        getData("results").then(rs => {
            index = rs.length;
        }).catch(err => {
            index = 0;
        });
    }

    console.log("index1: " + index);

    var client = {
        dateClient: date,
        valClient: val,
        resClient: res,
        detailClient: detail,
        Aindex: Aindex,
        index: index
    }

    var temp = JSON.stringify(client);
    saveReservation("tempResult", temp).then(() => {
        console.log("一時保存しました");
        location.href = "previewPhoto.html";
    }).catch(err => console.error(err));
}

function deleteAp(){
    
}
