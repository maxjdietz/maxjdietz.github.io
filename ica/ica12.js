const newQuote = document.querySelector("#js-new-quote");
const answerBtn = document.querySelector("#js-tweet");

newQuote.addEventListener("click", getQuote);
answerBtn.addEventListener("click", displayAnswer);



const endPoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
let json = ""; //global variable NOOOOWWWW


async function getQuote(){
    const answerArea = document.querySelector("#js-answer-text");
    answerArea.textContent = " ";
    // console.log("testing getQuote");
    try{
        const response = await fetch(endPoint);
        if (!response.ok){
            throw Error(response.statusText);
        }
        json = await response.json();
        // console.log(json.question);
        displayQuote(json.question);

    } catch (err){
        console.log(err);
        alert("Failed to fetch a new trivia question");
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
