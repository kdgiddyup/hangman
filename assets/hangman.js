var gameTracker = {};

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

//gameTracker.theme = theme

//use theme switcher to initiate game
/*
gameTracker.word = <random word chosen from theme's bank>

Wins: show wins

display current word


guess counter
display guesses in this round
(start at 15)


letters tracker:
display letters guessed in this round




gameTracker = {

wins: 0,
word: <current word>, 
guessesRemaining: 15,
letters: 0
}

word guess engine:

use object that uses word characters as keys and initial values as "_":
var wordChars = {};
for (var i=0;i<gameTracker.word.length;i++)
	wordChars[gameTracker.word[i]] = '_';


*/
function initialize(theme) {
	// hide themepicker
	picker=document.getElementById('themepicker');
	picker.style.display="none";
	// from user choice, set theme in gameTracker
	gameTracker.theme = themes[theme];
	// from user choice, set theme background
	document.getElementsByTagName('body')[0].style.backgroundImage = 'url(assets/images/'+themes[theme].background;
	// how many words in this theme's bank?
	// put words in an array
	bank=[];
	for (var key in gameTracker.theme.bank) {
		bank.push(key);
	}
	// choose a random word
	gameTracker.word=bank[randNum(bank.length)];
	
	// now we also have an image
	gameTracker.image=gameTracker.theme.bank[gameTracker.word].image;

	$("#gameImage").append('<img id="imageHint">');
	$("#imageHint").attr("src","assets/images/"+gameTracker.image);	
	
	
	// update stage header
	var headerTheme = document.getElementById('themeName');
	headerTheme.innerHTML=theme.toUpperCase();
	headerTheme.style.color=themes[theme].color;

	// make gameStage visible
	$("#gameStage").fadeIn(2000);

// create array of wordChars with word chars as keys, boolean false (0) as initial values
	var letters= {};
	for (var i=0;i<gameTracker.word.length;i++) {
		letters[i] = {[gameTracker.word[i]]:0};  // assign gameTracker.word letters as [literals] for keys
	}
	gameTracker.letters = letters;

}
function randNum(max) {
   	var num = Math.floor((Math.random()*max)+1);
   	return num;
 }
