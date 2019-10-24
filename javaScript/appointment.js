function appointmentRegistration() {
    // $('#Table1').empty();
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
                $('#Table1').append('<tr id=table' + L + '><td>' + appointments[L].dateClient +
                    '</td><td>' + appointments[L].valClient + '</td><td>' + appointments[L].detailClient
                    + '</td><td><button type="button" class="btn-square-shadow" onclick="clickRegister(' +
                    L + ')">更新</button></td>' + '<td><button type="button" class="btn-square-shadow" onclick="deleteAppointment(' +
                    L + ')">削除</button></td></tr>');
                console.log("表示完了");
            }).catch(err => alert(err));
        }
    }).catch(err => {
        console.log(err + "はまだ登録されていません");
        var appointments = [client];
        var temp = JSON.stringify(appointments);
        saveAppointment(temp).then(() => {
            alert("登録が完了しました");
            $('#Table1').append('<tr id=table' + 0 + '><td>' + appointments.dateClient +
                '</td><td>' + appointments.valClient + '</td><td>' + appointments.detailClient
                + '</td><td><button type="button" class="btn-square-shadow" onclick="clickRegister(' +
                i + ')">更新</button></td>' + '<td><button type="button" class="btn-square-shadow" onclick="deleteAppointment(' +
                i + ')">削除</button></td></tr>');
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

function deleteAppointment(index) {
    var appointmentsString = getData("appointments");
    appointmentsString.then(ap => {
        if (ap) {
            var appointments = JSON.parse(ap);
            appointments.splice(index, 1);
            console.log("削除後のappointments");
            console.dir(appointments);
            var temp = JSON.stringify(appointments);
            saveAppointment(temp).then(() => {
                $('#table' + index).remove();
                console.log("削除成功");
            }).catch(err => {
                console.error("削除後のappointmentsの更新失敗");
            });
            console.log(temp);
        }
    })
}