"use strict"

const User = require('../../model/User.js');


const views ={
    home : (req,res) =>{ res.render('home/index'); },
    login : (req,res) =>{ res.render('home/login'); },
};



const process ={
    login : (req, res) => {
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);
    },
};
 

// 모듈로 외부에서 접근가능하게 빼줌 
// { } 오브젝트는 키와 값인데 키만 넣으면 키와 똑같은 값이 있는것이랑 똑같다.
// { home : home , login : login }
module.exports = {
    views,
    process
};