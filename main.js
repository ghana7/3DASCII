var MAP_WIDTH = 193;
var MAP_HEIGHT = 40;
var TILES = ["X"," ","~"];
var display = document.getElementById("game");
console.log(display);
function tile(color,character) {
	this.color = color;
	this.character = character;
}
function draw(arrMap) {
	display.innerHTML = "";
	var textNode;
	var line;
	for(var i = 0; i < MAP_HEIGHT; i++) {
		line = "";
		for(var j = 0; j < MAP_WIDTH; j++) {
			line += "<span style=\"color:" + arrMap[i][j].color + "\">" + arrMap[i][j].character + "</span>";			//add character from map array to line
		}
		line += "\n";
		display.innerHTML += line;
	}
}
var map = [];
function generateMap() {
	for(var i = 0; i < MAP_HEIGHT; i++) {
		map[i] = [];
		for(var j = 0; j < MAP_WIDTH; j++) {
			map[i][j] = new tile("#FF0000",TILES[Math.floor(Math.random() * TILES.length)]);
		}
	}
}


function gameLoop() {
	generateMap();
	draw(map);
}
//draw(map);

var gameInterval = setInterval(function() {gameLoop();}, 1000);