"use strict"

const User = require('../../model/User.js');
const logger = require('../../config/logger.js');


const views ={
    home : (req,res) =>{ 
        logger.info(`GET "/" [200] : "홈화면으로 이동"`);
        res.render('home/index'); 
    },
    login : (req,res) =>{ 
        logger.info(`GET "/login" [200] : "로그인화면으로 이동"`);
        res.render('home/login'); 
    },
    register : (req, res) =>{ 
        logger.info(`GET "/register" [200] : "회원가입화면으로 이동"`);
        res.render('home/register'); 
    },
};


    ``
const process ={
    login :async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if(response.err)
            logger.error(`POST "/login" [200] : Response : "success: ${response.success}, err : ${response.err}"`);
        else 
            logger.info(`POST "/login" [200] : Response : "success: ${response.success}, msg : ${response.msg}"`);
        return res.json(response);   
    },

    register :async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if(response.err)
             logger.error(`POST "/register" [200] : Response : "success: ${response.success}, err : ${response.err}"`);
        else
            logger.info(`POST "/register" [200] : Response : "success: ${response.success}, msg : ${response.msg}"`);
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