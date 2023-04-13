"use strict"


const id = document.querySelector("#id");
const name1 = document.querySelector("#name");
const pw = document.querySelector("#pw");
const confirmPw = document.querySelector("#confirm-pw");
const btn = document.querySelector("#btn");


btn.addEventListener("click", register);

function register(e){

    //if() 필수입력값 체크..
    if(!id.value){
        return alert("아이디가 비어있음");
    }

    //console.log(pw.value,confirmPw.value);
    if(pw.value != confirmPw.value){
        
        return alert("비밀번호가 일치하지 않음");
    }


    e.preventDefault();
    const data = {
        id : id.value,
        name : name1.value,
        pw : pw.value,
        confirmPw : confirmPw.value,
    };

    fetch("/register",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((resData) =>{ 
        if( resData.success){
            location.href = '/login';
        }else{
            alert(resData.msg);
        }
    })
    .catch((err)=>{
        console.error(new Error("가입 중 에러 발생!"));  // console.error이나 new Error 둘중 하나만쓰면됨 
    });

} 