import { promises } from "fs";

$(function() {
    var keys = ['telFam', 'telAtten','bloodType','height','weight',
    'medi1','medi2','medi3',
    'anam','anam2','anam3',
    'txtName','txtMail','txtPass'];
    var saveData = new Array();
    for(var i = 0; i < keys.length; i++) {
        load(keys[i]);
    }
    $('#update').click(function(e){
        for(var i = 0; i < keys.length; i++) {
            saveData.push(save(keys[i]));
        }
        Promise.all(saveData).then(values =>{
            alert(values);
            location.href="myData.html";
        }).catch(errs => {
            alert(errs);
        })
        
    });
});

// function save(x) {
//     //localStorage.setItem(x, $('#'+x).val());

//     var db;
//     var request = indexedDB.open("fapPassport");
//     request.onsuccess = function (event){
        
//         db = event.target.result;
//         var ts = db.transaction(["fapPass"], "readwrite");
//         var store = ts.objectStore("fapPass");
//         var request = store.put({id: x, myvalue: $('#'+x).val()});
//         request.onsuccess = function(event){
//             console.log("成功しました");
//         }
//         request.onerror = function(event){
//             console.log("エラーが発生しました。");
//         }
//     }
// }

// function load(download1) {
//     //$( "#"+download1 ).val(localStorage.getItem(download1));

//     var db;
//     var request = indexedDB.open('fapPassport');
//     request.onsuccess = function (event){
//         db = event.target.result;
//         var ts = db.transaction(["fapPass"], "readwrite");
//         var store = ts.objectStore("fapPass");
//         var request = store.get(download1);
//         request.onsuccess = function(event){
//             $( "#"+download1 ).val(event.target.result.myvalue);
//         }
//         request.onerror = function(event){
//             console.log("エラーが発生しました。");
//         }
//     }
// }