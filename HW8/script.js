/*
Name: Eric Ramos
Email: eric_ramos@student.uml.edu
File: /~eramos/script.js
Affiliation: UMass Lowell Computer Science Student, 91.61 GUI Programming I
Assignment: Scrabble
Created: 12/14/2020
Copyright (c) 2020 by Eric Ramos. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.

Description: The following is the logic behind scrabble, such as placing and creating tiles, updating scores, and ensuring that proper tile distribution is used.

//The following site is used to learn how to make something droppable & draggable
//https://www.elated.com/drag-and-drop-with-jquery-your-essential-guide/

//The following site was used to learn how to center the tile, as I was experencing a bug where tiles could be mis aligned with thier tile space on the board.
//https://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center
*/
var highScore = 0;
var remainingTiles = 0;
var tilesInRack = 0; //Used to know how many tiles to fill when drawing
var rack = [7]; //Saved state of letters
var board = [7]; //temp saved state of letters
var currentScore = 0;
var totalScore = 0;
var currentWord = [7]; //Letters on the board

$( document ).ready(function() {
	newGame();
});

function newGame(){
	remainingTiles = 100;
	tilesInRack = 0;
	currentScore = 0;
	totalScore = 0;
	currentWord = [-1,-1,-1,-1,-1,-1,-1];
	refillBag();
	createDropBoxes();
	clearBoard();
	fillRack();
	update();
}

//refills the remaining amount of tiles using the original distribution.
function refillBag(){
	for(var i = 0; i < 27; i++){
		ScrabbleTiles[i]["number-remaining"] = ScrabbleTiles[i]["original-distribution"];
	}
}

//This puts tiles onto the rack.
function fillRack(){
	var draw = 7 - tilesInRack;
	$("#rack").append("<div id='rackTiles'></div>");
	for(var i = 0; i < draw; i++){
		var index = parseInt(Math.floor(Math.random() * 27));
		//Out of that type of letter and so it will try again.
		if(ScrabbleTiles[index]["number-remaining"] == 0){
			i--;
		}
		else{
			//saves the letters into the rack, the board is used to remove letters when submitting.
			rack[i] = index;
			board[i] = index;
			tilesInRack++;
			remainingTiles--;
			createTile(i, index);
		}
	}
	//Recreates letters that stayed on the rack
	for(var i = draw; i < 7; i++){
		createTile(i, rack[i]);
	}
}

//We pass i for the location on the rack, and index to know what tile it is.
//This creates the "physical" tile on the website, and adds ids and classes.
function createTile(i, index){
	tile = $("<img id ='Tile" + i + "' src ='Scrabble_Tiles/Scrabble_Tile_" + ScrabbleTiles[index]["letter"] + ".jpg' class = 'shrink' value  = "+ i + ">" )
	if(index == 26){
		tile = $("<img id ='Tile" + i + "' src ='Scrabble_Tiles/Scrabble_Tile_Blank.jpg' class = 'shrink' value  = "+ i + ">" )
	}
	tile.draggable({
		revert: 'invalid',
		scroll: false,
		snap: "#line img",
    snapMode: "inner",
		snapTolerance: 80, //SnapTolerance is set to 80 as its the size of the image
	});
	ScrabbleTiles[index]["number-remaining"]--;
	$("#rackTiles").append(tile);
}

//The following site is used on how to make something droppable
//https://www.elated.com/drag-and-drop-with-jquery-your-essential-guide/
function createDropBoxes(){
	for(var i = 0; i < 7; i++){
		$("#T" + i).droppable({
			drop: dropped,
			classes: {
				"ui-droppable-active": "ui-state-active",
				"ui-droppable-hover": "ui-state-hover"
			}
		});
		$("#T" + i).droppable('enable');
	}
}

//The following site is used as a resource for drop events
//https://www.elated.com/drag-and-drop-with-jquery-your-essential-guide/
//The following function is used to update the board, rack, and scores when a tile is dropped.
function dropped(event, ui){
	//The following site was used to get IDs
	//https://stackoverflow.com/questions/19777478/getting-property-values-of-dropped-object-in-jquery-ui
	//We are putting tiles on the "board" and updating the score.
	var tileID = ui.draggable.attr("id");
	var spaceID = $(this).attr("id");
	//gets the index by ID
	var tileVal = position[tileID];
	var spaceVal = position[spaceID];
	//Puts the word from rack into the current word
	currentWord[spaceVal] = rack[tileVal]
	board[tileVal] = -1;
	if(spaceVal == 1 || spaceVal == 6){
		currentScore += 2 * ScrabbleTiles[rack[tileVal]]["value"];
	}
	else{
		currentScore += ScrabbleTiles[rack[tileVal]]["value"];
	}
	//updates which spaces can be dropped into and then updates the score.
	updateDroppable();
	update();
	tilesInRack--;
	var $this = $(this);
	//The following site was used to learn how to center the tile
	//https://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center
	ui.draggable.position({
		my: "center",
    at: "center",
    of: $this,
		using: function(pos) {
      $(this).animate(pos, 200, "linear");
    }
	});
}

//This function ensures that if the drop box is full, or if there are no letters next to it, it is not droppable.
function updateDroppable(){
	for(var i = 0; i < 7; i++){
		if(i == 0){
			if(currentWord[i] != -1 || currentWord[i+1] == -1){
				$("#T" + i).droppable('disable');
			}
			else{
				$("#T" + i).droppable('enable');
			}
		}
		else if(i == 6){
			if(currentWord[i] != -1 || currentWord[i-1] == -1){
				$("#T" + i).droppable('disable');
			}
			else{
				$("#T" + i).droppable('enable');
			}
		}
		else{
			if(currentWord[i] != -1 || (currentWord[i-1] == -1 && currentWord[i+1] == -1)){
				$("#T" + i).droppable('disable');
			}
			else{
				$("#T" + i).droppable('enable');
			}
		}
	}
}

//clears all tiles from the board
function clearBoard(){
	$("#rackTiles").remove();
}

//Recalls all tiles from the board back to the rack
function redo(){
	clearBoard();
	currentScore = 0;
	currentWord = [-1,-1,-1,-1,-1,-1,-1];
	tilesInRack = 7;
	createDropBoxes();
	$("#rack").append("<div id='rackTiles'></div>");
	for(var i = 0; i < 7; i++){
		//Uses saved tiles to recreate them and refills the board array.
		board[i] = rack[i]
		createTile(i, rack[i]);
	}
	update();
}

//This function handles left over tiles, it moves remaining tiles to the left side of the rack;
function shiftLetters(){
	var temp = [7];
	var j = 0;
	for(var i = 0; i < 7; i++){
		if(board[i] != -1){
			temp[j] = board[i];
			j++;
		}
	}
	console.log("value of j" + j);
	for(var h = 0; h < j; h++){
		/*
		console.log("Value of h" + h);
		console.log("value of rack at highest point" + rack[6-h]);
		console.log("value of temp" + temp[j-h-1]);
		*/
		rack[6-h] = temp[j-h-1];
		//console.log("value of rack at highest point now equals" + rack[6-h]);
	}
}

//Submits the word, and checks that there are enough tiles to continue
//If the player runs out of tiles the game will start over.
function submit(){
	var draw = 7 - tilesInRack;
	if( draw <= remainingTiles){
		clearBoard();
		createDropBoxes();
		shiftLetters();
		fillRack();
		totalScore += currentScore;
		console.log(totalScore);
		currentScore = 0;
		currentWord = [-1,-1,-1,-1,-1,-1,-1];
		update();
	}
	else{
		alert("No more tiles left! A new game has started");
		newGame();
	}
}

//updates the current score, and current word
function update(){
	score = "Word Score: " + currentScore;
	$("#score").html(score);
	total = "Total Score: " + totalScore;
	$("#totalScore").html(total);
	left = "Tiles Left: " + remainingTiles;
	$("#remaining").html(left);
	if(totalScore > highScore){
		highScore = totalScore;
		hs = "Highscore: " + totalScore;
		$("#highScore").html(hs);
	}
	word = "Current Word: ";
	for(i = 0; i < 7; i++){
		if(currentWord[i] == -1){
			word += " ";
		}
		else{
			word += ScrabbleTiles[currentWord[i]]["letter"];
		}
	}
	$("#curWord").html(word);
}

//This array is very vital in determing which tile was moved where.
var position = [];
position["T0"] = 0;
position["T1"] = 1;
position["T2"] = 2;
position["T3"] = 3;
position["T4"] = 4;
position["T5"] = 5;
position["T6"] = 6;
position["Tile0"] = 0;
position["Tile1"] = 1;
position["Tile2"] = 2;
position["Tile3"] = 3;
position["Tile4"] = 4;
position["Tile5"] = 5;
position["Tile6"] = 6;

/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */

var ScrabbleTiles = [] ;
ScrabbleTiles[0] = { "letter": 'A', "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles[1] = { "letter": 'B', "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[2] = { "letter": 'C', "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[3] = { "letter": 'D', "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles[4] = { "letter": 'E', "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles[5] = { "letter": 'F', "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[6] = { "letter": 'G', "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles[7] = { "letter": 'H', "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[8] = { "letter": 'I', "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles[9] = { "letter": 'J', "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles[10] = { "letter": 'K', "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles[11] = { "letter": 'L', "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles[12] = { "letter": 'M', "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[13] = { "letter": 'N', "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles[14] = { "letter": 'O', "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles[15] = { "letter": 'P', "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[16] = { "letter": 'Q', "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles[17] = { "letter": 'R', "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles[18] = { "letter": 'S', "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles[19] = { "letter": 'T', "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles[20] = { "letter": 'U', "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles[21] = { "letter": 'V', "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[22] = { "letter": 'W', "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[23] = { "letter": 'X', "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles[24] = { "letter": 'Y', "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles[25] = { "letter": 'Z', "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles[26] = { "letter": '_', "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;
