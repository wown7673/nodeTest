"use static";


const fs = require('fs').promises;  // .promises를 붙혀줘야 밑에 readFile에서 Promise{ <pending> } 이 리턴됨 이후 .then으로 접근가능
// <pending>은 아직 다 실행하지 못했다는뜻... 실행 다 못했는데 console을 찍어서그렇다.

class UserStorage {

    // #을 붙혀 변수나 메서드를 private하게 만듬( 위치는 항상 최상단)
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        console.log(users);
        const idIdx = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, val) => {
            newUser[val] = users[val][idIdx];
            return newUser;
        }, {});
        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUsers(isAll, ...fields) {
        //const users = this.#users;
        return fs.readFile("./src/db/users.json")
            .then((data) => {
                return this.#getUsers(data, isAll, fields);
            })
            .catch(console.error);
    }




    static getUserInfo(id) {
        return fs.readFile("./src/db/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch(console.error);
        // (err)=> console.err(err)   은 다음과 같이 생략가능   console.error
    }




    static async saveUser(userInfo) {
        const users = await this.getUsers(true);

        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.pw.push(userInfo.pw);

        fs.writeFile("./src/db/users.json", JSON.stringify(users));
        return { success: true };

    }
}







module.exports = UserStorage;