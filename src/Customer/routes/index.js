const customerRouter = require('./store/customer');
const managementRouter = require('./admin/management');
const accountRouter = require('./store/account');
const signinRouter = require('./store/signin');
const profileRouter = require('./store/profile');
const logoutRouter = require('./store/logout');

function route(app) {

    app.use('/customer', customerRouter);
    app.use('/management', managementRouter);
    app.use('/signup', accountRouter);
    app.use('/signin', signinRouter);
    app.use('/profile', profileRouter);
    app.use('/logout', logoutRouter);


}

module.exports = route;