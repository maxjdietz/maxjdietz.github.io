const powerButton = document.querySelector("button");
const powerMeter = document.querySelector(".meter");
const powerLevel = document.querySelector(".number");

powerButton.addEventListener("mousedown", powerBar);

let holdChecker = false;






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
        await sleep(3);
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