const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = module.exports = express();

const route = require('./routes/index');
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine','hbs');

app.set('views', path.join(__dirname, '/resources','views'));
app.use(express.static(path.join(__dirname,'/public')));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
route(app);