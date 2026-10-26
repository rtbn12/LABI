var table = document.getElementById("colorTable");

var rows = 10;
var cols = 10;

function randomHexComponent() {
    var color = Math.round(255.0 * Math.random());
    var hex = color.toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}


function randomColor() {
    var r = randomHexComponent();
    var g = randomHexComponent();
    var b = randomHexComponent();
    return "#" + r + g + b;
}


for (var i = 0; i < rows; i++) {
    var tr = document.createElement("tr");

    for (var j = 0; j < cols; j++) {
        var td = document.createElement("td");

        var color = randomColor();
        td.setAttribute("bgcolor", color);
        td.textContent = color;

        tr.appendChild(td);
    }

    table.appendChild(tr);
}