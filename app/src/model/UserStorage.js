"use static";


const fs = require('fs').promises;  // .promises를 붙혀줘야 밑에 readFile에서 Promise{ <pending> } 이 리턴됨 이후 .then으로 접근가능
                                    // <pending>은 아직 다 실행하지 못했다는뜻... 실행 다 못했는데 console을 찍어서그렇다.
//const { resolve } = require('path');



const db = require('../config/db.js');
const { rejects } = require('assert');

class UserStorage {
    static async getUserInfo(id) {
        const query = "SELECT ID as id, PW as pw FROM USERS WHERE ID=?;";
        return new Promise((resolve, reject)=>{
            db.query(query ,[id], (err,data)=>{
                if(err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }




    static async saveUser(userInfo) {
        const query = "INSERT INTO USERS (id, name, pw) VALUES (?,?,?);"
        return new Promise( (resolve, reject) =>{
            db.query(query, [userInfo.id, userInfo.name, userInfo.pw], (err,data)=>{
                if(err) reject(`${err}`);
                resolve({success:true});
            });
        });



        //const users = await this.getUsers(true);
        // await this.getUserInfo(userInfo.id);

        // if (users.id.includes(userInfo.id)) {
        //     throw "이미 존재하는 아이디입니다";
        // }
        // users.id.push(userInfo.id);
        // users.name.push(userInfo.name);
        // users.pw.push(userInfo.pw);

        // fs.writeFile("./src/db/users.json", JSON.stringify(users));
        // return { success: true };

    }
}







module.exports = UserStorage;