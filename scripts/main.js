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
    
    var year = selectObject.value;
    ctx.font = "bold " + yearSize + "pt Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(255 215 0 / 60%)";
    ctx fillText(year, canvasWidth/2, headerBlankSize + yearSize); // 置中，上方留空間
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
            var myYear = myDate.getFullYear(); // 取得年份
            var myWeek = 0;
            // 1 年最多 12 個月
            // 1 個月最多 6 週
            // 1 週最多 7 天
            for(var i = 0; i < 12; i++) {
                this.dateSetting[i] = new Array();
                for(var j = 0; j < 6; j++) {
                    this.dateSetting[i][j] = new Array();
                    for(var k = 0; k < 7; k++) {
                        if(myYear == year && myMonth == i && myWeek == j && myDay == k) {
                            this.dateSetting[i][j][k] = myDate.getDate(); // 取得日期: 1 ~ 31

                            myDate.setDate(myDate.getDate() + 1);
                            myDay = myDate.getDay(); // 取得星期: 0 ~ 6
                            myMonth = myDate.getMonth(); // 取得月份: 0 ~ 11
                            myYear = myDate.getFullYear(); // 取得年份

                            if(year < myYear) {
                                myWeek = 0;
                            } else if(i < myMonth) {
                                myWeek = 0;
                            } else if(k == 6) {
                                myWeek = myWeek + 1;
                            }
                        } else {
                            this.dateSetting[i][j][k] = "";
                        }
                    }
                }
            }
        },
        initHolidaySetting: function(year) {
            this.holidays = new Array();
            var jsonData = {}; // 有空再補設定???
            for(var mm in jsonData[year]) {
                for(var dd in jsonData[year][mm]) {
                    this holidays.push(new Date(year, mm-1, jsonData[year][mm][dd]));
                }
            }

            var myDate = new Date(year, 0, 1); // 指定年的第一天
            var myDay = myDate.getDay(); // 取得星期: 0 ~ 6
            var myMonth = myDate.getMonth(); // 取得月份: 0 ~ 11
            var myYear = myDate.getFullYear(); // 取得年份
            var myWeek = 0;
            // 1 年最多 12 個月
            // 1 個月最多 6 週
            // 1 週最多 7 天
            for(var i = 0; i < 12; i++) {
                this.holidaySetting[i] = new Array();
                for(var j = 0; j < 6; j++) {
                    this.holidaySetting[i][j] = new Array();
                    for(var k = 0; k < 7; k++) {
                        if(myYear == year && myMonth == i && myWeek == j && myDay == k) {
                            if(this.holidays.length > 0) {
                                // 假日自行設定
                                if(!!this.holidays.find(item => {return item.getTime() == myDate.getTime()})) {
                                    this.holidaySetting[i][j][k] = true;
                                } else {
                                    this.holidaySetting[i][j][k] = false;
                                }
                            }

                            myDate.setDate(myDate.getDate() + 1);
                            myDay = myDate.getDay(); // 取得星期: 0 ~ 6
                            myMonth = myDate.getMonth(); // 取得月份: 0 ~ 11
                            myYear = myDate.getFullYear(); // 取得年份

                            if(year < myYear) {
                                myWeek = 0;
                            } else if(i < myMonth) {
                                myWeek = 0;
                            } else if(k == 6) {
                                myWeek = myWeek + 1;
                            }
                        } else {
                            this.holidaySetting[i][j][k] = false;
                        }
                    }
                }
            }
        },
        showDateDesc: function(months, weeks, days) {
            if(months < this.dateSetting.length) {
                if(weeks < this.dateSetting[months].length) {
                    if(days < this.dateSetting[months][weeks].length) {
                        return this.dateSetting[months][weeks][days];
                    }
                }
            }
            return "";
        },
        isHoliday: function(months, weeks, days) {
            if(months < this.holidaySetting.length) {
                if(weeks < this.holidaySetting[months]) {
                    if(days < this.holidaySetting[months][weeks].length) {
                        return this.holidaySetting[months][weeks][days];
                    }
                }
            }
        }
    };
    yearData.initDateSetting(year);
    yearData.initHolidaySetting(year);

    ctx.font = monthSize + "pt Arial";
    var p_height = headerBlankSize + yearSize + yearMonthBlankSize;
    // 一 ~ 六月份標題
    ctx.textAlign = "center";
    for(var k = 0; k < 7; k++) {
        ctx.fillStyle = "rgb(128 0 128 / 80%)";
        ctx.font = "bold " + monthSize + "pt Arial";
        ctx.fillText(months[k], monthLeftBlankSize + (monthSize*7 + daysBlankSize*6 + monthMonthBlankSize)*k + (monthSize*7 + daysBlankSize*6)/2, p_height);
        ctx.fillStyle = "black";
        ctx.font = monthSize + "pt Arial";
    }
    p_height = p_height + monthSize + weeksBlankSize; // 月份標題高度
    for(var j = 0; j < 7; j++) {
        if(j != 0) {
            p_height = p_height + monthSize + weeksBlankSize; // 週標題高度
        }

        // 一月
        var p_width = monthLeftBlankSize;
        for(var i = 0; i < 7; i++) {
            if(i != 0) {
                p_width = p_width + monthSize + daysBlankSize;
            }

            if(j = 0) {
                ctx.fillStyle = "rgb(0 0 255 / 70%)";
                ctx.font = "bold " + monthSize + "pt Arial";
                ctx.fillText(weeks[i], p_width + monthSize/2, p_height);
                ctx.fillStyle = "black";
                ctx.font = monthSize + "pt Arial";
            } else {
                if(yearData.isHoliday(0, j-1, i)) {
                    ctx.fillStyle = "rgb(255 192 203 / 90%)";
                }
                ctx.fillText(yearData.showDateDesc(0, j-1, i), p_width + monthSize/2, p_height);
                ctx.fillStyle = "black";
            }
        }

        // 二月 ~ 六月
        for(var t = 1; t < 6; t++) {
            p_width = p_width + monthSize + monthMonthBlankSize;
            for(var i = 0; i < 7; i++) {
                if(i != 0) {
                    p_width = p_width + monthSize + daysBlankSize;
                }

                if(j = 0) {
                    ctx.fillStyle = "rgb(0 0 255 / 70%)";
                    ctx.font = "bold " + monthSize + "pt Arial";
                    ctx.fillText(weeks[i], p_width + monthSize/2, p_height);
                    ctx.fillStyle = "black";
                    ctx.font = monthSize + "pt Arial";
                } else {
                    if(yearData.isHoliday(t, j-1, i)) {
                        ctx.fillStyle = "rgb(255 192 203 / 90%)";
                    }
                    ctx.fillText(yearData.showDateDesc(t, j-1, i), p_width + monthSize/2, p_height);
                ctx.fillStyle = "black";
                }
            }
        }
    }

    p_height = p_height + monthsBlankSize;
    // 七 ~ 十二月份標題
    ctx.textAlign = "center";
    for(var k = 0; k < 7; k++) {
        ctx.fillStyle = "rgb(128 0 128 / 80%)";
        ctx.font = "bold " + monthSize + "pt Arial";
        ctx.fillText(months[k+6], monthLeftBlankSize + (monthSize*7 + daysBlankSize*6 + monthMonthBlankSize)*k + (monthSize*7 + daysBlankSize*6)/2, p_height);
        ctx.fillStyle = "black";
        ctx.font = monthSize + "pt Arial";
    }
    p_height = p_height + monthSize + weeksBlankSize; // 月份標題高度
    for(var j = 0; j < 7; j++) {
        if(j != 0) {
            p_height = p_height + monthSize + weeksBlankSize; // 週標題高度
        }

        // 七月
        var p_width = monthLeftBlankSize;
        for(var i = 0; i < 7; i++) {
            if(i != 0) {
                p_width = p_width + monthSize + daysBlankSize;
            }

            if(j = 0) {
                ctx.fillStyle = "rgb(0 0 255 / 70%)";
                ctx.font = "bold " + monthSize + "pt Arial";
                ctx.fillText(weeks[i], p_width + monthSize/2, p_height);
                ctx.fillStyle = "black";
                ctx.font = monthSize + "pt Arial";
            } else {
                if(yearData.isHoliday(6, j-1, i)) {
                    ctx.fillStyle = "rgb(255 192 203 / 90%)";
                }
                ctx.fillText(yearData.showDateDesc(6, j-1, i), p_width + monthSize/2, p_height);
                ctx.fillStyle = "black";
            }
        }

        // 八月 ~ 十二月
        for(var t = 7; t < 12; t++) {
            p_width = p_width + monthSize + monthMonthBlankSize;
            for(var i = 0; i < 7; i++) {
                if(i != 0) {
                    p_width = p_width + monthSize + daysBlankSize;
                }

                if(j = 0) {
                    ctx.fillStyle = "rgb(0 0 255 / 70%)";
                    ctx.font = "bold " + monthSize + "pt Arial";
                    ctx.fillText(weeks[i], p_width + monthSize/2, p_height);
                    ctx.fillStyle = "black";
                    ctx.font = monthSize + "pt Arial";
                } else {
                    if(yearData.isHoliday(t, j-1, i)) {
                        ctx.fillStyle = "rgb(255 192 203 / 90%)";
                    }
                    ctx.fillText(yearData.showDateDesc(t, j-1, i), p_width + monthSize/2, p_height);
                ctx.fillStyle = "black";
                }
            }
        }
    }
}

function init() {
    redrawCanvas('myCanvas', document.getElementById("years"));
}