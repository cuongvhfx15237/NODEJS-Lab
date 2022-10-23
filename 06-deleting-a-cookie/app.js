const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://cuongvhfx15237:adminitration@cuongvhfx15237.k0pn0dz.mongodb.net/shop'

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret:'my secret', resave: false, saveUnitialized: false, store: store}))

app.use((req, res, next) => {
  User.findById("62f72b359a0975d5082d921e")
    .then(user => {
      req.user = user ;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes); // to controll reouter get login in router

app.use(errorController.get404);

mongoose
.connect(MONGODB_URI)
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