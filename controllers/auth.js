exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie').split(';')[req.get('Cookie').split(';').length -1].trim().split('=')[1]
    res.render('auth/Login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    req.isLoggedIn = true;
    res.setHeader('Set-Cookie', 'loggedIn=true')
    res.redirect('/')
    }
