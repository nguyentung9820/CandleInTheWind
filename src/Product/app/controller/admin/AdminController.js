const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Product = require("../../models/Product")

class AdminController {

    // [GET] /
    admin(req, res){
        Product.find({})
        .then(products => {
            res.render('templates/admin/admin', { 
                products: mutipleMongooseToObject(products),
                layout: 'admin' 
            });
        })
    }

    save(req, res){
        var body = req.body;
        var file = {product_image: req.file.filename}
        var data = Object.assign(body, file);

        try{
            var product = new Product(data);
            product.save();
            res.redirect('/admin')       
        } catch (error) {
            res.send('fail')
        }        
    }
}



module.exports = new AdminController;