const customerRouter = require('./store/customer');
const managementRouter = require('./admin/management');

function route(app) {

    app.use('/customer', customerRouter);
    app.use('/management', managementRouter)
}

module.exports = route;