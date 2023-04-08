"use strict";

const UserStorage = require('./UserStorage');

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        //const { id, pw } = UserStorage.getUserInfo(client.id);
        //console.log(client.id); 
        const { id, pw } = await UserStorage.getUserInfo(client.id);
        //console.log(aa);
        if (id) {
            if (id === client.id && pw === client.pw) {
                return { success: true };
            } else {
                return { success: false, msg: "비밀번호가 틀렸습니다!" };
            }
        }
        return { success: false, msg: "존재하지 않는 아이디입니다!" };
    }


    register(){
        const client = this.body;
        //const signUpinfo = {id : body.id, name : body.name1, pw : body.pw, confirmPw : body.confirmPw};
        const response = UserStorage.saveUser(client);
        return response;
    }
}

module.exports = User;