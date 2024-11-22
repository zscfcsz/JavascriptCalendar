function downloadJPG(canvasID) {
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', document.getElementById(canvasID).toDataURL('application/octet-stream'));
    downloadLink.download = document.getElementById("years").value + "calendar.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function redrawCanvas(canvasID, selectObject) {
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

    var headerBlankSize = 400; // 年上方空間留白高度
    var yearSize = 36; // 年的字型大小
    var yearMonthBlankSize = 100; // 年與月份內容之間的間隔高度
    var monthSize = 16; // 月份內容的字型大小
    var monthsBlankSize = 100; // 上半年月份內容與下半年月份內容的間隔高度

    var monthMonthBlankSize = 50; // 月份與月份之間的間隔寬度
    var daysBlankSize = 20; // 月份內容日期與日期之間的間隔寬度
    var weeksBlankSize = 20; // 月份內容每週之間的間隔高度

    var monthLeftBlankSize = canvasWidth - (monthSize*7*6 + daysBlankSize*6*6 + monthMonthBlankSize*5) - monthSize; // 月份內容左邊留白的寬度 // 右邊記得留一點寬度空間，font pt 大小與 px 大小還是有一點誤差的
    monthLeftBlankSize = monthLeftBlankSize - 70; // 手動微調位置
    ctx.fillStyle = "black";

    // 取得指定年的資訊
    let yearData = {
        holidaySetting: new Array(),
        dateSetting: new Array(),
        holidays: new Array(), // 設定休假資訊
        initDateSetting: function(year) {
            var myDate = new Date(year, 0, 1); // 指定年的第一天
            var myDay = myDate.getDay(); // 取得星期: 0 ~ 6
            var myMonth = myDate.getMonth(); // 取得月份: 0 ~ 11
        // 寫到一半
        }
    }


    var year = selectObject.value;
    ctx.font = yearSize + "pt Arial";
    ctx.textAlign = "center";
    ctx.fillText(year, 1800/2, headerBlankSize + yearSize); //置中，上方留空間

    //width 1800: 50 + 20 + 50 ???
    //height 1200: ???

    //height: 50 + 20 + 50 + 20*7 + 50 + 20*7 + 50 = 500
    //x width: 50 + 20*7 + 50 + 20*7 + 50 + 20*7 + 50 + 20*7 + 50 + 20*7 + 50 + 20*7 + 50 = 1190
    //width: 54 + 20*7 + 16 + 20*7 + 16 + 20*7 + 16 + 20*7 + 16 + 20*7 + 16 + 20*7 + 54 = 1028
    ctx.font = "10pt Arial";
    ctx.textAlign = "start";
    var p_height = 70 + 50;
    for(var j = 0; j < 7; j++) {
        p_height = p_height + 20;
        var p_width = 34; //不知道為何這樣調整才正常???
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }
    }

    p_height = p_height + 50;
    for(var j = 0; j < 7; j++) {
        p_height = p_height + 20;
        var p_width = 34; //不知道為何這樣調整才正常???
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }

        p_width = p_width + 16;
        for(var i = 0; i < 7; i++) {
            p_width = p_width + 20;
            ctx.fillText('12', p_width, p_height);
        }
    }
}

function init() {
    redrawCanvas('myCanvas', document.getElementById("years"));
}