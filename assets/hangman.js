var gameTracker = {
	guesses:15,
	guessed:[]
};
var themes = {
	sports: 
		{
		background:'sports-bg.jpg',
		color:'green',
		bank: {	
			football:{image:'football.jpg'},
			baseball:{image:'baseball.jpg'},
			cricket:{image:'cricket.jpg'},
			soccer:{image:'soccer.jpg'},
			basketball:{image:'basketball.jpg'},
			skiing:{image:'skiing.jpg'},
			racing:{image:'racing.jpg'},
			softball:{image:'softball.jpg'},
			volleyball:{image:'volleyball.jpg'},
			swimming:{image:'swimming.jpg'}
			}
		},	
	bands: 
		{
		background:'bands-bg.jpg',
		color: 'red',
		bank: {
			'the beatles':{image:'beatles.jpg'},
			'metallica':{image:'metallica.jpg'},
			'the who':{image:'who.jpg'},
			'radiohead':{image:'radiohead.jpg'},
			'the smiths':{image:'smiths.jpg'},
			'the velvet underground':{image:'velvet.jpg'},
			'led zeppelin':{image:'zeppelin.jpg'},
			'the rolling stones':{image:'stones.jpg'},
			'nirvana':{image:'nirvana.jpg'},
			'wheezer':{image:'wheezer.jpg'}
			}
		} 
}

function initialize(theme) {
	// set onkeyup listener; is key released? go to checkKey function
	$(document).on("keyup",function(){checkKey(event)});

	// hide themepicker
	picker=$('#themepicker');
	$(picker).fadeOut("fast");
	
	// set guesses remaining
	guessSpan = $("#remaining");
	$(guessSpan).html(gameTracker.guesses); 

	// from user choice, set theme in gameTracker
	gameTracker.theme = themes[theme];
	
	// from user choice, set theme background
	document.getElementsByTagName('body')[0].style.backgroundImage = 'url(assets/images/'+themes[theme].background;
	
	// we need to pick a random word from the theme's bank
	// put words in an array using Object.keys function
	bank=Object.keys(gameTracker.theme.bank);
		// choose a random word
	gameTracker.word=bank[randNum(bank.length)];
	
	// get associated image
	gameTracker.image=gameTracker.theme.bank[gameTracker.word].image;
	$("#gameImage").append('<img id="imageHint">');
	var imageHint = $("#imageHint");
	imageHint.attr("src","assets/images/"+gameTracker.image);	
	
	
	// update stage header
	var headerTheme = document.getElementById('themeName');
	headerTheme.innerHTML=theme.toUpperCase();
	headerTheme.style.color=themes[theme].color;

	// make gameStage visible
	$("#gameStage").fadeIn('fast');

// create array of wordChars with word chars as keys, boolean false (0) as initial values
	var word=gameTracker.word.split('');
	for (var i=0;i<word.length;i++) {
		
		// initial state is false for guess value
		var thisValue = 0;
		
		// except we'll give them spaces as guessed
		if (word[i] == ' ')
			thisValue= 1;

		// modify array so each letter becomes an object with a boolean value; use [literal] assignment for keys
		word[i] = {[word[i]]:thisValue};   
	}

	// update gameTracker object with letters, then run updateWord function
	gameTracker.letters = word;
	updateWord();

}


function updateWord() {
	var wordDiv = $("#word");
	$(wordDiv).html('');  // start with clear div each time
	var correct=0;
	// loop through gameTracker.letters array
	for (var i=0;i<gameTracker.letters.length;i++) {  
		
		// retrieve actual letter of word
		var thisLetter = Object.keys(gameTracker.letters[i])[0];
		
		// value of the gameTracker.letters[i] object is boolean: true if user guessed (or was a space), false if not yet guessed
		if (gameTracker.letters[i][thisLetter]) { // true
			$(wordDiv).append('<span class="letter"> '+thisLetter.toUpperCase()+' </span>');
			correct++				// track number of correct letters
			}    
		else 
			$(wordDiv).append('<span class="letter"> _ </span>');  // false - show underscore
	}

	// update image hint; height of image div is percent of correct answers
	// #imageHint is the actual img; #gameImage is the wrapper, initially set to height=0; 
	// this only works because all the images have the same height/width ratio of 1.5
	var totalHeight = $(imageHint).prop( "offsetWidth")/1.5;
	var newHeight = totalHeight*(correct/gameTracker.letters.length);
	$("#gameImage").css("height",newHeight);

	// if all letters are correct, launch "win" modal window
	if (correct == gameTracker.letters.length)
		gameOver('win');

}

function checkKey() {
 	var isMatch =0;
 	var userGuess = event.key.toLowerCase(); 	
 	// only counts as a guess if is letter
 	if (userGuess.length == 1 && userGuess.search(/[a-z]/) >-1) {

 		// and if it isn't already in the guessed list
 		var inList = 0;
 		for (var i=0;i<gameTracker.guessed.length;i++) 
 			if (gameTracker.guessed[i] == userGuess)
 				inList = 1;

 		// not guessed yet? add this one to the guessed letter array
 		if (!inList) 
 			gameTracker.guessed.push(userGuess);
		
			// now we have an updated array of guessed letters
 			// let's clear guessed letters div and update it
 		$("#guessed").html(''); 
 		for (var i=0;i<gameTracker.guessed.length;i++) 
 				$("#guessed").append('<span class="letter">'+gameTracker.guessed[i]+'</span>');

 		// is this one of our word's letters?
 		
 		for (var i=0;i<gameTracker.letters.length;i++) {
 			if (Object.keys(gameTracker.letters[i])[0]==userGuess) {
 				isMatch=1;
 				gameTracker.letters[i][userGuess] = 1;
 				}
		 	}
		 updateWord();
 		
 		// letter was not a match and not already guessed; decrement guesses remaining
		if (!inList && !isMatch) 
			gameTracker.guesses--;	
 		
		// out of guesses? game over, man!
		if (gameTracker.guesses  == 0)
			gameOver('lose')

		// otherwise, update guesses remaining
		else 
			$(guessSpan).html(gameTracker.guesses); 
 	}  // end is-valid-key code
}  // end checkKey() function

function gameOver(state){
	// create pop-up window that ends game 
	var overWindow = $('<div id="gameOver"></div>');
	if (state == 'win')
		$(overWindow).append('<p>You won! Nice job!</p>')
	else if (state == 'lose')
		$(overWindow).append('<p>Sorry, out of guesses!</p>');
	$(overWindow).append('<button class="btn btn-danger">Start over</button>').on("click",function(){location.reload();});
	$("body").append(overWindow);
}

function randNum(max) {
   	var num = Math.floor((Math.random()*max))
   	return num;
 }
