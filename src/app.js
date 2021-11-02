const express = require('express')
const app = express();
const port = 9220;
const path = require('path');

const morgan = require('morgan');
app.use(morgan('combined'));
app.use(express.urlencoded());

const Product = require('./Product/index');
const Customer = require('./Customer/index');
app.use(Product)
app.use(Customer)

const db = require('./Config/database');
db.connect();
app.listen(port, () => console.log(`Connect http://localhost:${port}`));