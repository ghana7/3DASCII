var MAP_WIDTH = 10;
var MAP_HEIGHT = 10;

function tile(color,character) {
	this.color = color;
	this.character = character;
}
function draw(arrMap) {
	var display = document.getElementById("game");
	display.innerHTML = "";
	var textNode;
	for(var i = 0; i < MAP_HEIGHT; i++) {
		var line = "";
		for(var j = 0; j < MAP_WIDTH; j++) {
			line += arrMap[i][j].character;
		}
		textNode = document.createTextNode(line);
		display.appendChild(textNode);
		if(i != MAP_HEIGHT - 1) {
			var br = document.createElement("br");
			display.appendChild(br);
		}
	}
}
var map = [];
for(var i = 0; i < MAP_HEIGHT; i++) {
	map[i] = [];
	for(var j = 0; j < MAP_WIDTH; j++) {
		map[i][j] = new tile("#FF0000","" + i + j);
	}
}

var gameInterval = setInterval(function() {draw(map);}, 5);