const powerButton = document.querySelector("button");
const powerMeter = document.getElementById("meter");
const powerLevel = document.querySelector(".number");
const testButton = document.querySelector(".test");
const line = document.querySelector(".line");
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const phoneNumContainer = document.querySelector(".phoneNum")
const bgColorCanvas = "rgba(46, 190, 53, 1)";


const speed = 5;
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
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.font = "30px fantasy";
  ctx.textAlign = "center";
  
  ctx.fill();
     ctx.strokeStyle = "black";
    ctx.strokeText(phoneNum, goal.x , goal.y);
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
let ball = new Ball(250, 450, 0, 0, "red", 20);



function loop(){
  if (undraw === 1){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ball.velX = 0;
    ball.velY = 0 

    ball.x = 250;
    ball.y = 450;
    return;

  }
  else if((getDistance(ball.x, ball.y, goal.x, goal.y) < goal.radius)){
    ball.velX = 0;
    ball.velY =0;  
    ball.x = 250;
    ball.y = 450;
    phoneNumContainer.textContent = phoneNumContainer.textContent + phoneNum;

  }
  
 ctx.fillStyle = bgColorCanvas;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  goal.draw();
  ball.update();
 
  requestAnimationFrame(loop);

  
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
       await sleep(500);
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

// async function powerBar2(){
//   holdDown = true;
//   loopBar = 1;
   
//     //for moving up and back down
//     let increase = 0; //for height of red meter
//      //ms for sleep func
//     while (holdDown === true){
//       //checks each loop to see if holdUp basically
//       powerButton.addEventListener("mouseup", () => {
//         holdDown = false;
//         loopBar = 2;
//         powerLvlFunc(increase);
//         increase = 0;
//        console.log("2nd");
//         powerButton.removeEventListener('mousedown', powerBar);
      
//       }, { once: true });
      
   
//       //up
//       while(loopBar === 1){
  
//         await sleep(speedOfMeter);
//         powerMeter.style.height = increase + "%";
//         if (increase == 100){
//           console
//           loopBar--;
//         }
//         increase++;

//       }//down
//         while(loopBar === 0){

//         await sleep(speedOfMeter);
//         powerMeter.style.height = increase + "%";
//         if (increase == 0){
//           loopBar++;
//         }
//         increase--;
//       }

//     }
//     console.log("TESTSETSTESTE")
//     return;
    

// }
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
     phoneNum = 0;

  }
  else{
    
    powerLevel.textContent = powerString[0];
    phoneNum = Number(powerString[0]);
   
  
  }
  
  // setSpeed(powerString, power);
  lineAnimation();
  
 
  
  
  
   
}

// function setSpeed(powerString, power){
//   console.log(powerString);
//   if (power < 10){
//     speed = 10;
//     return;
//   }
//   if (power === 100){
//     speed = 4;
//     return;
//   }


//   switch(powerString[0]){
//     case "1": 
//       speed = 0.5;
//       break;
//     case "2": 
//       speed = 1;
//       break;
//     case "3": 
//       speed = 1.5;
//       break;
//     case "4": 
//       speed = 1.5;
//       break;
//     case "5": 
//       speed = 2;
//       break;
//     case "6": 
//       speed = 2.5;
//       break;
//     case "7": 
//       speed = 2.5;
//       break;
//     case "8": 
//       speed = 3;
//       break;
//     case "9": 
//       speed = 3.5;
//       break;

//   }
//   return;

  

// }

//--------------------------------------------------------------------

// function update(goal) {
 
      
//   // ctx.clearRect(20, 20, canvas.width, canvas.height); // Clear canvas
 
//   ball.x += ball.dx;
//   ball.y += ball.dy;


//         // Example: Bounce off walls (adjust as needed for your game logic)
//     if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
//             ball.dx *= -1;
//     }
//     if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
//             ball.dy *= -1;
//     }

//     drawBall(); // Redraw the ball
//     if(ballKill === 1){
//       ctx.clearRect(0, 0, canvas.width, canvas.height); 
//       return;
      
//     }
//     console.log("testing: " + ball)
//     requestAnimationFrame(update); // Continue the loop
//     }

    
// function drawBall(){
//   ctx.beginPath();
//   ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI );
//   ctx.fillStyle = ball.color;
//   ctx.fill();
//   ctx.closePath()
 

  
// }
    




//-----------------------------------------




    // canvas.addEventListener('click', async function(event) {
     
    //   console.log("TEST")
    //     // Calculate direction towards mouse click
    //     let angle = Math.atan2(event.clientY - ball.y, event.clientX - ball.x);
    //     ball.dx = Math.cos(180 * Math.PI / 180) * speed;
    //     ball.dy = -Math.sin(20 * Math.PI / 180) * speed;
       
        
    //     await sleep(1000);
    //     ball = {
    //     x: canvas.width/2,
    //     y: canvas.height -30,
    //     radius: 5,
    //     color: "green",
    //     dx: 0,
    //     dy: 0,};


    // });


    


// ----------------------------------------------------

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let angleAmount = 90;
let direction2 = 1;
let ballKill = 0;
let angleMax = 270;
let killSwitch2 = 0;

let goal = new Goals(0, 0, 50, "green", phoneNum);

function testingFunc(){
    goal.x = getRandomInteger();
  goal.y = getRandomInteger();
  undraw = 0;
  ball.draw();
  goal.draw();
  loop();
  line.style.visibility = "visible";
}

async function lineAnimation(){
  
  

  line.style.visibility = "visible";

  console.log("Pointer!")
  canvas.addEventListener('click', async function(event) {
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
    console.log("KILL SWTCIH 2")
        line.style.visibility = "hidden";
        await sleep(1000);
        undraw = 1;
        killSwitch = 0;
        killSwitch2 = 0;
        barHeight = 0;
        angleAmount  = 90;
        powerButton.addEventListener("mousedown", powerBar);
        
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

async function lineAnimation2(){
  goal.x = getRandomInteger();
  goal.y = getRandomInteger();
  undraw = 0;
  ball.draw();
  goal.draw();
  line.style.visibility = "visible";
  ballKill = 0;
  loopChecker = 1;
  bounce = 0;
  angle = 90;

  

   
  

  while (loopChecker === 1){
    
    canvas.addEventListener('click', async function(event) {

      console.log("TEST")
        // Calculate direction towards mouse click
        loop();
        let rad = (angle - 90) * Math.PI / 180;
        let dirX = -Math.cos(rad);
        let dirY = -Math.sin(rad);

        console.log( ball.velY);
        ball.velX = dirX * speed;
        ball.velY = dirY * speed;
        console.log( ball.velX);
        console.log( "speed: " + speed );
        

         line.style.visibility = "hidden";
        await sleep(1000);
        undraw = 1;
        ball.velX = 0;
        ball.velY = 0;
        
        ballKill = 1;
          bounce = 2;
        loopChecker = 2;
        killSwitch = 1;
        barHeight = 0;
        powerButton.addEventListener("mousedown", powerBar);
        
        


        
       
       


    }, { once: true });
    if (killSwitch2 === 1)

    while(bounce === 0){
      if (angle > 270)
      {
        bounce++;
      }
      else{
        angle++;
        await sleep(3);
        line.style.transform = "rotate(" + angle +"deg)";
      }
    while(bounce === 1){
      if (angle < 90)
      {
        bounce--;

      }
      else{
        angle--
        await sleep(3);
        
        line.style.transform = "rotate(" + angle +"deg)";
      }
    }
    }

  }
 

  console.log("HOLD IT")

 
 
 
  return;
  
}


