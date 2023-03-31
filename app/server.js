"user strict"

// 모듈
const express = require('express');
const app =  express();




// 라우팅
const home = require("./src/routes/home");

// 미들웨어를 등록해주는 메서드 ( app.METHOD 와 비슷?)  // 따라서 / 요청을 home경로로 돌려준다?
app.use('/', home);  
                   
//app.use(express.static(`${__dirname}/src/public`));


// 뷰 설정
app.set('views',__dirname + '/src/views');    
// ejs 뷰엔진
app.set('view engine', 'ejs');     


module.exports = app;








