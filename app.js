const http = require('http');
const express = require('express');

const app = express();
app.use((req, res, next)=>{
    console.log('in the middleware');
    next(); //Allows the request to continue to te next middleware in line
})
app.use((req, res, next)=>{
    console.log('in another middleware');
    
    res.send('<h1>Hello from Express</h1>');
})


const server = http.createServer(app);

// http.createServer(rqListener);
server.listen(3000);
