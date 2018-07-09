var $ = require('jquery');

var gameStart = false;
var clickCount = 0;
var timerInterval = null;
var responseArray = [];

var divBackgroundColorsArray = [
    "#b71c1c", "#880e4f", "#4a148c", "#d81b60", "#e53935", "#8e24aa", "#4527a0", "#283593", 
    "#1565c0", "#0288d1", "#0097a7", "#006064", "#00695c", "#00897b", "#2e7d32", "#9e9d24",
    "#f57f17", "#e65100", "#d84315", "#6d4c41", "#616161", "#455a64", "#263238", "#000000",
];

$(document).ready(function(){
    $('#game-grid').hide();
    $('#game-reset').hide();
    $('div.grid-example').children('span').text('X');
});

$(document).on('click', '#play', function(){
    var difficultyLevel = $('input[name="difficulty"]:checked').val();
    $('#game-difficulty-select').hide();
    generateNumbers(difficultyLevel);
});

$(document).on('click', '#reset', function(){
    gameStart = false;
    clickCount = 0;
    responseArray = [];
    stopTimer();
    $('div.grid-example').children('span').text('X');
    $('div.grid-example').css('background-color', '#c0c0c0');
    $('#game-grid').hide();
    $('#game-reset').hide();
    $('#timer-badge').text('0');
    $('#timer-div').show();
    $('#game-difficulty-select').show();
});

$(document).on('click', '.flow-text', function(){
    var countVal = ++clickCount;
    var numbersTotal = responseArray.length - 1;
    var divId = $(this).parent().attr('id');
    var index = responseArray.indexOf(parseInt(divId));
    if(index != countVal) {
        displaySolution();
        alert('You clicked the wrong cell. You loose.');
        return;
    }
    $(this).text(countVal);

    //if the clicked counter is last one
    if(countVal == numbersTotal){
        alert('You have successfully clicked all the cells.');
        return;
    }
});

function generateNumbers(difficulty) {
    var placed;
    var totalNumbers = difficulty == 'easy' ? 5 : 10;
    var counter = difficulty == 'easy' ? 6000 : difficulty == 'medium' ? 10000 : 20000;
    responseArray.push(0);
	for (var i = 1; i <= totalNumbers; i++) {
		placed = false;
		while (!placed) {
			var randLoc = randomiser(36, 0);
			if ($('#'+randLoc).children('span').text() == 'X') {
                $('#'+randLoc).children('span').text(i);
                responseArray.push(randLoc);
				if(difficulty != 'hard') {
                    $('#'+randLoc).css('background-color', divBackgroundColorsArray[randomiser(24, 0)]);
				}
				placed = true;
			}
		}
    }
    $('#game-grid').show();
    $('#game-reset').show();
    startTimer(counter);
}

function startTimer(counter) {
	var countDown = parseInt(counter)/1000;
	timerInterval = setInterval(function(){
		if(countDown >= 0) {
			$('#timer-badge').text(countDown--);
		}

		if(countDown < 0) {
			gameStart = true;
            $('div.grid-example').children('span').text('X');
            $('#timer-badge').text('0');
            $('#timer-div').hide();
			stopTimer();
		}
	},1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function randomiser(upperBound, lowerBound) {
    return Math.round(Math.random() * (upperBound - lowerBound));
}

function displaySolution() {
    for(var i = 0; i < responseArray.length; i++) {
        if(i == 0) {
            continue;
        }
        $('#'+ responseArray[i]).children('span').text(i);
    }
}