"use strict"

const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const btn = document.querySelector("#btn");

btn.addEventListener("click", login);

function login(){
    if(!id.value) return alert("아이디를 입력해주세요");
    if(!pw.value) return alert("비밀번호를 입력해주세요");
    
    const data = {
        id : id.value,
        pw : pw.value,
    };

    fetch("/login",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((res) =>{
        if( res.success){
            location.href = '/';
        }else{
            if(res.err) return alert(res.err);
        }
    })
    .catch((err)=>{
        //console.error(new Error("로그인 중 에러 발생!"));  // console.error이나 new Error 둘중 하나만쓰면됨 

    });
}