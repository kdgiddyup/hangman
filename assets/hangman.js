/*hangman pseudo coding

idea: themed elements in object for switching
var theme = <userpick>

themes = {
sports: 
{
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
},	
	
bands: 
{
'the beatles':{image:'beatles.jpg'}
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

gameTracker.theme = theme

//use theme switcher to initiate game

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