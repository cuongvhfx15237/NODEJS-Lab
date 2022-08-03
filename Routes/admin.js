const path = require('path')

const express=require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];
// /admin.add-product => get
router.get('/add-product',(req, res, next)=>{

    res.render('add-product', 
    {
        pageTitle: 'Add Products', 
        path: '/admin/add-producrt',
        formCSS: true, 
        product: true,
        activeProduct: true,
        productCSS: true,
        activeAddProduct: true
    });
    
});

// /admin/add-product => post
router.post('/add-product', (req, res, next)=>{
    products.push({
        title: req.body.title
    })
    res.redirect('/');
})


exports.routes = router;
exports.products = products;