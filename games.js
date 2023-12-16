gamePattern=[];
userClickedPattern=[];
buttonColors=["red","blue","green","yellow"];

var userChoosenColor
$(".btn").click(function(){
      var userChoosenColor =$(this).attr("id");
      userClickedPattern.push(userChoosenColor);
      animatePress(userChoosenColor);
      playSound(userChoosenColor);
      checkAnswer(userClickedPattern.length-1);
});
var level=0;
var started=false;

$(document).keydown(function(){
      if(!started){
            $("h1").html("Level"+" "+level);
            nextSequence();
            started=true;
      }
});

var n;
function nextSequence(){

      userClickedPattern=[];

      $("h1").html("Level"+" "+level);
      level++;
      n=Math.random()*4;
      n=Math.floor(n);
      var randomChosenColour=buttonColors[n];
      gamePattern.push(randomChosenColour);
      $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
      
};

function playSound(name){
      var audio = new Audio("./sounds/"+name+".mp3");
      audio.play();

}
function animatePress(currentColor){
      $("." + currentColor).addClass("pressed");

      setTimeout(function() {
            $("."+ currentColor).removeClass("pressed");
          }, 100);

}

function checkAnswer(currentLevel){
      if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
            console.log("success");

      }
      else if(userClickedPattern[currentLevel]!=gamePattern[currentLevel]){
            $(document.body).addClass("game-over");
            playSound("wrong");
            startOver();
            
            setTimeout(function(){
                 $(document.body).removeClass("game-over");
            },200);
            $("h1").html("Game Over, Press Any Key to Restart");

      }
      if(userClickedPattern.length===gamePattern.length){
            setTimeout(function() {
                  nextSequence();
                }, 1000);
      }



}
function startOver(){
      level=0;
      gamePattern=[];
      started=false;

}