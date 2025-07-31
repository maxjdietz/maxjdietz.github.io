const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgArr = ["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg", "images/pic5.jpg"];
let brightChecker = 0;

/* Declaring the alternative text for each image file */
function displayImg(img){
    console.log(img);
   displayedImage.src = img.src;
    displayedImage.alt = img.alt;
    return;
}



/* Looping through images */
for (i = 0; i < 5; i++){
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
