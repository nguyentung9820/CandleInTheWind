const customerRouter = require('./store/customer');

function route(app) {

    app.use('/customer', customerRouter);
    
}

module.exports = route;