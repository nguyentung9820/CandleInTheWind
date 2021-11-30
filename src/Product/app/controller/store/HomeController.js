const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Product = require("../../models/Product")
class HomeController {

    // [GET] /
    home(req, res){
        Product.find({})
        .then(products => {
            res.render('templates/store/home', { 
                products: mutipleMongooseToObject(products),
                layout: 'store.hbs' 
            });
        })
    }

}

module.exports = new HomeController;