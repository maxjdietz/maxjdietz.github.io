const powerButton = document.querySelector("button");
const powerMeter = document.querySelector(".meter");
const powerLevel = document.querySelector(".number");
const testButton = document.querySelector(".test");


powerButton.addEventListener("mousedown", powerBar);

let holdChecker = false;

const canvas = document.querySelector('.ballContainer');
const ctx = canvas.getContext('2d');

powerButton.addEventListener("mousedown", powerBar);


//-----------------------------------------
let ball = {
  x: canvas.width/2,
  y: canvas.height -30,
  radius: 5,
  color: "green",
  dx: 0,
  dy: 0,
  

};


function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI );
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath()

  
}
 canvas.addEventListener('click', drawBall)

    canvas.addEventListener('click', function(event) {
      console.log("TEST")
        // Calculate direction towards mouse click
        let angle = Math.atan2(event.clientY - ball.y, event.clientX - ball.x);
        let speed = 5; // Adjust as needed
        ball.dx = Math.cos(angle) * speed;
        ball.dy = Math.sin(angle) * speed;
    });
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        ball.x += ball.dx;
        ball.y += ball.dy;

        // Example: Bounce off walls (adjust as needed for your game logic)
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx *= -1;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy *= -1;
        }

        drawBall(); // Redraw the ball
        requestAnimationFrame(update); // Continue the loop
    }

    update(); // Start the animation


// ----------------------------------------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function powerLvlFunc(power){
  if(power < 10){
     powerLevel.textContent = 0;

  }
  else{
    let powerString = power.toString()
     powerLevel.textContent = powerString[0];

  }
  
   
}

async function powerBar(){
    console.log("test");
    holdChecker = true;
    let loopBar = 1;
    let increase = 0;
    while (holdChecker === true){
      powerButton.addEventListener("mouseup", () => {
        holdChecker = false;
        loopBar = 2;
        powerLvlFunc(increase);
        return;
       

      });

      while(loopBar === 1){
      
        console.log(increase);
        await sleep(2.5);
        powerMeter.style.height = increase + "%";
        if (increase == 100){
          loopBar--;
        }
        increase++;

      }
        while(loopBar === 0){
        
        console.log(increase);
        await sleep(3);
        powerMeter.style.height = increase + "%";
        if (increase == 0){
          loopBar++;
        }
        increase--;
      }
    }
    

}