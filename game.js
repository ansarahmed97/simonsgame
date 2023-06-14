// The game has four different colors: red, blue, green, and yellow, which are stored in an array called buttonColours. The game also has three different arrays: gamePattern, userClickedPattern, and started.

// gamePattern is an empty array that will store the random sequence of colors generated by the game. The userClickedPattern array stores the user's input of the sequence of colors clicked. The started variable is a Boolean value that keeps track of whether the game has started or not.

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// The program listens for a keypress event on the document using jQuery. When a key is pressed, the if statement checks if the game has not started yet, and if so, sets the text of an HTML element with an id of level-title to "Level 0" and calls the nextSequence function.

// The nextSequence function generates a random number between 0 and 3 and uses it to select a color from the buttonColours array. The color is then added to the end of the gamePattern array. The selected color is displayed on the screen by fading in and out the button with the corresponding color

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// When the user clicks on a button, the $(".btn").click() function is triggered. The ID of the clicked button is retrieved and added to the userClickedPattern array. The playSound function is called to play a sound corresponding to the clicked button, and the animatePress function is called to briefly highlight the button.

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// The checkAnswer function is called after each user input to verify if the input is correct. The currentLevel parameter of the function represents the index of the last button clicked by the user. If the user's input matches the corresponding color in the gamePattern array, the if statement checks if the user has completed the sequence. If so, the nextSequence function is called after a delay of 1 second.

// If the user's input does not match the corresponding color in the gamePattern array, the else statement is executed. The playSound function is called to play a sound indicating a wrong answer, and the addClass method is used to add a CSS class to the HTML body element to display a red background. The text of the level-title element is updated to "Game Over, Press Any Key to Restart". After a delay of 200ms, the removeClass method is used to remove the added CSS class from the body element, and the startOver function is called to reset the game.

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// The animatePress function adds a CSS class to the button to simulate a button press animation. The setTimeout function is used to remove the added class after 100ms, thus ending the animation.

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Finally, the playSound function is called with the name of the audio file to play the sound of a specific button.

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// The startOver function resets the game by setting level to 0, clearing the gamePattern array, and setting started to false

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}