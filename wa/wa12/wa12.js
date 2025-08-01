const search = document.querySelector("#searchButton");
const displayImg = document.querySelector(".display");
const breed = document.getElementById('customname');

console.log(breed.value);

search.addEventListener("click", getDog);



// const endPoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

const options = {
	method: 'GET'
};

let json = ""; //global variable NOOOOWWWW



function pageLoad(){
    
    const newImage = document.createElement("img");
    newImage.setAttribute('src',  "https://images.dog.ceo/breeds/hound-afghan/n02088094_1234.jpg");
    newImage.setAttribute('alt', "https://images.dog.ceo/breeds/hound-afghan/n02088094_1234.jpg");
    displayImg.src= newImage.src;
    displayImg.alt= newImage.src;
    
}



async function getDog(){
    let endPoint = "https://dog.ceo/api/breed/";
    let secLink = "/images/random"
    endPoint = endPoint + breed.value + secLink;

    console.log(endPoint);
    // const answerArea = document.querySelector("#js-answer-text");
    // answerArea.textContent = " ";
    // console.log("testing getQuote");
    try{
        const response = await fetch(endPoint);
        if (!response.ok){
            throw Error(response.statusText);
        }
        json = await response.json();
        // console.log(json.question);
        displayDog(json.message);

    } catch (err){
        console.log(err);
        alert("That dog breed doesn't exist, make sure you are not using spaces!");
    }

   
}
function displayDog(message){
    const newImage = document.createElement("img");
    newImage.setAttribute('src',  message);
    newImage.setAttribute('alt', message);
        displayImg.src= newImage.src;
    displayImg.alt= newImage.src;

}


// async function getQuote(){
//     console.log("test");
//     try {
//         const response = await fetch(endPoint);
//         if (!response.ok){
//             throw Error(response.statusText);
//         }
//         json = await response.json();
//         console.log(json.message);
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function getAnswer(){
//     try{
//         const response = await fetch(endPoint);
//         if (!response.ok){
//             throw Error(response.statusText);
//         }
//         const json = await response.json();
//         // console.log(json.question);
//         displayAnswer(json.answer);

//     } catch (err){
//         console.log(err);
//         alert("Failed to fetch trivia answer");
//     }

// }



function displayQuote(quote){
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;

}
// function displayAnswer(){
//     const answerText = json.answer;
//     const answerArea = document.querySelector("#js-answer-text");
//     answerArea.textContent = answerText;


// }

pageLoad();

// endpoint for API
