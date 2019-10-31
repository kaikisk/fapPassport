var imageCapture;
var tempImage;
var video = document.getElementById("myVideo"); // 適当にvideoタグのオブジェクトを取得
// var constrains = { video:{facingMode: { exact: "environment" }}, audio: false }; // 映像・音声を取得するかの設定
var constrains = { video: true, audio: false }; // 映像・音声を取得するかの設定


// navigator.mediaDevices.enumerateDevices()
// .then(devices => {
//     var videoSelect = document.getElementById("videoSource");
//     console.log(devices);
//     console.dir(devices);
//     for (let i = 0; i !== devices.length; ++i) {
//         const deviceInfo = devices[i];
//         const option = document.createElement('option');
//         option.value = deviceInfo.deviceId;
//         if (deviceInfo.kind === 'videoinput') {
//             option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
//             videoSelect.appendChild(option);
//         }
//     }
// });

navigator.mediaDevices.getUserMedia(constrains)
    .then(gotStream).catch(function (err) {
        console.log("An error occured! " + err);
    });

function gotStream(stream) {
    video.srcObject = stream; // streamはユーザーのカメラとマイクの情報で、これをvideoの入力ソースにする

    const track = stream.getVideoTracks()[0];
    console.log(track);
    imageCapture = new ImageCapture(track);

    alert("succsess");
}

// function changeVideo(){
//     alert('start change');
//     if(stream){
//         stream.getVideoTracks().forEach(track => {
//             track.stop();
//         });
//     }
//     alert("change VideoDevice");

//     var deviceID = document.getElementById("videoSource").option.value();
//     alert(deviceID);
//     constrains = {video: {deviceId: deviceID}, audio: false};

//     navigator.mediaDevices.getUserMedia(constrains)
//     .then(gotStream).catch(function(err) {
//         console.log("An error occured! " + err);
//     });
// }

function takePhoto() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    //videoの縦幅横幅を取得
    var w = video.offsetWidth;
    var h = video.offsetHeight;
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    ctx.drawImage(video, 0, 0, w, h);
    var temp = $(".video").html()
    var img = canvas.toDataURL('image/jpeg');
    console.log(img);
    var temp = $(".video").html()
    $(".video").html(temp + '<img src="' + img);
    saveImg("img", img).then(() => alert("success save img")).catch(err => alert(err));


    // imageCapture.takePhoto().then(blob => {
    //     console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B');
    //     tempImage = blob;

    //     console.log(tempImage);
    //     var temp = $(".video").html()
    //     $(".video").html(temp + '<img src="' + URL.createObjectURL(blob));
    // })
    // .catch(err => console.error('takePhoto() failed: ', err));
}

function saveImg(key, val) {
    return new Promise((resolve, reject) => {
        var db;
        var request = indexedDB.open("fapPassport");
        request.onsuccess = function (event) {
            console.log("indexedDB.open pass onsuccess");
            db = event.target.result;
            var ts = db.transaction(["fapPass"], "readwrite");
            var store = ts.objectStore("fapPass");
            var request = store.put({ id: key, myvalue: val });
            request.onsuccess = function (event) {
                resolve(key + " : " + val);
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