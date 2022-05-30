// Check for collision between two rectangles
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.dimensions.width &&
      rectangle1.attackBox.position.y <=
        rectangle2.position.y + rectangle2.dimensions.height &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y
    );
  }
  
  // A function to determine winner
  function determineWinner({ player, enemy, timerID }) {
    if (player.health === enemy.health) {
      document.querySelector("#endGameText").innerHTML = "TIE!";
    } else if (player.health > enemy.health) {
      document.querySelector("#endGameText").innerHTML = "PLAYER 1 WINS!";
    } else {
      document.querySelector("#endGameText").innerHTML = "PLAYER 2 WINS!";
    }
    document.querySelector("#endGameText").style.display = "flex";
    clearTimeout(timerID)
  }
  
  // Update the timer
  let timer = 60;
  let timerID
  function decreaseTimer() {
    if (timer > 0) {
      timerID = setTimeout(decreaseTimer, 1000);
      document.querySelector("#timer").innerHTML = timer;
      timer--;
    } else {
      determineWinner({player, enemy, timerID})
    }
  }
  