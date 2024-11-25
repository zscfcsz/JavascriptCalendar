function downloadJPG(canvasID) {
    alert(canvasID);
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', document.getElementById(canvasID).toDataURL('application/octet-stream'));
    downloadLink.download = document.getElementById("years").value + "calendar.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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