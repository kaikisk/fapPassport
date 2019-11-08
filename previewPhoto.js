$(function () {
  getData("tempResult").then(rs => {
    temp = JSON.parse(rs);
    getPhoto(temp.index).then(results => {
      temp.number = results.i;

      for (var v = 0; v < results.i; v++) {
        var src = results[v].img;
        var id = results[v].id;
        $("#img" + id).css("display", "block");
        $("#img" + id).attr("src", src);
      }

      saveTemp1(temp);
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
})