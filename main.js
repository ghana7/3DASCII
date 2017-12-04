var MAP_WIDTH = 150;
var MAP_HEIGHT = 40;
var TILES = ["X"," ","~"];
var DISPLAY = document.getElementById("game");
var START_X = 5;
var START_Y = 5;

var BLANK_MAP = [];
var MAP = [];

var keysDown = []; //storage for keyboard monitoring
window.onkeyup = function(e) {keysDown[e.keyCode]=false;} //creates array of booleans whether key is down or not
window.onkeydown = function(e) {keysDown[e.keyCode]=true;}

var entities = []; //list of entities
var entityMap = []; //map-like array that is overlayed on top of map

function Entity(x, y, character) { //any object that can move
	this.x = x;
	this.y = y;
	this.character = character;
}

function drawEntity(entity,entityMapArray) {
	var oldRow = entityMapArray[entity.y];
	entityMapArray[entity.y] = oldRow.substring(0,entity.x) + entity.character + oldRow.substring(entity.x + 1); //put entity in that position in that row of array
}
function drawEntities(entityArray, entityMapArray) {
	entityMapArray = BLANK_MAP.slice();
	for(var i = 0; i < entityArray.length; i++) {
		drawEntity(entityArray[i], entityMapArray);
	}
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
		BLANK_MAP.push(blankSpaceForEntities);
	}
	entityMap = BLANK_MAP.slice();
}


function draw(map, topLeftX, topLeftY) { //draws the given map at top-right position x,y
	var x = Math.max(topLeftX, 0);
	var y = Math.max(topLeftY, 0);
	var output = "";
	for(var row = y; row < y + MAP_HEIGHT; row++) { //goes down rows in view
		for(var column = x; column < x + MAP_WIDTH; column++) {
			if(entityMap[row].substring(column, column + 1) == " ") {
				output += map[row].substring(column,column + 1);
			} else {
				output += entityMap[row].substring(column,column + 1);
			}
		}
		output += "\n";
	}
	DISPLAY.innerHTML = output;
}

function playerControl(playerEntity) {
	
	if(keysDown[65]) { //A
		playerEntity.x--;
	}
	if(keysDown[68]) { //D
		playerEntity.x++;
	}
	if(keysDown[87]) { //W
		playerEntity.y--;
	}
	if(keysDown[83]) { //S
		playerEntity.y++;
	}
}

generateMap(500,500);

var player = new Entity(START_X, START_Y, "B");
entities.push(player);


function gameLoop() {
	playerControl(player);
	drawEntities(entities,entityMap);
	draw(MAP, player.x - Math.floor(MAP_WIDTH / 2), player.y - Math.floor(MAP_HEIGHT / 2));
}

var gameInterval = setInterval(function() {gameLoop();}, 250);