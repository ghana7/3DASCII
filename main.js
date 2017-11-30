var MAP_WIDTH = 150;
var MAP_HEIGHT = 40;
var TILES = ["X"," ","~"];
var DISPLAY = document.getElementById("game");

var MAP = [];
		   
var entities = [];

function entity(x, y, character) { //any object that can move
	this.x = x;
	this.y = y;
	this.character = character;
}

function generateMap(width, height) { //generates map of given width and height (currently random)
	var blankSpaceForEntities = "";
	for(var i = 0; i < width; i++) {
		blankSpaceForEntities += " ";
	}
	for(var i = 0; i < height; i++) {
		var row = "";
		
		for(var j = 0; j < width; j++) {
			row += TILES[Math.floor(Math.random() * TILES.length)];
		}
		MAP.push(row);
		entities.push(blankSpaceForEntities);
	}
}


function draw(map, x, y) { //draws the given map at top-right position x,y
	var output = "";
	for(var row = y; row < y + MAP_HEIGHT; row++) { //goes down rows in view
		//output += map[row].substring(x, x + MAP_WIDTH); // selects the right number of characters starting at the right point in the map
		for(var column = x; column < x + MAP_WIDTH; column++) {
			if(entities[row].substring(column, column + 1) == " ") {
				output += map[row].substring(column,column + 1);
			} else {
				output += entities[row].substring(column,column + 1);
			}
		}
		output += "\n";
	}
	DISPLAY.innerHTML = output;
}

var testy = 0;
function gameLoop() {
	draw(MAP, 0,testy);
	testy++;
}



generateMap(500,500);
var gameInterval = setInterval(function() {gameLoop();}, 250);