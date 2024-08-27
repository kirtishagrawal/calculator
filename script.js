let numArr = document.querySelectorAll(".num");
let operatorArr = document.querySelectorAll(".operator");
let plusMinusArr = document.querySelectorAll(".plusMinus");
let outputBox = document.querySelector("#output");
let equal = document.querySelector("#equal");
let clearBtn = document.querySelector("#clear");
let backspaceBtn = document.querySelector("#backspace");
let percentBtn = document.querySelector("#percent");
let bracketBtn = document.querySelector("#bracket");
let store = "";
let clickSound = new Audio();
clickSound.src = "click.mp3";

let equalSound = new Audio();
equalSound.src = "equal.mp3";

outputBox.disabled = true;





operatorArr.forEach(operatorBtn => {        // default operator disabled
    operatorBtn.disabled = true;
});

plusMinusArr.forEach(plusMinusBtn => {         // default plus and minus enabled
    plusMinusBtn.disabled = false;
})


operatorArr.forEach(operatorBtn => { //operator Button is clicked
    operatorBtn.addEventListener("click", () => {
        clickSound.play();                  // play click sound

        store = store + operatorBtn.innerText;
        outputBox.setAttribute("placeholder", store);

        operatorArr.forEach(operatorBtn2 => { // disable operators after one operator is clicked
            operatorBtn2.disabled = true;
        })


        equal.disabled = true; //disable equal Button
    })
})


numArr.forEach(numBtn => {  // num button is clicked


    numBtn.addEventListener("click", () => { // num button is clicked
        
        clickSound.play();                  // play click sound

        store = store + numBtn.innerText;
        outputBox.setAttribute("placeholder", store);


        operatorArr.forEach(operatorBtn => { // enable operators 
            operatorBtn.disabled = false;
        })


        equal.disabled = false; // enable equal Button
    })

})


clearBtn.addEventListener("click", () => { // all clear button is clicked

    clickSound.play();                  // play click sound

    outputBox.setAttribute("placeholder", "0"); // reset placeholder
    store = "";                                 // reset store

    operatorArr.forEach(operatorBtn => {        // disable operator buttons
        operatorBtn.disabled = true;
    })

    plusMinusArr.forEach(plusMinusBtn => {      // enable plus minus button
        plusMinusBtn.disabled = false;
    })

    equal.disabled = false;                     //enable equal Button

    numArr.forEach(numBtn => {              // enable number keys
        numBtn.disabled = false;
    })

    backspaceBtn.disabled = false;               // enable backspace

    bracketBtn.disabled = false;                 // enable bracket button
})


equal.addEventListener("click", () => {     //equal Button is Clicked


    if (store == "") {       // if no data is enterd by user placeholder will remain 0 even after the click of equal Button
        outputBox.setAttribute("placeholder", "0");
    }
    else {
        for (i = 0; i < store.length; i++) {        //% ke baad koi number aaye to wo * ho jaye
            for (j = 0; j < numArr.length; j++) {
                if (store[i] == "%" && store[i + 1] == numArr[j].innerText) {
                    store = store.replace("%", "/100*");
                }

                if (store[i] == numArr[j].innerText && store[i + 1] == "(") { //num ke baad ( aaye to * ho jaye
                    store = store.replace("(", "*(");
                }
            }

        }

        store = store.replace("%", "/100"); // to calculate percentage

        let result = eval(store);
        equalSound.play();                  // play equal sound
        let roundoffResult = Math.round(result * 1000) / 1000;
        

        if(roundoffResult>"999999999"){             // if the output is very large
            outputBox.setAttribute("placeholder", "Big Num.");      // show big num.

            numArr.forEach(numBtn => {              // disable number keys
                numBtn.disabled = true;
            })

            operatorArr.forEach(operatorBtn => {       // disable operator keys
                operatorBtn.disabled = true;
            })

            backspaceBtn.disabled = true;               // disable backspace

            equal.disabled = true;                      // disable equal button

            bracketBtn.disabled = true;                 // disable bracket button
        }
        else{
            roundoffResult = String(roundoffResult);
            outputBox.setAttribute("placeholder", roundoffResult);
            store = roundoffResult;
        }
        
    }

    equal.disabled = true;  //disable equal Btn for 2nd click simultaneously
})


percentBtn.addEventListener("click", () => { // percentBtn is clicked
    clickSound.play();                  // play click sound

    if (store[store.length-1]=="%"){
        equal.disabled = false;
    }
})


bracketBtn.addEventListener("click", () => { // bracket button is clicked
    clickSound.play();                  // play click sound

    if (store[store.length - 1] != ")" && store[store.length - 1] != "(") { // no bracket is at last of store
        store = store + "(";
        outputBox.setAttribute("placeholder", store);

        operatorArr.forEach(operatorBtn => {
            operatorBtn.disabled = true;
           });

        plusMinusArr.forEach(plusMinusBtn => {         // plus and minus enabled
            plusMinusBtn.disabled = false;
        })


    }
    else {                                                                  // brackets are present at last of store
        if (store[store.length - 1] == "(") {                               // ( is present at last of store
            store = store.slice(0, store.length - 1);
            store = store + ")";
            outputBox.setAttribute("placeholder", store);

            numArr.forEach(numBtn => {
                numBtn.disabled = false;
            })

            operatorArr.forEach(operatorBtn => {
                operatorBtn.disabled = true;
               });

            plusMinusArr.forEach(plusMinusBtn => {         // plus and minus enabled
                plusMinusBtn.disabled = false;
            })
        }
        else if (store[store.length - 1] == ")") {                          // ) is present at last of store
            store = store.slice(0, store.length - 1);
            store = store + "(";
            outputBox.setAttribute("placeholder", store);

            numArr.forEach(numBtn => {
                numBtn.disabled = false;
            })

           operatorArr.forEach(operatorBtn => {
            operatorBtn.disabled = false;
           });
        }
        
    }
})


backspaceBtn.addEventListener("click", () => {      // backspace button is clicked
    clickSound.play();                  // play click sound
    
    store = store.slice(0, store.length - 1); //erase last character of store

    if (store == "") {
        outputBox.setAttribute("placeholder", "0");

        operatorArr.forEach(operatorBtn => {
            operatorBtn.disabled = true;
        });

        plusMinusArr.forEach(plusMinusBtn => {
            plusMinusBtn.disabled = false;
        });
    }
    else {                                          // store is not empty
        outputBox.setAttribute("placeholder", store);



        for (i = 0; i < numArr.length; i++) {           // if last string is a number enable equal and operator buttons
            if (store[store.length - 1] == numArr[i].innerText) { 

                operatorArr.forEach(operatorBtn => {
                    operatorBtn.disabled = false;
                })

                equal.disabled = false;

                i = numArr.length;

            }
            else {

                operatorArr.forEach(operatorBtn => {
                    operatorBtn.disabled = true;
                })

                equal.disabled = true;


            }
        }
    }





})
