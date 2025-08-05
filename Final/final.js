const powerButton = document.querySelector("button");
const powerMeter = document.querySelector(".meter");

powerButton.addEventListener("click", powerBar);
let loopBar = 1;
let clickChecker = 0;





function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function powerBar(){
    console.log("test");
    let increase = 0;
    while(loopBar === 1){
       
        console.log(increase);
        await sleep(10);
        powerMeter.style.height = increase + "%";
        increase++;

    }
    

}