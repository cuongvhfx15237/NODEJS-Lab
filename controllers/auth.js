const User = require('../models/user');
const bcrypt = require ('bcryptjs');
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: 
//     }
//   })
// )
const {validationResult} = require('express-validator')



exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length>0){
    message=message[0];
  }else {
    message = null
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length>0){
    message=message[0];
  }else {
    message = null
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
  }); 
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
    .then(user => {
      if(!user) {
        req.flash('error', 'Invalid email or Password.')
        return res.redirect('/login');
      }
      bcrypt
      .compare(password, user.password)
      .then(domatch => {
        if(domatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            res.redirect('/');
        })
        }
        req.flash('error', 'Invalid email or Password.')
        res.redirect('/login')
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login')
      })
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
    });
  }
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one!')
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12)
      .then(hasedPassword => {
      const user = new User({
        email: email,
        password: hasedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
    
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};
