const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Product = require("../../models/Product")
class ProductController {

    // [GET] /
    detail(req, res){
        var param = req.params.sku;
        Product.find({product_sku: param})
        .then(products => {
            res.render('templates/store/detail', { 
                products: mutipleMongooseToObject(products),
                layout: 'store.hbs' 
            });
        })
    }

}



module.exports = new ProductController;