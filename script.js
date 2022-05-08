//Keys

const key = new Map([["a", "ai"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"]]);

const mayus = "[A-Z]";

const diactrics = "[áéíóú]";

const misc = "[!#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~0123456789]";


//Variables 

//Input-Outputs
let text = document.getElementById("msg");

let response = document.getElementById("rsp");

//Hideable
let img = document.getElementById("no-msg");

let noMsg = document.getElementById("no-message");

let btnCopy = document.getElementById("copy");

//Misc
let myName = document.getElementById("name");

const warn = document.getElementById("warn");



//Functions

//Encrypt/Decrypt

function encrypt(msgOr){
    let msgEN = "";
    for(i=0; i<msgOr.length; i++){
        if (key.has(msgOr.charAt(i))){
            msgEN = msgEN + key.get(msgOr.charAt(i));
        }
        else {
            msgEN = msgEN + msgOr.charAt(i)
        }
    }
    return msgEN
}

function decrypt(msg){
    let msgDE = msg;
    for (let [letter,strings] of key) {
        let srch = new RegExp (strings, "g")
        msgDE = msgDE.replaceAll(srch, letter);
    }
    
    return msgDE;
}


//Validation of input

function checkInvalid(){
    let keysM = new RegExp (mayus, "g");
    let keysD = new RegExp (diactrics, "g");
    let keysC = new RegExp (misc, "g");
    let checkValue = keysM.test(text.value) || keysD.test(text.value) || keysC.test(text.value);
    return checkValue
}

function hide(){
    if(text.value !== ""){
        response.style.display = "initial";
        img.style.display = "none";
        noMsg.style.display = "none";
        btnCopy.style.display = "initial"
        response.style.verticalAlign = "center";
    }
    if(text.value == ""){
        response.style.display = "none";
        btnCopy.style.display = "none";
        img.style.display = "initial";
        noMsg.style.display = "initial";
    }
}

//Button functions
function returnEN(){
    if (checkInvalid()){
        response.value = "";
        alert(warn.innerText);
    }
    else{
        hide();
        response.value = encrypt(text.value);
    }
}

function returnDE(){
    hide();
    response.value = decrypt(text.value);
}

function copy(){
    navigator.clipboard.writeText(response.value);
    response.select();
}


//Bonus
function getColor(){
    const keys = '0123456789ABCDEF';
    let color = "#";
    for(let i=0; i<6; i++){
        color = color + keys.charAt(Math.floor(Math.random() * keys.length));
    }
    return color
}


myName.addEventListener("mouseover", function(){
    let color = getColor()
    this.style.textShadow = "0px 0px 10px "+ color;
})

myName.addEventListener("mouseout", function(){
    this.style.textShadow = null;
})