"use strict"

// import 역할 
const app = require('../server');   // ..은 상위폴더
const logger = require('../src/config/logger');

//const port = 7673;
const port = process.env.PORT || 7673;



app.listen(port, ()=>{
    logger.info(`${port} 포트 서버 가동!`);
});
