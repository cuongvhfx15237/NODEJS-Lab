const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
    construc(username, email) {
        this.name = username;
        this.email = email;
    }
    save() {
        const db = getDb();
        return db.collection('users').insertIOne(this);
    }
    static findById(userId) {
        const db = getDb();
        return db.collection('users')
        .findOne({_id: new mongodb.ObjectId(userId) })
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => { console.log(err)})
    }
}

module.exports = User;