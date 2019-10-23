var appointments;
$(function () {
    // var appointmentsString = localStorage.getItem('appointments');
    var appointmentsString = getData("appointments");
    alert(appointmentsString);
    appointmentsString.then(ap => {
        appointments = JSON.parse(ap);
        for (var i = 0; i < appointments.length; i++) {
            console.log(i + " : " + appointments[i])
            $('#Table1').append('<tr><td>' + appointments[i].dateClient +
                '</td><td>' + appointments[i].valClient + '</td><td>' + appointments[i].detailClient
                + '</td><td><button type="button" class="btn-square-shadow" onclick="clickRegister(' +
                i + ')">更新</button></td></tr>');
        }
    }).catch(err => console.error(err));
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
    }).catch(err => console.error(err));
}
