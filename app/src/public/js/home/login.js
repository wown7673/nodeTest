"use strict"



const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const btn = document.querySelector("#btn");

console.log(id);
console.log('hello');

btn.addEventListener("click", login);

function login(){
    const req = {
        id : id.value,
        pw : pw.value,
    };
    console.log(req);

    
}