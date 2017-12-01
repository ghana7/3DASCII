var MAP_WIDTH = 150;
var MAP_HEIGHT = 40;
var TILES = ["X"," ","~"];
var DISPLAY = document.getElementById("game");
var START_X = 5;
var START_Y = 5;

var MAP = [];
		   
var entities = [];
var entityMap = [];

function Entity(x, y, character) { //any object that can move
	this.x = x;
	this.y = y;
	this.character = character;
}
Entity.prototype.drawIn = function(entityArray) {
	var oldRow = entityArray[this.y];
	entityArray[this.y] = oldRow.substring(0,this.x) + this.character + oldRow.substring(this.x + 1); //put entity in that position in that row of array
}
	
	
Player.prototype = new Entity();
Player.prototype.constructor = Player;
function Player() {
	this.x = START_X;
	this.y = START_Y;
	this.character = "🤔";
}
Player.prototype.drawIn = function(entityArray) {
	Entity.prototype.drawIn.call(this, entityArray);
}

function drawEntities(entityArray, entityMapArray) {
	for(var i = 0; i < entityArray.length; i++) {
		entityArray[i].drawIn(entityMapArray);
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
		entities.push(blankSpaceForEntities);
	}
}


function draw(map, x, y) { //draws the given map at top-right position x,y
	var output = "";
	for(var row = y; row < y + MAP_HEIGHT; row++) { //goes down rows in view
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
	drawEntities(entities,entityMap);
	draw(MAP, 0,testy);
	
	testy++;
}



generateMap(500,500);

var player = new Player();
console.log(player);
entities.push(player);
var gameInterval = setInterval(function() {gameLoop();}, 250);