"user strict"

//====== 모듈 ==============//
const express = require('express');
//const bodyParser = require("body-parser"); // -> express 내장으로 바뀜!
const app =  express();
const dotenv = require('dotenv');
dotenv.config();

// 라우팅
const home = require("./src/routes/home");


//======== express 미들웨어 ==============//

app.use(express.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({extended: true}));

// 미들웨어를 등록해주는 메서드 ( app.METHOD 와 비슷?)  // 따라서 / 요청을 home경로로 돌려준다?
app.use('/', home);  

    
// 정적파일들은 아래 경로를 기본 경로로 설정함
app.use(express.static(__dirname+'/src/public'));  
//app.use(express.static('public'));  


// 뷰 설정
app.set('views',__dirname + '/src/views');    
// ejs 뷰엔진
app.set('view engine', 'ejs');     


module.exports = app;






 

