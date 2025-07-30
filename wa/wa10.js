const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland",
"the White House"];
let insertZ = ["spontaneously combusted",
"melted into a puddle on the sidewalk",
"turned into a slug and crawled away"];

// let newStory = storyText;

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

function storyTextFunc(x, y, z, name, weight, temperature, uk){
   
  let storyText = "It was 94 fahrenheit outside, so " + x + " went for a walk. When they got to " + y + " they stared in horror for a few moments, then " + z + ". " + name + " saw the whole thing, but was not surprised — " + x + " weighs 300 pounds, and it was a hot day.";

  if (uk === 1){
      storyText = "It was " + temperature + " centigrade outside, so " + x + " went for a walk. When they got to" + y + "they stared in horror for a few moments, then " + z + ". " + name + " saw the whole thing, but was not surprised — " + x + " weighs "+ weight + " stone, and it was a hot day.";

    }

  return storyText;

}

// function covert(stone, centi){
//     let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";


// }
randomize.addEventListener('click', result);

function result() {
    console.log("test");

  
  let weight = 300;
  let temperature = 94;

  let name = "Bob";
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);
  
  let newStory = storyTextFunc(xItem, yItem, zItem,name, weight, temperature, 0);
  


  if(customName.value !== '' ) {
    name = customName.value;
    newStory = storyTextFunc(xItem, yItem, zItem, name, 0);
    

  }
  else{
        newStory = storyTextFunc(xItem, yItem, zItem, "Bob", 0);
        print("Bob Test")
        

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14);
    const temperature =  Math.round((94-32)/1.8);
    newStory = storyTextFunc(xItem, yItem, zItem, name, weight, temperature, 1);

  }
  console.log(name);


  story.textContent = newStory;
  story.style.visibility = 'visible';
}
