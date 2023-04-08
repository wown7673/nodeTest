"use static";


const fs = require('fs').promises;  // .promises를 붙혀줘야 밑에 readFile에서 Promise{ <pending> } 이 리턴됨 이후 .then으로 접근가능
                                    // <pending>은 아직 다 실행하지 못했다는뜻... 실행 다 못했는데 console을 찍어서그렇다.

class UserStorage{

    // #을 붙혀 변수나 메서드를 private하게 만듬( 위치는 항상 최상단)
    static #getUserInfo(data, id){
        const users = JSON.parse(data);
        console.log(users);
        const idIdx = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce( (newUser, val)=>{
            newUser[val] = users[val][idIdx];
            return newUser;
        }, {}); 
        return userInfo;
    }


    static getUsers(...fields){
        //const users = this.#users;
        const newUsers = fields.reduce((newUsers, field)=>{
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers; 
        }, {});
        return newUsers;
    }




    static getUserInfo(id){
        return fs.readFile("./src/db/users.json")
            .then((data)=>{
                return this.#getUserInfo(data, id);
            })
            .catch(console.error); 
           // (err)=> console.err(err)   은 다음과 같이 생략가능   console.error
    }


 

    static saveUser(userInfo){
        //const users = this.#users;
        //users.id.push(userInfo.id);
        //users.name.push(userInfo.name);
        //users.pw.push(userInfo.pw);


        const data = "a";
        fs.writeFile("./src/db/user.json",data);
    
        //return {success:true};
    }
}







module.exports = UserStorage;