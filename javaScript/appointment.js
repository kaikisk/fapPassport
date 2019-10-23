function appointmentRegistration() {
    //if ()
    var date = $('#txtDate').val();
    var detail = $('#txtdetail').val();
    var val = '';
    for (var i = 1; i <= 7; i++) {
        if (document.getElementById("RblExamination" + i).selected) {
            val = $('#RblExamination' + i).val();
            break;
        }
    }
    var client = {
        dateClient: date,
        valClient: val,
        detailClient: detail
    }
    var appointmentsString = getData("appointments");

    appointmentsString.then(ap => {
        if (ap) {
            var appointments = JSON.parse(ap);
            var L = appointments.length;
            appointments[L] = client;
            var temp = JSON.stringify(appointments);
            console.log(temp);
            saveAppointment(temp).then(() => {
                alert("登録が完了しました");
                for (var i = 0; i < appointments.length; i++) {
                    $('#Table1').append('<tr><td>' + appointments[i].dateClient +
                        '</td><td>' + appointments[i].valClient + '</td><td>' + appointments[i].resClient +
                        '</td><td>' + appointments[i].detailClient + '</td></tr>');
                }
                console.log("表示完了")
            }).catch(err => alert(err));
        }
    }).catch(err => {
        console.log(err + "はまだ登録されていません");
        var appointments = [client];
        var temp = JSON.stringify(appointments);
        saveAppointment(temp).then(() => {
            alert("登録が完了しました");
            for (var i = 0; i < appointments.length; i++) {
                $('#Table1').append('<tr><td>' + appointments[i].dateClient +
                    '</td><td>' + appointments[i].valClient + '</td><td>' + appointments[i].resClient +
                    '</td><td>' + appointments[i].detailClient + '</td></tr>');
            }
        }).catch(err => alert(err));
    })

}

function saveAppointment(appoint) {
    var key = "appointments"
    return new Promise((resolve, reject) => {
        var db;
        var request = indexedDB.open("fapPassport");
        request.onsuccess = function (event) {
            console.log("pass onsuccess");
            db = event.target.result;
            var ts = db.transaction(["fapPass"], "readwrite");
            var store = ts.objectStore("fapPass");
            var request = store.put({ id: "appointments", myvalue: appoint });
            request.onsuccess = function (event) {
                resolve(key + " : " + $('#' + key).val());
            }
            request.onerror = function (event) {
                reject("エラーが発生しました。");
            }
        }
        request.onerror = function () {
            console.log("indexedDBを開くのに失敗しました");
        }
    });
}