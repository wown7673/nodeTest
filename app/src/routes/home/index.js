"use strict";

const express = require('express');
const router = express.Router();

// 현재 이 index.js가 있는 동일 디렉토리에 home.ctrl 파일
const ctrl = require("./home.ctrl");


router.get('/', ctrl.views.home);
router.get('/login', ctrl.views.login);
router.get('/register', ctrl.views.register);
router.post('/login', ctrl.process.login);


// 외부에서 접근가능하게 빼줌
module.exports = router;




