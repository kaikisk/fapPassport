$(function () {
  getData("tempResult").then(rs => {
    temp = JSON.parse(rs);
    getPhoto(temp.index).then(results => {
      temp.number = results.i;

      for (var v = 0; v < results.i; v++) {
        var src = results[v].img;
        $("#img" + v).css("display", "block");
        $("#img" + v).attr("src", src);
      }

      saveTemp1(temp);
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
})