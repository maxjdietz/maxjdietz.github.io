const powerButton = document.querySelector("button");
const powerMeter = document.getElementById("meter");
const powerLevel = document.querySelector(".number");
const testButton = document.querySelector(".test");
const fireButton = document.getElementById("Fire");
const line = document.querySelector(".line");
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const recharge = document.getElementById("charging");
const phoneNumContainer = document.querySelector(".phoneNum")
const bgColorCanvas = "rgba(151, 226, 158, 0.5)";
const submitButton = document.getElementById("Submit");
const resetButton = document.getElementById("Reset");
const startButton = document.getElementById("Start");
const gameScreen = document.getElementById("gameScreen");
phoneNumContainer.textContent = "Input Your Phone Number!";


startButton.style.backgroundColor = "gold";

//many initializers 
let speed = 5; //ball
let digitCounter = 0; //phone number digit
const speedOfMeter = 3; //afraid to touch honestly


let angle = 90; 
let undraw = 0; //canvas edge case
let phoneNum = 0; 



//------------------RANDOM INT----------------------
function getRandomInteger() {
  min = Math.ceil(100); // Ensure min is an integer
  max = Math.floor(400); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;


  //used like once
  function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
//Used for collisions
let getDistance = function(x1, y1, x2, y2){
  var result = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
  return result;
}
//-------------------------------------------------------

//initalized event listeners, ONLY THESE TWO WHEN STARTING
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);


//3 Side Button Functions


function resetGame(){
  window.location.reload();
}

//Enables other buttons, starts the entire game, can only click once
function startGame(){
  
  startButton.removeEventListener("click", startGame) 
 
  startButton.style.backgroundColor = "white";
  phoneNumContainer.textContent = "";
  canvas.style.backgroundColor = "black";
  gameScreen.style.color = "white";
//---------------------------------------
//ORDER PROPERLY
  submitButton.addEventListener("click", submitFunc);
  gameScreen.textContent = "Hold down POWER BUTTON!";
  powerButton.addEventListener("mousedown", powerBar);

}
//DISABLES ALL BUTTONS WHEN CONFIRMED EXECEPT RESET!!!
function submitFunc(){
  
  if (digitCounter === 10){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gameScreen.style.lineHeight = "75px";
    resetButton.style.backgroundColor = "gold";
    powerButton.disabled = true;
    fireButton.disabled = true;
    startButton.disabled = true;
    submitButton.disabled = true;
    gameScreen.textContent = "You have inputted the following valid phone number: " + phoneNumContainer.textContent.slice(0, 3) + "-" + phoneNumContainer.textContent.slice(3, 6) +  "-" + phoneNumContainer.textContent.slice(6, 10) + ". Press Reset to Play Again!";
  }
  else
    alert("Invalid Phone Number!");
}

//GOAL CLASS-------------------------------------------------
class Goals{
  constructor(x, y , radius, color, number){
   this.x = x;
   this.y = y;
   this.radius = radius;
   this.color = color;
   this.number = number;
  }
  draw(){
   
  
   // Black shadow with 70% opacity

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.font = "25px fantasy";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    
    ctx.fill();
     ctx.strokeStyle = "rbga(0 0 0 0)";
     
    ctx.strokeText(this.number, this.x , this.y);
    ctx.fillStyle = "white";
    ctx.fillText(this.number, this.x , this.y);
    ctx.stroke();
  }

}
//---------------------------------------------------


//BALL CLASS--------------------------------------------------------
class Ball{
  constructor(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
    draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
    }
    update(){
      //collisions with da walls
      if(this.x + this.size >= canvas.width){
        this.velX = -this.velX;
        }
      if(this.x - this.size <= 0){
      this.velX = -this.velX;
      }
      if(this.y + this.size >= canvas.height){
      this.velY = -this.velY;
      }
      if(this.y - this.size <= 0){
      this.velY = -this.velY;
      }
      this.x += this.velX;
      this.y += this.velY;
      }
}
//---------------------------------------------------------------------






//initializers for bug testing and im also afraid to remove them
let ball = new Ball(250, 450, 0, 0, "red", 20);
let goal = new Goals(0, 0, 50, "green", phoneNum);
//----------------------------------

// GOAL INITIALIZERS + COORDS
let loopGoal = 0;
const goalsZeroNine = [];
const goalsXCoords = [50, 125, 100, 175, 150, 325, 400, 375, 450, 350]
const goalsYCoords = [360, 200, 80, 80, 475, 80, 80, 200, 360, 475]

while (goalsZeroNine.length < 10){
  const size = 35;
  const goalss = new Goals(
  goalsXCoords[loopGoal],
  goalsYCoords[loopGoal],
  size,
  "green",
  loopGoal
  );
  loopGoal++;
  goalsZeroNine.push(goalss);
  console.log("INITIALIZING");
}
let backspace = new Goals(250, 50, 50, "grey", "delete");
goalsZeroNine.push(backspace);

let oldTextContent = phoneNumContainer.textContent;



//STUPID-------------------------------------------------
function loop(){
  //edge case
  if (undraw === 1){
    resetBall(0, 12)
    return;

  }
  //checks for goal collisions
  for(i = 0; i < 10; i++){
    if((getDistance(ball.x, ball.y, goalsZeroNine[i].x, goalsZeroNine[i].y) < goalsZeroNine[i].radius)){
      if (digitCounter == 10){
      alert("Invalid Phone Number, character limit exceeded!");
      resetBall(0, 12);//too many numbers!
      }
      else{
        digitCounter++;
        resetBall(1, i);
      }
    return;
  }
}
// checks if backspace goal (anotha edge case basically)
if ((getDistance(ball.x, ball.y, goalsZeroNine[10].x, goalsZeroNine[10].y) < goalsZeroNine[10].radius)){

     let newNum = phoneNumContainer.textContent.slice(0,phoneNumContainer.textContent.length-1);
     phoneNumContainer.textContent = newNum;
     if (digitCounter === 0){
      digitCounter = 0;
     }
     else{
      digitCounter--;
     }
  
    resetBall(0, 12);
      return;
}
 ctx.fillStyle = bgColorCanvas;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  for (i = 0; i < 11; i++){
    goalsZeroNine[i].draw();
  }
  ball.update();
  
  requestAnimationFrame(loop);

}

//resets ball and colors correspondant to object ball interacts with
async function resetBall(num, index){
  
  if (num === 1){
    console.log("resetTEST")
    
      phoneNumContainer.textContent = phoneNumContainer.textContent + goalsZeroNine[index].number;
  }
  if (index !== 12){
    goalsZeroNine[index].color = "red";
    goalsZeroNine[index].draw();
    goalsZeroNine[index].color = "green";
    

  }
  else{
    console.log("TEST")
    goalsZeroNine[10].color = "red";
    goalsZeroNine[10].draw();
    goalsZeroNine[10].color = "grey";
  
  }
    ball.velX = 0;
    ball.velY = 0 
    ball.x = 250;
    ball.y = 450;
    ball.draw();
    await sleep(1000);
   recharge.style.visibility = "hidden";
    
   powerButton.addEventListener("mousedown", powerBar);

}





 //some animation initializers
 let barHeight = 0;
 let direction = 1;
 const animationSpeed = 3;
 const maxHeight = 100;
let killSwitch = 0;


//FUCK ASS POWER BAR CAUSED ALL OF MY EARLY STRUGGLES
//animated powerBar and sends signals and power levels accordingly
async function powerBar(){
  gameScreen.style.color = "white";
  gameScreen.textContent = ""
  
  powerButton.addEventListener("mouseup", () => {
    fireButton.style.backgroundColor = "rgb(135, 9, 9)";
    fireButton.style.color = "white";
    recharge.style.visibility = "visible";
     killSwitch = 1;
    console.log("power bar");
    fireButton.disabled = false;
    powerButton.removeEventListener('mousedown', powerBar);

   
    
    console.log("HERE?")
    
    
    
      
    }, { once: true });
    if (killSwitch === 1)
    {
       powerLvlFunc(barHeight);
       testingFunc();
       
        powerMeter.style.height = 0 + "%";
      return;
    }
  barHeight += direction * animationSpeed;

powerLevel.textContent = barHeight + "%";
  if (barHeight >= maxHeight){
    barHeight = maxHeight;
    direction = -1;
  }
  else if (barHeight <= 0){
    barHeight = 0;
    direction = 1;
  }
  powerMeter.style.height = barHeight + "%";
  
  requestAnimationFrame(powerBar);
  
}
//STUPID----------------------------------------


// --------------------------------------------------------
//STEP 2---------------------------------------------------------
//assigns power bar percentage and sets speed + leads to animation of angle line
function powerLvlFunc(power){
  let powerString = power.toString();
  if(power < 10){
     powerLevel.textContent = barHeight + "%";
    
  }
  else{
    
    powerLevel.textContent = barHeight + "%";
    phoneNum = Number(powerString[0]);
   
  
  }
  
  setSpeed(powerString, power);
  lineAnimation();
  
 
  
  
  
   
}
//SETS SPEED RELATIVE TO POWER BAR 
function setSpeed(powerString, power){
  
//takes first digit as string and sets according, edge cases for < 10 and 100
  if (power < 10){
    speed = 2;
    return;
  }
  if (power === 100){
    speed = 10;
    return;
  }
  switch(powerString[0]){
    case "1": 
      speed = 3;
      break;
    case "2": 
      speed = 4;
      break;
    case "3": 
      speed = 4;
      break;
    case "4": 
      speed = 5;
      break;
    case "5": 
      speed = 6;
      break;
    case "6": 
      speed = 7;
      break;
    case "7": 
      speed = 7;
      break;
    case "8": 
      speed = 8;
      break;
    case "9": 
      speed = 9;
      break;

  }
  return;
}

  


    




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//animation Initializers
let angleAmount = 90;
let direction2 = 1;
let ballKill = 0;
let angleMax = 270;
let killSwitch2 = 0;



function testingFunc(){
  for(const goalss of goalsZeroNine){
    //   goal.x = getRandomInteger();
    // goal.y = getRandomInteger();
    goalss.draw();
    console.log("TESTING GOAL LOOP");
  }
  undraw = 0;
  ball.draw();
  
  loop();
  
}
//another pain in the ass, animates the line angle!
async function lineAnimation(){
  
  

  line.style.visibility = "visible";

  console.log("Pointer!")
  fireButton.addEventListener('click', async function(event) {
    fireButton.style.backgroundColor = "black";
    fireButton.style.color ="rgb(79, 71, 71)";
    fireButton.disabled = true;
           killSwitch2 = 1;
        let rad = (angleAmount - 90) * Math.PI / 180;
        let dirX = -Math.cos(rad);
        let dirY = -Math.sin(rad);

        console.log( ball.velY);
        ball.velX = dirX * speed;
        ball.velY = dirY * speed;
        console.log( ball.velX);
        console.log( "speed: " + speed );
        
        
        console.log("HIDDEN");


        
   
        

  }, {once: true});
   if (killSwitch2 === 1){
    console.log("KILL SWITCH 2")
        line.style.visibility = "hidden";
        
        await sleep(1000);
        undraw = 1;
        killSwitch = 0;
        killSwitch2 = 0;
        barHeight = 0;
        angleAmount  = 90;
       
        
        
    return;
   }
   console.log("deeptest")
  angleAmount += direction2 * animationSpeed;


  if (angleAmount >= angleMax){
    angleAmount = angleMax;
    direction2 = -1;
  }
  else if (angleAmount <= 90){
    angleAmount = 90;
    direction2 = 1;
  }
  line.style.transform = "rotate(" + angleAmount +"deg)";
  console.log(angleAmount);
  requestAnimationFrame(lineAnimation);

}
//:D
