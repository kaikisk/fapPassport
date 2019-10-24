var appointments;
$(function () {
    var appointmentsString = getData("appointments");
    appointmentsString.then(ap => {
        appointments = JSON.parse(ap);
        for (var i = 0; i < appointments.length; i++) {
            console.log(i + " : " + appointments[i])
            $('#Table1').append('<tr id=table' + i + '><td>' + appointments[i].dateClient +
                '</td><td>' + appointments[i].valClient + '</td><td>' + appointments[i].detailClient
                + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickRegister(' +
                i + ')">更新</button></td>' + '<td><button type="button" class="btn-square-shadow btn_delAndup" onclick="deleteAppointment(' +
                i + ')">削除</button></td></tr>');
        }
    }).catch(err => console.log(err));
})



function clickRegister(index) {
    var appointmentsString = getData("appointments");
    appointmentsString.then(ap => {
        var appointments = JSON.parse(ap);
        var target = appointments[index];
        $('#txtDate').val(target.dateClient);
        $('#txtdetail').val(target.detailClient);
        $('select[name="type"]').val(target.valClient);
        $('#submit').text('更新');
        $('#submit').click(() => {
            target.dateClient = $('#txtDate').val();
            target.detailClient = $('#txtdetail').val();
            for (var i = 1; i <= 7; i++) {
                if (document.getElementById("RblExamination" + i).selected) {
                    target.valClient = $('#RblExamination' + i).val();
                    break;
                }
            }
            appointments[index] = target;
            var temp = JSON.stringify(appointments);
            console.log(temp);
            saveAppointment(temp).then(() => {
                $('#table' + index).html('<tr id=table' + index + '><td>' + appointments[index].dateClient +
                '</td><td>' + appointments[index].valClient + '</td><td>' + appointments[index].detailClient
                + '</td><td><button type="button" class="btn-square-shadow btn_delAndup" onclick="clickRegister(' +
                index + ')">更新</button></td>' + '<td><button type="button" class="btn-square-shadow btn_delAndup" onclick="deleteAppointment(' +
                index + ')">削除</button></td></tr>');
                console.log("更新が成功しました");
            }).catch(err => console.error("更新が失敗しました"));
        })
    }).catch(err => console.error(err));
}