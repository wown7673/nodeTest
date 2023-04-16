"use strict"

const User = require('../../model/User.js');
const logger = require('../../config/logger.js');


const views ={
    home : (req,res) =>{ 
        logger.info(`GET "/" [304] : "홈화면으로 이동"`);
        res.render('home/index'); 
    },
    login : (req,res) =>{ 
        logger.info(`GET "/login" [304] : "로그인화면으로 이동"`);
        res.render('home/login'); 
    },
    register : (req, res) =>{ 
        logger.info(`GET "/register" [304] : "회원가입화면으로 이동"`);
        res.render('home/register'); 
    },
};



const process ={
    login :async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        const url ={
            method : "POST",
            url : "/login",
            status : response.err ? "400" : "200",  // 상태코드는 대충한거임... 상황에따라 다른 상태코드를 반환해야함
        }

        log(response, url);

        return res.status(url.status).json(response);   
    },

    register :async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        const url ={
            method : "POST",
            url : "/login",
            status : response.err ? "500" : "201", // 상태코드는 대충한거임... 상황에따라 다른 상태코드를 반환해야함
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
};


// 모듈로 외부에서 접근가능하게 빼줌 
// { } 오브젝트는 키와 값인데 키만 넣으면 키와 똑같은 값이 있는것이랑 똑같다.
// { home : home , login : login }
module.exports = {
    views,
    process
};


const log = (response ,url) =>{
    if(response.err){
        logger.error(`${url.method} "${url.url}" [${url.status}] : ${response.success}, err : ${response.err || ""}"`);
    }else{ 
        logger.info(`${url.method} "${url.url}" [${url.status}] : ${response.success}, msg : ${response.msg || ""}"`);
    }
};