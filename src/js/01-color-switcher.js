// // var throttle = require('lodash.throttle');

// const startButtn = document.querySelector(".button[data-start]");
// const stopButtn = document.querySelector(".button[data-stop]");

// startButtn.addEventListener("click", changeColor);

// function changeColor() {
//     const newColor = getRandomHexColor();

//     document.querySelector("body").style.backgroundColor = newColor;
    
// }


// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

const startButtn = document.querySelector("button[data-start]");
const stopButtn = document.querySelector("button[data-stop]");

let timer = null;

startButtn.addEventListener("click", () => {
    startButtn.disabled = true;
    stopButtn.disabled = false;
    timer = setInterval(changeColor, 1000);
});
stopButtn.addEventListener("click", () => {
    clearInterval(timer);
    startButtn.disabled = false;
    stopButtn.disabled = true;
});

function changeColor() {
    document.querySelector("body").style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


