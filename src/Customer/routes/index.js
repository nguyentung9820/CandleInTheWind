const customerRouter = require('./store/customer');
const managementRouter = require('./admin/management');
const accountRouter = require('./store/account');

function route(app) {

    app.use('/customer', customerRouter);
    app.use('/management', managementRouter);
    app.use('/signup', accountRouter);

}

module.exports = route;