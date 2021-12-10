const checkoutRouter = require('./store/checkout');
const backendRouter = require('./admin/checkout');

function route(app) {

    app.use('/checkout', checkoutRouter);
    app.use('/payment', backendRouter);

}

module.exports = route;