//Time Js
const timeLive = document.querySelector(".calculator-time-live");
let date = new Date();
timeLive.innerHTML = `${
  date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}${
  date.getHours() > 12 ? " PM" : " AM"
}`;

//Calculator Js
let input = document.querySelector(".calculator-result");
let buttons = document.querySelectorAll("button");
let output = "";
let array = Array.from(buttons);

array.forEach((button) => {
  button.addEventListener("click", (e) => {
    let inner = e.target.innerHTML;
    if (inner == "=") {
      try {
        output = output.split("");
        while (output[0] == "0") {
          output.shift();
        }
        output = output.join("");
        output = Function("return " + output)();
        input.innerHTML = isNaN(output) ? "Invalid Input" : output;
      } catch (error) {
        input.innerHTML = "Invalid Input";
      }
    } else if (inner == "AC") {
      output = "";
      input.innerHTML = "";
    } else if (inner == "C") {
      output = output.substring(0, output.length - 1);
      if (output == "") {
        input.innerHTML = "";
        return 0;
      }
      input.innerHTML = output;
    } else {
      output += inner;
      input.innerHTML = output;
    }
  });
});

//Dark Mode Js
let themeBtn = document.querySelector(".theme-btn");
let themeBtnImg = document.querySelector("#theme-img");
let container = document.querySelector(".container");
let calculatorBtns = document.querySelector(".calculator-btns");
let fillPath = document.querySelectorAll("path");

themeBtn.addEventListener("click", () => {
  container.classList.toggle("dark");
  calculatorBtns.classList.toggle("dark2");

  if (container.classList.contains("dark")) {
    for (let i = 0; i < fillPath.length; i++) {
      fillPath[i].setAttribute("fill", "#fff");
    }
    themeBtnImg.src = "img/vector2.png";
    // themeBtnImg.setAttribute('src', 'img/vector2.png'); //another way to change attribute value
  } else {
    for (let i = 0; i < fillPath.length; i++) {
      fillPath[i].setAttribute("fill", "#000");
    }
    themeBtnImg.src = "img/Vector.png";
    // themeBtnImg.setAttribute('src', 'img/Vector.png'); //another way to change attribute value
  }

  //Set mode From local storage while refreshing.previous selected mood will be shown
  if (container.classList.contains("dark")) {
    localStorage.setItem("Dark", true);
    localStorage.removeItem("Normal");
  } else {
    localStorage.setItem("Normal", true);
    localStorage.removeItem("Dark");
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("Dark")) {
    container.classList.add("dark");
    calculatorBtns.classList.toggle("dark2");
    for (let i = 0; i < fillPath.length; i++) {
      fillPath[i].setAttribute("fill", "#fff");
    }
    themeBtnImg.src = "img/vector2.png";
  }
});
