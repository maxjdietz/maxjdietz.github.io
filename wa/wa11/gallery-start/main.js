const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');
const  fullImg = document.querySelector('.full-img');
/* Declaring the array of image filenames */
const imgArr = ["images/image1.png","images/image2.png","images/image3.png","images/image4.png", "images/image5.png", "images/image6.png"];
let brightChecker = 0;



fullImg.addEventListener("mouseover", (event) => {

    hover();
});
/* Declaring the alternative text for each image file */
function displayImg(img){
    console.log(img);
   displayedImage.src = img.src;
    displayedImage.alt = img.alt;
    return;
}


function hover(){
    fullImg.style.top = "0px";
}



/* Looping through images */
for (i = 0; i < 6; i++){
    const newImage = document.createElement("img");
    newImage.setAttribute('src',  imgArr[i]);
    newImage.setAttribute('alt', imgArr[i]);
    thumbBar.appendChild(newImage);
    
    newImage.addEventListener("click", (event) => {
        displayImg(newImage);
    });
    console.log("1");
}


function lightDark(lightChecker){
    console.log(lightChecker);
    if (lightChecker === 0){
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        brightChecker++;
    }
    else{
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
        brightChecker--;

    }
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click",  (event) => {
        lightDark(brightChecker);
    });
