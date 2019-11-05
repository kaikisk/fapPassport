$(function () {
  getData("tempResult").then(rs => {
    temp = JSON.parse(rs);
    index = temp.index;
    getPhoto(index).then(results => {
      var canvas = [];
      var ctx = [];
      for (var v = 0; v < results.i; v++) {
        canvas[v] = $("#canvas" + v)[0];
        $(canvas[v]).css("display", "block");
        canvas[v].width = results[v].width;
        canvas[v].height = results[v].height;
        ctx[v] = canvas[v].getContext('2d');
        var img = new Image();
        img.onload = () => {
          ctx[v].drawImage(img, 0, 0);
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