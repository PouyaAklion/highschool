const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {mongoose} = require('./database/mongoose');
const {gloabl} = require('./middleware/global');
const {User} = require('./models/user');

const port = process.env.port || 3000;
var app = new express();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine','hbs');


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

const routes = require('./routes/web')(app);


app.listen(port, () => {
	console.log(`server is running on port ${port}`);
})