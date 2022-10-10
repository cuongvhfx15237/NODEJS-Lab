exports.getLogin = (req, res, next) => {
    res.render('auth/Login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    req.isLoggedIn = true
   res.redirect('/')
    }
