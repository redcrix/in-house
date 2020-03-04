const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);

const config = require('./config/config.js');
mongoose.Promise = global.Promise;
require('./api/routes/api.routes')
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

require('./api/routes/api.routes')(app, passport);

app.get('/', function(req, res){
    res.send("Hello World");
});

server.listen(process.env.PORT || config.serverport, function(){
console.log('server is working');
});