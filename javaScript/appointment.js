function appointmentRegistration(){
    //if ()
    var date = $('#txtDate').val();
    var detail = $('#txtdetail').val();
    var val = '';
    for (var i=1; i<=7; i++) {
        if (document.getElementById("RblExamination"+i).checked) {
            val = $('#RblExamination'+i).val();
            break;
        }
    }
    var client = {
        dateClient: date,
        valClient: val,
        detailClient: detail
    }
    var appointmentsString = localStorage.getItem('appointments');
    if (appointmentsString) {
        var appointments = JSON.parse(appointmentsString);
        var L = appointments.length;
        appointments[L] = client;
    } else {
        var appointments = [client]; 
    }
    appointmentsString = JSON.stringify(appointments);
    //localStorage.setItem('appointments',appointmentsString);
    var db;
    var request = indexedDB.open('hhsw');
    request.onsuccess = function (event){
        db = event.target.result;
        var ts = db.transaction(["store1"], "readwrite");
        var store = ts.objectStore("store1");
        var request = store.put({mykey: 'appointments', myvalue: appointmentsString});
        request.onsuccess = function(event){
            console.log("成功しました");
            db.close();
        }
        request.onerror = function(event){
            console.log("エラーが発生しました。");
        }
    }
    location.href='menu.html';
}