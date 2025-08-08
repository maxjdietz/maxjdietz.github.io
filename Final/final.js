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
const bgColorCanvas = "rgba(121, 224, 131, 0.5)";


let speed = 5;
let digitCounter = 0;
const speedOfMeter = 3;
let loopBar = 1;
let holdDown = true;
let angle = 90;
let undraw = 0;
let phoneNum = 0;


function getRandomInteger() {
  min = Math.ceil(100); // Ensure min is an integer
  max = Math.floor(400); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// let ball = {
//     x: canvas.width/2,
//     y: canvas.height -30,
//     radius: 5,
//     color: "green",
//     dx: 0,
//     dy: 0
//   };


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
function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let ball = new Ball(250, 450, 0, 0, "red", 20);
let goal = new Goals(0, 0, 50, "green", phoneNum);
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


function loop(){
  if (undraw === 1){
    // ctx.clearRect(0, 0, canvas.width, canvas.height); 
    resetBall(0, 12)
    return;

  }
  for(i = 0; i < 10; i++){
    if((getDistance(ball.x, ball.y, goalsZeroNine[i].x, goalsZeroNine[i].y) < goalsZeroNine[i].radius)){
      resetBall(1, i);
      digitCounter++;
      if(digitCounter === 11)
      {
        alert("You have submitted the following phone number: " + phoneNumContainer.textContent);
        
      }
        return;
  }

}
if ((getDistance(ball.x, ball.y, goalsZeroNine[10].x, goalsZeroNine[10].y) < goalsZeroNine[10].radius)){

    phoneNumContainer.textContent = oldTextContent;
    resetBall(0, 10);

      return;
}

  
 
 
 ctx.fillStyle = bgColorCanvas;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  for (i = 0; i < 11; i++){
    goalsZeroNine[i].draw();
  }
  ball.update();
  console.log("FUCK")
 
  requestAnimationFrame(loop);

  
}
function resetBall(num, index){
  console.log("resetTEST")
  if (num === 1){
    oldTextContent = phoneNumContainer.textContent;
      phoneNumContainer.textContent = phoneNumContainer.textContent + goalsZeroNine[index].number;
  }
  if (index !== 12){
    goalsZeroNine[index].color = "red";
    goalsZeroNine[index].draw();
    

  }
        ball.velX = 0;
    ball.velY = 0 
 
    ball.x = 250;
    ball.y = 450;
    ball.draw();
    
   recharge.style.visibility = "hidden";
   powerButton.addEventListener("mousedown", powerBar);
   goalsZeroNine[index].color = "green";
    
}



//STEP1---------------------------------------------------------
powerButton.addEventListener("mousedown", powerBar); //hold down power button for power

 let barHeight = 0;
 let direction = 1;
 const animationSpeed = 3;
 const maxHeight = 100;
let killSwitch = 0;



async function powerBar(){
  
  powerButton.addEventListener("mouseup", () => {
    recharge.style.visibility = "visible";
     killSwitch = 1;
    console.log("power bar");
    powerButton.removeEventListener('mousedown', powerBar);

   
    
    console.log("HERE?")
    
    
    
      
    }, { once: true });
    if (killSwitch === 1)
    {
      console.log("OJK WHAT")
       powerLvlFunc(barHeight);
       testingFunc();
       
        powerMeter.style.height = 0 + "%";
      return;
    }
  barHeight += direction * animationSpeed;


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


let getDistance = function(x1, y1, x2, y2){
  var result = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
  return result;
}
// --------------------------------------------------------
//STEP 2---------------------------------------------------------
//assigns value 0-9 based off power level
function powerLvlFunc(power){
  let powerString = power.toString();
  if(power < 10){
     powerLevel.textContent = 0;
     

  }
  else{
    
    powerLevel.textContent = powerString[0];
    phoneNum = Number(powerString[0]);
   
  
  }
  
  setSpeed(powerString, power);
  lineAnimation();
  
 
  
  
  
   
}

function setSpeed(powerString, power){
  console.log(powerString);
  if (power < 10){
    speed = 1;
    return;
  }
  if (power === 100){
    speed = 7;
    return;
  }


  switch(powerString[0]){
    case "1": 
      speed = 1;
      break;
    case "2": 
      speed = 2;
      break;
    case "3": 
      speed = 3;
      break;
    case "4": 
      speed = 3;
      break;
    case "5": 
      speed = 4;
      break;
    case "6": 
      speed = 4;
      break;
    case "7": 
      speed = 5;
      break;
    case "8": 
      speed = 5;
      break;
    case "9": 
      speed = 6;
      break;

  }
  return;
}

  


    




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


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

async function lineAnimation(){
  
  

  line.style.visibility = "visible";

  console.log("Pointer!")
  fireButton.addEventListener('click', async function(event) {
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

