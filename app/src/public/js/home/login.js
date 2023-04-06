"use strict"



const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const btn = document.querySelector("#btn");

console.log(id);
console.log('hello');

btn.addEventListener("click", login);

function login(){
    const data = {
        id : id.value,
        pw : pw.value,
    };
    
    console.log(JSON.stringify(data));

    fetch("/login",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    });


    
}