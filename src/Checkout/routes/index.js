const checkoutRouter = require('./store/checkout');
const backendRouter = require('./admin/checkout');
const orderRouter = require('./store/order');

function route(app) {

    app.use('/checkout', checkoutRouter);
    app.use('/payment', backendRouter);
    app.use('/order', orderRouter);

}

module.exports = route;