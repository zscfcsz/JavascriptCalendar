function downloadJPG(canvasID) {
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', document.getElementById(canvasID).toDataURL('image/jpeg'));
    downloadLink.download = document.getElementById("years").value + "calendar.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function redrawCanvas(canvasID, selectObject) {
    var canvas = document.getElementById(canvasID);
    var ctx = canvas.getContext("2d");

    /*
    最後再處理旋轉問題
    ctx.translate(1200/2, 1800);
    ctx.rotate(Math.PI*-90/180); */

    var headerBlankSize = 50;
    var yearSize = 20;
    var yearMonthBlankSize = 50;
    var monthSize = 10;
    var monthsBlankSize = 50;


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