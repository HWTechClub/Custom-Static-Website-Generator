var port = process.env.PORT || 8004;

const bodyParser = require('body-parser');
const cors = require('cors');

//Express imports
const express = require('express');
const session = require('express-session');
const path = require('path');


//Usage of express
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

//Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//multipart form data



//Initialize session
app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

//For routes
require('./config/routes.js')(app);

app.listen(port);
console.log('The magic happens on port ' + port);

exports = module.exports = app;