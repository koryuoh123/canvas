


$(document).ready(function () {
  $("#colorpicker").farbtastic("#color");
});
$("#color").bind("click", function () {
  $(".picker").toggle(function () {
    $("#canvas").trigger("e", $("#color").css("background-color"));
  });
});
$('#remove').bind("click", function () {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
})
$('#pen').bind("click", function () {
    ctx.strokeStyle = current;
    ctx.lineWidth = 4;
})

$("#canvas").on("e", function (e, value) {
  ctx.strokeStyle = value;
  current = value;
  ctx.lineWidth = 4;
});
//画线
canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext("2d");
let painting = false; //初始状态
let current="";
ctx.fillStyle = "black";
ctx.strokeStyle = "none"; //画笔颜色
ctx.lineCap = "round";
ctx.lineWidth = "4";

let last; //记录点
var isTouchDevice = "ontouchstart" in document.documentElement;

if (isTouchDevice) {
  //···········手机浏览器··········
  document.body.addEventListener('touchmove' , function(e){
    e.preventDefault();
})
  canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    last = [x, y];
  };
  canvas.ontouchmove = (e) => {
    ctx.beginPath();
    ctx.moveTo(last[0], last[1]);
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    ctx.lineTo(x, y);

    ctx.stroke();
    last = [x, y];
  };
} else {
  //···········电脑浏览器············
  canvas.onmousedown = (e) => {
    painting = true;
    last = [e.clientX, e.clientY];
  };
  canvas.onmouseup = (y) => {
    painting = false;
  };
  canvas.onmousemove = (e) => {
    if (painting === true) {
      //开始画
      ctx.beginPath();
      ctx.moveTo(last[(0, 0)], last[(0, 1)]);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.lineCap = "round";
      last = [e.clientX, e.clientY];
    }
  };
}
