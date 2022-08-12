const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("62f5a4fde3e920d2f578354a")
    .then(user => {
      req.user = user ;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://cuongvhfx15237:adminitration@cuongvhfx15237.k0pn0dz.mongodb.net/shop?retryWrites=true&w=majority')
.then( result => {
  User.findOne()
  .then(user =>{
    if (!user) {
      const user = new User({
        name: 'Cuong',
        email: 'cuongvhfx@funix.edu.vn',
        cart: {
          items: []
        }
      })
      user.save();
    }
  })
  console.log('Connect: !!!!')
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})