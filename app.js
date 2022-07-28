const http = require('http');
const express = require('express');

const app = express();
app.use('/', (req, res, next)=>{
    console.log('This always runs!')
    next();
})

app.use('/add-product',(req, res, next)=>{
    console.log('in another middleware');
    res.send('<h1>the "add product" Page</h1>');

})
app.use('/',(req, res, next)=>{
    console.log('in another middleware');
    res.send('<h1>Hello from Express</h1>');
})


const server = http.createServer(app);

// http.createServer(rqListener);
server.listen(3000);
