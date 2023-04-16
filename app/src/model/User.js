"use strict";

const UserStorage = require('./UserStorage');
const logger = require('../config/logger');


class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            const { id, pw } = await UserStorage.getUserInfo(client.id);
            if (id) {
                if (id === client.id && pw === client.pw) {
                    return { success: true };
                } else {
                    return { success: false, msg: "비밀번호가 틀렸습니다!" };
                }
            }
            return { success: false, msg: "존재하지 않는 아이디입니다!" };
        } catch (err) {
            return { success: false, err };
        }
    }


    async register() {
        const client = this.body;
        //const signUpinfo = {id : body.id, name : body.name1, pw : body.pw, confirmPw : body.confirmPw};
        try {
            const response = await UserStorage.saveUser(client);
            return response;
        } catch (err) {
            return { success: false, err }
        }
    }
}

module.exports = User;