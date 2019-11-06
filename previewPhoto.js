$(function () {
  getData("tempResult").then(rs => {
    temp = JSON.parse(rs);
    index = temp.index;
    getPhoto(index).then(results => {
      var canvas = [];
      var ctx = [];
      for (var v = 0; v < results.i; v++) {
        canvas = $("#canvas" + v)[0];
        $(canvas).css("display", "block");
        canvas.width = results[v].width;
        canvas.height = results[v].height;
        ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        }
        img.src = results[v].img;
      }
      // var canvas = $("#canvas0")[0];
      // $(canvas).css("display", "block");
      // canvas.width = results[0].width;
      // canvas.height = results[0].height;
      // var ctx = canvas.getContext('2d');
      // var img = new Image();
      // img.onload = () => {
      //   ctx.drawImage(img, 0, 0);
      // }
      // img.src = results[0].img;

      // var canvas1 = $("#canvas1")[0];
      // $(canvas1).css("display", "block");
      // canvas1.width = results[1].width;
      // canvas1.height = results[1].height;
      // var ctx1 = canvas.getContext('2d');
      // var img1 = new Image();
      // img1.onload = () => {
      //   ctx1.drawImage(img, 0, 0);
      // }
      // img1.src = results[1].img;

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