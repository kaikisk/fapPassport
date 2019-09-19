var appointments;
$(function() {
    var appointmentsString = localStorage.getItem('appointments');
    if (appointmentsString) {
        appointments = JSON.parse(appointmentsString);
        for(var i = 0; i < appointments.length; i++) {
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
    var db;
    var request = indexedDB.open('hhsw');
    request.onsuccess = function (event){
        db = event.target.result;
        var ts = db.transaction(["store1"], "readwrite");
        var store = ts.objectStore("store1");
        var request = store.put({mykey: 'tempAppointment', myvalue: recordString,});
        request.onsuccess = function(event){
            console.log("成功しました");
        }
        request.onerror = function(event){
            console.log("エラーが発生しました。");
        }
    }
    location.href='result.html';
}
