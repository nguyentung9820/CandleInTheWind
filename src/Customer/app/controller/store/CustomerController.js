// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
// const Product = require("../../models/Product")
class CustomerController {

    // [GET] /
    customer(req, res){
        res.render('templates/store/customer')
    }

}



module.exports = new CustomerController;