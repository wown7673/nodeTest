"use strict"

// import 역할 
const app = require('../server');   // ..은 상위폴더

const port = 7673;

app.listen(port, ()=>{
    console.log("서버가동");
});
