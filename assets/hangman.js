var gameTracker = {

}
var themes = {
	sports: 
		{
		background:'sports-bg.jpg',
		bank: {	
			football:{image:'football.jpg'},
			baseball:{image:'baseball.jpg'},
			cricket:{image:'cricket.jpg'},
			soccer:{image:'soccer.jpg'},
			basketball:{image:'basketball.jpg'},
			hunting:{image:'hunting.jpg'},
			racing:{image:'racing.jpg'},
			softball:{image:'softball.jpg'},
			volleyball:{image:'volleyball.jpg'},
			swimming:{image:'swimming.jpg'}
			}
		},	
	bands: 
		{
		background:'bands-bg.jpg',
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
	for (var key in gameTracker.theme) {
		bank.push(key);
	}
	// choose a random word
	gameTracker.word=bank[randNum(bank.length)];
	
}
function randNum(max) {
   	var num = Math.floor((Math.random()*max));
   	return num;
 }
