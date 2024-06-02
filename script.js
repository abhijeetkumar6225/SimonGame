var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var gameStarted=false;
var level=0;

$(document).keypress(function() {
    if (!gameStarted) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      gameStarted = true;
    }
  });
  

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } 
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over , Press any key to restart the game");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+ level)
    let randomNumber = Math.floor(Math.random() * 4); // 0 to 3
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    // Select the button with the id corresponding to the randomChosenColor
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // $("#"+randomChosenColor).addClass.toggle("pressed")
    playSound(randomChosenColor);
    
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    } , 100);
    // $("#"+currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

// Example of how to call nextSequence (e.g., when a key is pressed)

function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
}
  