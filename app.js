const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

// http.createServer(rqListener);
server.listen(3000);
