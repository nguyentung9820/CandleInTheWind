const express = require('express')
const app = express();
const port = 9220;
const path = require('path');

const morgan = require('morgan');
app.use(morgan('combined'));
app.use(express.urlencoded());

const Product = require('./Product/index');
const Customer = require('./Customer/index');
const Checkout = require('./Checkout/index');
const Promotion = require('./Promotion/index');
const Blog = require('./Blog/index');
app.use(Product)
app.use(Customer)
app.use(Checkout)
app.use(Promotion)
app.use(Blog)

const db = require('./Config/database');
db.connect();
app.listen(port, () => console.log(`Connect http://localhost:${port}`));
