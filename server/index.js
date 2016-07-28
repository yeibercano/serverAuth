const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB setup
// mongoose.connect('mongodb://localhost:auth/auth');
//mongoose connection
mongoose.connect('mongodb://protected:123@ds031835.mlab.com:31835/protected'); 

app.use(cors());
//App setup
app.use(morgan('combined'));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);