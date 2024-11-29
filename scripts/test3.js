function downloadJPG(canvasID) {
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', document.getElementById(canvasID).toDataURL('application/octet-stream'));
    downloadLink.download = document.getElementById("years").value + "calendar.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function redrawCanvas(canvasID, selectObject) {
    var canvas = document.getElementById(canvasID);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var yearMonthBgColor = "rgb(144 238 144 / 100%)"; // 年度與月份的背景色
    var yearColor = "rgb(255 255 0 / 100%)"; // 年度的文字顏色
    var yearTitleColor = "rgb(160 32 240 / 100%)"; // 一 ~ 十二月標題的文字顏色
    var weekColor = "rgb(0 0 250 / 100%)"; // 週標題的文字顏色
    var holidayColor = "rgb(255 0 255 / 100%)"; // 假日的文字顏色

    ctx.fillStyle = yearMonthBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var canvasWidth = 1800; // 圖片寬度
    var canvasHeight = 1200; // 圖片高度

    var weeks = ["日", "一", "二", "三", "四", "五", "六"];
    var months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

    var whiteBoldSize = 0; // 白邊大小
    var blackBoldSize = 1; // 黑框大小
    var headerBlankSize = 30 + 50; // whiteBoldSize; // 年上方空間留白高度，圖片留 350 px，再留白 50 px // 不畫白邊，但留 50 px 緩衝，萬一相片列印另外還要再切白邊
    var yearSize = 72; // 年的字型大小
    var yearMonthBlankSize = 50; // 年與月份內容之間的間隔高度
    var monthSize = 20; // 月份內容的字型大小
    var monthsBlankSize = 50; // 上半年月份內容與下半年月份內容的間隔高度

    var monthMonthBlankSize = 150; // 月份與月份之間的間隔寬度
    var daysBlankSize = 20; // 月份內容日期與日期之間的間隔寬度
    var weeksBlankSize = 20; // 月份內容每週之間的間隔高度

    var monthsOneRow = 4; // 設定一列顯示 4 個月，目前必須為 12 的因數
    var monthLeftBlankSize = canvasWidth - (monthSize*7*monthsOneRow + daysBlankSize*6*monthsOneRow + monthMonthBlankSize*(monthsOneRow - 1)) - monthSize; // 月份內容左邊留白的寬度 // 右邊記得留一點寬度空間，font pt 大小與 px 大小還是有一點誤差的
    monthLeftBlankSize = monthLeftBlankSize/2; // 手動置中
    
    var year = selectObject.value;
    ctx.font = "bold " + yearSize + "pt Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = yearColor;
    ctx.fillText(year, canvasWidth/2, headerBlankSize + yearSize); // 置中，上方留空間
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
            var jsonData = {"2024":{"01":["01", "06", "07", "13", "14", "20", "21", "27", "28"],
                                    "02":["03", "04", "08", "09", "10", "11", "12", "13", "14", "18", "24", "25", "28"],
                                    "03":["02", "03", "09", "10", "16", "17", "23", "24", "30", "31"],
                                    "04":["04", "05", "06", "07", "13", "14", "20", "21", "27", "28"],
                                    "05":["01", "04", "05", "11", "12", "18", "19", "25", "26"],
                                    "06":["01","02","08", "09", "10", "15", "16", "22", "23", "29", "30"],
                                    "07":["06", "07", "13", "14", "20", "21", "27", "28"],
                                    "08":["03", "04", "10", "11", "17", "18", "24", "25", "31"],
                                    "09":["01", "07", "08", "14", "15", "17", "21", "22", "28", "29"],
                                    "10":["05", "06", "10", "12", "13", "19", "20", "26", "27"],
                                    "11":["02", "03", "09", "10", "16", "17", "23", "24", "30"],
                                    "12":["01", "07", "08", "14", "15", "21", "22", "28", "29"]
                                   },
                            "2025":{"01":["01", "04", "05", "11", "12", "18", "19", "25", "26", "27", "28", "29", "30", "31"],
                                    "02":["01", "02", "09", "15", "16", "22", "23", "28"],
                                    "03":["01", "02", "08", "09", "15", "16", "22", "23", "29", "30"],
                                    "04":["03", "04", "05", "06", "12", "13", "19", "20", "26", "27"],
                                    "05":["01", "03", "04", "10", "11", "17", "18", "24", "25", "30", "31"],
                                    "06":["01", "07", "08", "14", "15", "21",, "22", "28", "29"],
                                    "07":["05", "06", "12", "13", "19", "20", "26", "27"],
                                    "08":["02", "03", "09", "10", "16", "17", "23", "24", "30", "31"],
                                    "09":["06", "07", "13", "14", "20", "21", "27", "28"],
                                    "10":["04", "05", "06", "10", "11", "12", "18", "19", "25", "26"],
                                    "11":["01", "02", "08", "09", "15", "16", "22", "23", "29", "30"],
                                    "12":["06", "07", "13", "14", "20", "21", "27", "28"]
                                   }
                           };
            for(var mm in jsonData[year]) {
                for(var dd in jsonData[year][mm]) {
                    this.holidays.push(new Date(year, mm-1, jsonData[year][mm][dd]));
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
                            } else {
                                // 無設定，假日預設為星期六、日
                                if(myDay == 0 || myDay == 6) {
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
                if(weeks < this.holidaySetting[months].length) {
                    if(days < this.holidaySetting[months][weeks].length) {
                        return this.holidaySetting[months][weeks][days];
                    }
                }
            }
            return false;
        }
    };
    yearData.initDateSetting(year);
    yearData.initHolidaySetting(year);

    ctx.font = monthSize + "pt Arial";
    var p_height = headerBlankSize + yearSize + yearMonthBlankSize;

    for(var m = 0; m < 12/monthsOneRow; m++) {
        // 月份標題
        ctx.textAlign = "center";
        for(var k = 0; k < monthsOneRow; k++) {
            ctx.fillStyle = yearTitleColor;
            ctx.font = "bold " + monthSize + "pt Arial";
            ctx.fillText(months[monthsOneRow*m + k], monthLeftBlankSize + (monthSize*7 + daysBlankSize*6 + monthMonthBlankSize)*k + (monthSize*7 + daysBlankSize*6)/2, p_height);
            ctx.fillStyle = "black";
            ctx.font = monthSize + "pt Arial";
        }
        p_height = p_height + monthSize + weeksBlankSize; // 月份標題高度
        for(var j = 0; j < 7; j++) { // 週標題、每月六週
            if(j != 0) {
                p_height = p_height + monthSize + weeksBlankSize; // 週標題高度
            }

            // 一 ~ 四月、五 ~ 八月、九 ~ 十二月
            var p_width = monthLeftBlankSize;
            for(var t = 0 + monthsOneRow*m; t < monthsOneRow*(m + 1); t++) {
                if(t != 0 + monthsOneRow*m) {
                    p_width = p_width + monthSize + monthMonthBlankSize;
                }
                for(var i = 0; i < 7; i++) {
                    if(i != 0) {
                        p_width = p_width + monthSize + daysBlankSize;
                    }

                    if(j == 0) {
                        ctx.fillStyle = weekColor;
                        ctx.font = "bold " + monthSize + "pt Arial";
                        ctx.fillText(weeks[i], p_width + monthSize/2, p_height);
                        ctx.fillStyle = "black";
                        ctx.font = monthSize + "pt Arial";
                    } else {
                        if(yearData.isHoliday(t, j-1, i)) {
                            ctx.fillStyle = holidayColor;
                        }
                        ctx.fillText(yearData.showDateDesc(t, j-1, i), p_width + monthSize/2, p_height);
                        ctx.fillStyle = "black";
                    }
                }
            }
        }

        p_height = p_height + monthsBlankSize;
    }

    // 白邊
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, whiteBoldSize); // 上
    ctx.fillRect(0, canvas.height - whiteBoldSize, canvas.width, whiteBoldSize); // 下
    ctx.fillRect(0, 0, whiteBoldSize, canvas.height); // 左
    ctx.fillRect(canvas.width - whiteBoldSize, 0, whiteBoldSize, canvas.height); // 右

    // 黑框
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, blackBoldSize); // 上
    ctx.fillRect(0, canvas.height - blackBoldSize, canvas.width, blackBoldSize); // 下
    ctx.fillRect(0, 0, blackBoldSize, canvas.height); // 左
    ctx.fillRect(canvas.width - blackBoldSize, 0, blackBoldSize, canvas.height); // 右
}

function init() {
    redrawCanvas('myCanvas', document.getElementById("years"));
}