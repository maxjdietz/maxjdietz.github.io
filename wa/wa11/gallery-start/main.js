const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgArr = ["images/pic1.jpg","images/pic2.jpg","images/pic3.jpg","images/pic4.jpg", "images/pic5.jpg"];

/* Declaring the alternative text for each image file */
function displayImg(img){
    console.log(img);
   displayedImage.src = img.src;
    displayedImage.setAttribute('alt', img);
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

/* Wiring up the Darken/Lighten button */
