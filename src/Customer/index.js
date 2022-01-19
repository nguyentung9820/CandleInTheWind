const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = module.exports = express();
const route = require('./routes/index');
// app.engine('hbs', handlebars({
//     extname: '.hbs'
// }));
const hbs = handlebars.create({
    extname: ".hbs",
    helpers:{
    if_eq: function(a, b, opts) {
        if (a == b) return opts.fn(this);
            else return opts.inverse(this);
        }
    }
});
app.engine(".hbs", hbs.engine);
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '/resources','views'));
app.use(express.static(path.join(__dirname,'/public')));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
route(app);