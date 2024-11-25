function downloadJPG(canvasID) {
    alert(canvasID);
}

function redrawCanvas(canvasID, selectObject) {
    alert("redraw start: " + canvasID);
    var canvas = document.getElementById(canvasID);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    alert("redraw end");
}

function init() {
    alert("init");
    redrawCanvas('myCanvas', document.getElementById("years"));
}