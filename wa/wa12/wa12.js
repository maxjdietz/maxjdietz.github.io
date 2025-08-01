const newQuote = document.querySelector("#js-new-quote");
const answerBtn = document.querySelector("#js-tweet");

newQuote.addEventListener("click", getQuote);
answerBtn.addEventListener("click", displayAnswer);



// const endPoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
const url = 'https://api.weatherstack.com/current?access_key=a3ae167db0127ab838e4d5b73bf6a4c6&query=New Delhi';
const options = {
	method: 'GET'
};

let json = ""; //global variable NOOOOWWWW


// async function getQuote(){
//     const answerArea = document.querySelector("#js-answer-text");
//     answerArea.textContent = " ";
//     // console.log("testing getQuote");
//     try{
//         const response = await fetch(endPoint);
//         if (!response.ok){
//             throw Error(response.statusText);
//         }
//         json = await response.json();
//         // console.log(json.question);
//         displayQuote(json.location);

//     } catch (err){
//         console.log(err);
//         alert("Failed to fetch a new trivia question");
//     }

   
// }


async function getQuote(){
    console.log("test");
    try {
        const response = await fetch(url, options);
        if (!response.ok){
            throw Error(response.statusText);
        }
        json = await response.text();
        console.log(json);
    } catch (error) {
        console.error(error);
    }
}

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
function displayAnswer(){
    const answerText = json.answer;
    const answerArea = document.querySelector("#js-answer-text");
    answerArea.textContent = answerText;


}

getQuote()

// endpoint for API
