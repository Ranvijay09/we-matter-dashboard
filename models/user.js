const db = require('../util/database');

const bcrypt = require('bcryptjs');

module.exports = class User {
    constructor(user_id, name, email, pwd) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.pwd = pwd;
    }

    static find(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }

    static findById(id) {
        return db.execute('SELECT * FROM users WHERE user_id = ?', [id]);
    }

    static updatePwdById(id, pwd) {
        return db.execute('update users set pwd= ? WHERE user_id = ?', [pwd, id]);
    }

    static async addDefaultUser() {
        if (db.execute('SELECT * FROM users')) return;

        const hashedPassword = await bcrypt.hash('12345', 12);

        db.execute('INSERT INTO users (name, email, pwd) VALUES (?, ?, ?)',
            ['Vinod Pujari', 'vinod.pujari@spit.ac.in', hashedPassword]);
    }
};