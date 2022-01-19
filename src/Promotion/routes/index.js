const promotionRouter = require('./admin/promotion');

function route(app) {

    app.use('/rule', promotionRouter);

}

module.exports = route;