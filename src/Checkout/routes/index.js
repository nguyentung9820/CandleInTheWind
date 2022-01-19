const checkoutRouter = require('./store/checkout');
const backendRouter = require('./admin/checkout');
const orderRouter = require('./store/order');
const invoiceRouter = require('./admin/invoice');

function route(app) {

    app.use('/checkout', checkoutRouter);
    app.use('/payment', backendRouter);
    app.use('/order', orderRouter);
    app.use('/invoice', invoiceRouter);

}

module.exports = route;