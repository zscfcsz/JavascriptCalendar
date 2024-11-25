function downloadJPG(canvasID) {
    alert(canvasID);
}

function redrawCanvas(canvasID, selectObject) {
    alert("redraw s: " + canvasID);
    var canvas = document.getElementById(canvasID);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /*
    最後再處理旋轉問題
    ctx.translate(1200/2, 1800);
    ctx.rotate(Math.PI*-90/180); */

    var canvasWidth = 1800; // 圖片寬度
    var canvasHeight = 1200; // 圖片高度

    var weeks = ["日", "一", "二", "三", "四", "五", "六"];
    var months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

    var headerBlankSize = 450; // 年上方空間留白高度，圖片留 400 px，再留白 50 px
    var yearSize = 36; // 年的字型大小
    var yearMonthBlankSize = 100; // 年與月份內容之間的間隔高度
    var monthSize = 16; // 月份內容的字型大小
    var monthsBlankSize = 100; // 上半年月份內容與下半年月份內容的間隔高度

    var monthMonthBlankSize = 50; // 月份與月份之間的間隔寬度
    var daysBlankSize = 20; // 月份內容日期與日期之間的間隔寬度
    var weeksBlankSize = 20; // 月份內容每週之間的間隔高度

    var monthLeftBlankSize = canvasWidth - (monthSize*7*6 + daysBlankSize*6*6 + monthMonthBlankSize*5) - monthSize; // 月份內容左邊留白的寬度 // 右邊記得留一點寬度空間，font pt 大小與 px 大小還是有一點誤差的
    monthLeftBlankSize = monthLeftBlankSize - 70; // 手動微調位置

    var imgUrl = document.getElementById("imgUrl");
    if(imgUrl.value != "") {
        // 手動微調 50 px 留白
        var myImg = new Image(canvasWidth, headerBlankSize - 50);
        myImg.onload = function() {
            ctx.drawImage(myImg, 0, 0, canvasWidth, headerBlankSize - 50);
        }
        myImg.src = imgUrl.value;
    }
    
    var year = selectObject.value;
    ctx.font = "bold " + yearSize + "pt Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(255 215 0 / 60%)";
    ctx fillText(year, canvasWidth/2, headerBlankSize + yearSize); // 置中，上方留空間
    ctx.fillStyle = "black";

    alert("redraw end");
}

function init() {
    alert("init");
    redrawCanvas('myCanvas', document.getElementById("years"));
}