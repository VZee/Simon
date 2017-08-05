//variable declarations
//possible moves
var colorArr = ["greenB", "redB", "yellowB", "blueB"];
//next move for player
var pNext;
//actual moves
var moveArr = [];
//number of moves
var count = 0;
var tracker = 0; 		//tracks the number of computer moves
var pTracker = 0; 	//tracks the number of player moves
//if the player pick is correct
var correct = true;
//if ready for more user input
var ready = true;
//variable to help with ordering of play
var turn = "pc";
//id and background for the square that should change color
var id;
var bg;
//game type - basic (bas) or advanced (adv), basic is default
var type = "bas";
///audio files
var sndGreen = new Howl({src:['https://www.soundjay.com/button/sounds/button-1.mp3']});
var sndRed = new Howl({src:['https://www.soundjay.com/button/sounds/button-4.mp3']});
var sndBlue = new Howl({src:['https://www.soundjay.com/button/sounds/button-8.mp3']});
var sndYellow = new Howl({src:['https://www.soundjay.com/button/sounds/button-10.mp3']});
var sound;

function moves(){
	//randomly generate next game move
	next = colorArr[Math.floor(Math.random() * colorArr.length)];
	moveArr[count] = next;
	count++;
	displayMoves();
}

function displayMoves(){
	//show all the computer moves up to this point
	color(moveArr[tracker]);
}

function nextPick(input){
	//get the player's input selection
	if(turn === "player" && input !== undefined && ready){
		pNext = input;
    ready = false;
		color(pNext);
	}
  else{
    nextPick(input);
  }
}

function color(pick){
	//"flash" the color and play audio
	if(pick === "greenB"){
		id = "greenB";
		bg = "#3bcc24";
		document.getElementById("greenB").style.backgroundColor = "#66f41f";
		sound = sndGreen;
	}
	else if(pick === "redB"){
		id = "redB";
		bg = "#cc2424";
		document.getElementById("redB").style.backgroundColor = "#f41f2a";
		sound = sndRed;
	}
	else if(pick === "blueB"){
		id = "blueB";
		bg = "#2491cc";
		document.getElementById("blueB").style.backgroundColor = "#07acff";
		sound = sndBlue;
	}
	else if(pick === "yellowB"){
		id = "yellowB";
		bg = "#efdc2f";
		document.getElementById("yellowB").style.backgroundColor = "#faff07";
		sound = sndYellow;
	}
	sound.play();
	setTimeout(function(){setBG(id, bg);}, 300);
}

function setBG(id, bg){
	//stop the audio and revert the selected square to its non-lit background color
	sound.stop();
	document.getElementById(id).style.backgroundColor = bg;
  setTimeout(function(){after();}, 300);
}

function after(){
	//function to execute after setBG is finished
	//increment counters
	document.getElementById("tally").innerHTML = moveArr.length;
	if(turn === "player"){checkPick(id);}
	else if(turn === "pc"){tracker++; isCorrect();}
}

function checkPick(input){
  //check if the player is incorrect
	if(input !== moveArr[pTracker]){
		correct = false;
	}
  pTracker = pTracker + 1;
  isCorrect();
}

function isCorrect(){
  //swap turns if necessary
  if(correct){
    if(tracker === count && turn === "pc"){
      turn = "player";
      tracker = 0;
      ready = true;
      nextPick();
    }
    //when the player is finished moving it is the computer's turn
    else if(pTracker === count && turn === "player"){
      turn = "pc";
      pTracker = 0;
      setTimeout(function(){moves();}, 300);
    }
    else if(turn === "player"){ready = true; nextPick();}
    else if(turn === "pc"){displayMoves();}
  }
  //if the user pressed an incorrect button
  else if(!correct){
    if(type === "bas"){
      turn = "pc";
      tracker = 0;
      current = 0;
      pTracker = 0;
      correct = true;
      setTimeout(function(){displayMoves();}, 300);
    }
    else if(type === "adv"){
      turn = "pc";
      tracker = 0;
      pTracker = 0;
      count = 0;
      moveArr = [];
      moveArr.length = 0;
      correct = true;
      setTimeout(function(){moves();}, 300);
    }
  }
}

function mode(gameType){
	//swap modes from advanced to basic
	if(gameType === "bas" && type === "adv"){
		document.getElementById("basic").classList.remove("styleB");
		document.getElementById("basic").classList.add("selectedB");
		document.getElementById("advanced").classList.remove("selectedB");
		document.getElementById("advanced").classList.add("styleB");
		type = gameType;
	}
	//swap modes from basic to advanced
	else if(gameType === "adv" && type === "bas"){
		document.getElementById("advanced").classList.remove("styleB");
		document.getElementById("advanced").classList.add("selectedB");
		document.getElementById("basic").classList.remove("selectedB");
		document.getElementById("basic").classList.add("styleB");
		type = gameType;
	}
}

function reset(){
	//reset the game
	mode("bas");
	tracker = 0;
	count = 0;
	ptracker = 0;
	count = 0;
	moveArr = [];
	moveArr.length = 0;
	turn = "pc";
	correct = true;
	setTimeout(function(){moves();}, 500);
}

$(document).ready(function(){
	moves();
})
