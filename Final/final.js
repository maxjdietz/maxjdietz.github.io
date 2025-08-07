const powerButton = document.querySelector("button");
const powerMeter = document.querySelector(".meter");
const powerLevel = document.querySelector(".number");
const testButton = document.querySelector(".test");
const line = document.querySelector(".line");
const canvas = document.querySelector('.ballContainer');
const ctx = canvas.getContext('2d');

let speed = 0;
const speedOfMeter = 3;

let ball = {
    x: canvas.width/2,
    y: canvas.height -30,
    radius: 5,
    color: "green",
    dx: 0,
    dy: 0
  };


//STEP1---------------------------------------------------------
powerButton.addEventListener("mousedown", powerBar); //hold down power button for power


async function powerBar(){
    holdDown = true;
    let loopBar = 1; //for moving up and back down
    let increase = 0; //for height of red meter
     //ms for sleep func
    while (holdDown === true){
      //checks each loop to see if holdUp basically
      powerButton.addEventListener("mouseup", () => {
        holdDown = false;
        loopBar = 2;
        powerLvlFunc(increase);
        return;
      });
      //up
      while(loopBar === 1){
        await sleep(speedOfMeter);
        powerMeter.style.height = increase + "%";
        if (increase == 100){
          loopBar--;
        }
        increase++;

      }//down
        while(loopBar === 0){
        await sleep(speedOfMeter);
        powerMeter.style.height = increase + "%";
        if (increase == 0){
          loopBar++;
        }
        increase--;
      }
    }
    

}
// --------------------------------------------------------
//STEP 2---------------------------------------------------------
//assigns value 0-9 based off power level
function powerLvlFunc(power){
  if(power < 10){
     powerLevel.textContent = 0;
     

  }
  else{
    let powerString = power.toString();
    powerLevel.textContent = powerString[0];
  
  }
  setSpeed(power);
  
  testButton.addEventListener('click', update);
  
   
}

function setSpeed(power){
  if (power <= 50){
    speed = 1;
  }
  else if (power > 50)
    speed = 5;
  
}

//--------------------------------------------------------------------






//-----------------------------------------


function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI );
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath()
 

  
}


    canvas.addEventListener('click', async function(event) {
     
      console.log("TEST")
        // Calculate direction towards mouse click
        let angle = Math.atan2(event.clientY - ball.y, event.clientX - ball.x);
        ball.dx = Math.cos(270* Math.PI / 180) * speed;
        ball.dy = -Math.sin(1 * Math.PI / 180) * speed;
       
        
        await sleep(1000);
        ball = {
        x: canvas.width/2,
        y: canvas.height -30,
        radius: 5,
        color: "green",
        dx: 0,
        dy: 0,};


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
    

    


// ----------------------------------------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function lineAnimation(){
  let loopChecker = 1;
  let bounce = 0;
  let angle = 90;

  while (loopChecker === 1){
    while(bounce === 0){
      if (angle > 270)
      {
        bounce++;
      }
      else{
        angle++;
        await sleep(speedOfMeter);
        line.style.transform = "rotate(" + angle +"deg)";
      }
    while(bounce === 1){
      if (angle < 90)
      {
        bounce--;

      }
      else{
        angle--
        await sleep(speedOfMeter);
        line.style.transform = "rotate(" + angle +"deg)";
      }
    }
    }

  }
  
}


