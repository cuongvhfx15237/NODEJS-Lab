const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
    construc(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; //{item: []} <- create item in user
        this._id = id;
    }
    save() {
        const db = getDb();
        return db.collection('users').insertIOne(this);
    }

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp.id === product._id
        // })
        const updatedCart = { item: [{...product, quantity: 1}]};
        const db = getDb();
        return db.collection('users')
        .updateOne(
            {_id: new ObjectId(this._id)}, 
            {$set: {cart: updatedCart}}
            );
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