var gameTracker = {
	guesses:15
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
	$("#gameStage").fadeIn(2000);

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
	var wordDiv = document.getElementById('word');
	wordDiv.innerHTML = '';  // start with clear div each time
	var correct=0;
	// loop through gameTracker.letters array
	for (var i=0;i<gameTracker.letters.length;i++) {  
		
		// retrieve actual letter of word
		var thisLetter = Object.keys(gameTracker.letters[i])[0];
		
		// value of the gameTracker.letters[i] object is boolean: true if user guessed (or was a space), false if not yet guessed 
		if (gameTracker.letters[i].thisLetter) { // true
			wordDiv.innerHTML+=thisLetter;
			correct++				// track number of correct letters
			}    
		else 
			wordDiv.innerHTML += ' _ ';  // false - show underscore
	}

	// update image hint; height of image div is percent of correct answers
	// #imageHint is the actual img; #gameImage is the wrapper, initially set to height=0; 
	// this only works because all the images have the same height/width ratio of 1.5
	var totalHeight = $(imageHint).prop( "offsetWidth")/1.5;
	var newHeight = totalHeight*(correct/gameTracker.letters.length);
	console.log('% correct: '+correct/gameTracker.letters.length);
	$("#gameImage").css("height",newHeight);

}

function checkKey() {
 	var userGuess = event.key;
 	console.log('key: '+userGuess);
 	
 	// only counts as a guess if is letter
 	if (userGuess.match(/[a-z]/i)) {
 		
 		// decrement gameTracker.guesses
 		(gameTracker.guesses)--;
 		$(guessSpan).html(gameTracker.guesses); 
 		// out of guesses? game over, man!
 		if (gameTracker.guesses < 0)
 			gameOver();

 		// add letter to "guessed letters" list
 		$("#guessed").append('<span class="letter">'+userGuess+'</span>');

 		// is this one of our word's letters?
 		for (var i=0;i<gameTracker.letters.length;i++) {
 			if (userGuess == Object.keys(gameTracker.letters[i])[0]) {
 				gameTracker.letters[i] = 1;
 				updateWord();
 			}
 		}

 	}  // end is-letter code
 	
}  // end checkKey() function

function gameOver(){
	// create pop-up window that ends game 
	alert('game over');
}

function randNum(max) {
   	var num = Math.floor((Math.random()*max))
   	return num;
 }
