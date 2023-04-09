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

    console.log(pw.value,confirmPw.value);
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
    //console.log(data);
    //console.log(JSON.stringify(data));




    // res의 반환값은 Response스트림인데 res.json()을 통해 읽을 수 있음
    // 이 res.json()의 리턴값은 Promise이다.
    // 이유는 데이터가 모두 읽을때까지 무작정 기다릴 수 없기때문에 비동기로 작동한다.
    // then은 이전함수가 완료되고나서 실행될 프로세서이다.
    // 따라서 res.json()이 완료되고나서 값을 출력해보면 원하는 값이 나온다.
    // 참고로 에러처리는 .catch(err)=>{  } 로 계속 함수끝에 이어서 처리하면된다.
    fetch("/register",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((res) =>{
        if( res.success){
            location.href = '/login';
        }else{
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.error(new Error("가입 중 에러 발생!"));  // console.error이나 new Error 둘중 하나만쓰면됨 
    });


    

    
}