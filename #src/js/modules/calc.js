 // Calc

 function calc() {
    let weight, height, age, sex, ratio, resultCalc;




    function initLocalStorageSettings(selector, activeClass) {
       const elements = document.querySelectorAll(selector);

       elements.forEach(elem => {
          elem.classList.remove(activeClass);

          // id for sex param
          if (elem.getAttribute("id") === localStorage.getItem("sex")) {
             elem.classList.add(activeClass);
          }

          //data-ratio for ratio param
          if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
             elem.classList.add(activeClass);
          }
       })
    };

    function checkLocalStorageCalc() {

       if (localStorage.getItem("sex")) {
          sex = localStorage.getItem("sex");
       } else {
          sex = "female";
          localStorage.setItem("sex", "female")
       }

       if (localStorage.getItem("ratio")) {
          ratio = localStorage.getItem("ratio");
       } else {
          ratio = 1.375
          localStorage.setItem("ratio", 1.375)
       }
    };


    function calcGetSex(selector, activeClass) {
       const elements = document.querySelectorAll(selector);

       elements.forEach(elem => {
          elem.addEventListener("click", (e) => {
             sex = e.target.getAttribute("id");
             localStorage.setItem("sex", sex);
             elements.forEach(elem => elem.classList.remove(activeClass));
             elem.classList.add(activeClass);
             calcResult();
          })
       })

    };


    function calcGetInputs(selector) {
       const inputs = document.querySelectorAll(selector);

       inputs.forEach(input => {

          input.addEventListener("input", () => {
             if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red"
             } else {
                input.style.border = "none"
             }

             switch (input.getAttribute("id")) {
                case "height":
                   height = +input.value;
                   localStorage.setItem("height", height);
                   break;
                case "weight":
                   weight = +input.value;
                   localStorage.setItem("weight", weight);
                   break;
                case "age":
                   age = +input.value;
                   localStorage.setItem("age", age);
                   break;
             }

             calcResult();
          })
       })
    };


    function calcGetRatio(selector, activeClass) {
       const elements = document.querySelectorAll(selector);

       elements.forEach(elem => {
          elem.addEventListener("click", (e) => {
             ratio = e.target.getAttribute("data-ratio");
             localStorage.setItem("ratio", ratio)
             elements.forEach(elem => elem.classList.remove(activeClass));
             elem.classList.add(activeClass);
             calcResult();
          })
       })
    };


    function calcResult() {
       if (sex && height && age && ratio && weight) {
          if (sex === "male") {
             resultCalc = Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
          } else if (sex === "female") {
             resultCalc = Math.round(ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
          }
       } else {
          resultCalc = "----";

       }

       document.querySelector(".calculating__result span").textContent = resultCalc;
    };


    checkLocalStorageCalc();
    initLocalStorageSettings(".calculating__choose div", "calculating__choose-item_active");
    initLocalStorageSettings(".calculating__choose_big div", "calculating__choose-item_active");
    calcGetSex("#gender div", "calculating__choose-item_active")
    calcGetInputs(".calculating__choose_medium input")
    calcGetRatio(".calculating__choose_big div", "calculating__choose-item_active")
 }



 export default calc;


