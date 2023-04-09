"use strict"



const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const btn = document.querySelector("#btn");

//console.log(id);
//console.log('hello');

btn.addEventListener("click", login);

function login(){
    //console.log(123);
    const data = {
        id : id.value,
        pw : pw.value,
    };
    //console.log(data);
    //console.log(JSON.stringify(data));




    // res의 반환값은 Response스트림인데 res.json()을 통해 읽을 수 있음
    // 이 res.json()의 리턴값은 Promise이다.
    // 이유는 데이터가 모두 읽을때까지 무작정 기다릴 수 없기때문에 비동기로 작동한다.
    // then은 이전함수가 완료되고나서 실행될 프로세서이다.
    // 따라서 res.json()이 완료되고나서 값을 출력해보면 원하는 값이 나온다.
    // 참고로 에러처리는 .catch(err)=>{  } 로 계속 함수끝에 이어서 처리하면된다.
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
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.error(new Error("로그인 중 에러 발생!"));  // console.error이나 new Error 둘중 하나만쓰면됨 
    });


    

    
}