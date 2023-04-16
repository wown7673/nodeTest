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
                if(err){ reject(`${err}`); }
                else resolve(data[0]);     
            });
        });
    }

    static async saveUser(userInfo) {
        const query = "INSERT INTO USERS (id, name, pw) VALUES (?,?,?);"
        return new Promise( (resolve, reject) =>{
            db.query(query, [userInfo.id, userInfo.name, userInfo.pw], (err,data)=>{
 
                if(err) {
                    if(err.errno === 1062){   // 1062 : ER_DUP_ENTRY
                        reject("아이디가 중복 되었습니다");
                    }
                    reject(`${err}`);
                } else resolve({success:true, msg:`${userInfo.id} 가입완료!`});
            });
        });   
    }
}

module.exports = UserStorage;