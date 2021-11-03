// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Customer = require("../../models/Blog")
class CustomerBlogController {

    // [GET] /
    homepage(req,res)
    {
        res.render('templates/store/customerblog');
    }
}



module.exports = new CustomerBlogController;