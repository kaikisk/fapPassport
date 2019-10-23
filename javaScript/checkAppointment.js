var appointments;
$(function() {
    // var appointmentsString = localStorage.getItem('appointments');
    var appointmentsString = getData("appointments");
    alert(appointmentsString);
    if (appointmentsString) {
        appointments = JSON.parse(appointmentsString);
        for(var i = 0; i < appointments.length; i++) {
            console.log(i + " : " + appointments[i])
            $('#Table1').append( '<tr><td>' + appointments[i].dateClient + 
'</td><td>' + appointments[i].valClient + '</td><td>' + appointments[i].detailClient 
+ '</td><td><button type="button" class="btn pull-left" onclick="clickRegister('+
i+')">Register the result</button></td></tr>')
        }
    }
})

function clickRegister(index) {
    recordString = JSON.stringify(appointments[index]);
    //localStorage.setItem('tempAppointment',recordString);
    
    // var db;
    // var request = indexedDB.open('fapPassport');
    // request.onsuccess = function (event){
    //     db = event.target.result;
    //     var ts = db.transaction(["fapPass"], "readwrite");
    //     var store = ts.objectStore("fapPass");
    //     var request = store.put({id: 'tempAppointment', myvalue: recordString,});
    //     request.onsuccess = function(event){
    //         console.log("成功しました");
    //     }
    //     request.onerror = function(event){
    //         console.log("エラーが発生しました。");
    //     }
    // }
    location.href='result.html';
}
