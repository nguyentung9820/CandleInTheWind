const homeRouter = require('./store/home');
const productRouter = require('./store/product');
const adminRouter = require('./admin/admin');

function route(app) {

    app.use('/', homeRouter);
    app.use('/product', productRouter);
    app.use('/admin', adminRouter);

}

module.exports = route;