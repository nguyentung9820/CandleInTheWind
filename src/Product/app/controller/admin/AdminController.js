const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Product = require("../../models/Product")

class AdminController {

    // [GET] /
    product(req, res){
        Product.find({})
        .then(products => {
            res.render('templates/admin/product', { 
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
            res.redirect('/admin/product')       
        } catch (error) {
            res.send('fail')
        }        
    }
    
    deleteProduct(req, res, next){
        var param = req.params.id;
        Product.deleteOne({_id: param})
        .then(() => res.redirect('/admin/product'))
        .catch(next);
    }

    add(req, res){
        res.render('templates/admin/addproduct', { 
            layout: 'admin' 
        });
    
    }
    editProduct(req, res){
        var param = req.params.id;
        Product.find({_id: param})
        .then(products => {
            res.render('templates/admin/editproduct', { 
                products: mutipleMongooseToObject(products),
                layout: 'admin' 
            });
        })
    }
}



module.exports = new AdminController;