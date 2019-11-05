$(function() {
  var temp;
  var index;
  var width;
  var height;
  
  getData("tempResult").then(rs => {
    temp = JSON.parse(rs);
    index = temp.index;
    width = temp.width;
    height = temp.height;
    getPhoto(index).then(results => {
      for(var v=0; v <= results.i; v++){
        var canvas = $("#canvas" + v)[0];
        canvas.css("display", "block");
        canvas.width = width;
        canvas.height = height
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        }
        img.src = results[v].img;
      }
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
})

// var db;
// var i = 1;
// var request = indexedDB.open('fapPassport');
// request.onsuccess = function (event) {
//   db = event.target.result;
//   var ts = db.transaction(["photo"], "readonly");
//   var store = ts.objectStore("photo");
//   var request = store.openCursor();
//   request.onsuccess = function (event) {
//     if (event.target.result == null) {
//       return;
//     }
//     var cursor = event.target.result;
//     var data = cursor.value;
//     image.src = URL.createObjectURL(data.mayvalue);
//     cursor.continue();
//   }
// }

// function getNowID() {
//   return new Promise((resolve, reject) => {
//     //????????????
//     var key = "nowId";
//     var db;
//     var request = indexedDB.open('fapPassport');
//     request.onsuccess = event => {
//       db = event.target.result;
//       var ts = db.transaction(["photo"], "readwrite");
//       var store = ts.objectStore("photo");
//       var requestName = store.get(key);
//     }
//   })
// }