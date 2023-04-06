"use strict"

// const home(req,res){
//     res.render('home/index');
// }

// DB 대신...
const users ={
     id : ['111','222','333'],
     pw : ['7673','7674','7675'],

    //idPw : {'111':'7673', '222':'7674', '333':'7675'}
};

const views ={
    home : (req,res) =>{ res.render('home/index'); },
    login : (req,res) =>{ res.render('home/login'); },
};

const process ={
    login : (req, res) => {
        const id = req.body.id;
        const pw = req.body.pw;
        
        if( users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(pw == users.pw[idx]){
                return res.json({
                    success : true
                });
            }
        }
       return res.json({
        success :false,
        message : "로그인 실패"
       });
    },
};
 

// 모듈로 외부에서 접근가능하게 빼줌 
// { } 오브젝트는 키와 값인데 키만 넣으면 키와 똑같은 값이 있는것이랑 똑같다.
// { home : home , login : login }
module.exports = {
    views,
    process
};