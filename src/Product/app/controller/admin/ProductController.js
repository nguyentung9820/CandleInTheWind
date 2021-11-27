const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Product = require("../../models/Product")
const Category = require("../../models/ChildCategory")
const { mongooseToObject } = require('../../../util/mongoose')

class ProductController {

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
    update(req,res){
        var body = req.body;
        var file = {product_image: req.file.filename}
        var data = Object.assign(body, file);
        if(req.params.id != null){
            Product.updateOne({_id: req.params.id}, data)
            .then(() => res.redirect('/admin/product'))
        }
    }
    deleteProduct(req, res, next){
        var param = req.params.id;
        Product.deleteOne({_id: param})
        .then(() => res.redirect('/admin/product'))
        .catch(next);
    }

    add(req, res){
        Category.find({})
        .then(categories => {
            res.render('templates/admin/addproduct', { 
                categories: mutipleMongooseToObject(categories),
                layout: 'admin' 
            });
        })   
    }


    async editProduct(req, res, next){
        var param = req.params.id;
        var category = [];
    
        await Category.find({})
            .then(categories => {
                    categories = mutipleMongooseToObject(categories)
                    category = [...categories]
                }
            ).catch(next)
        await Product.find({_id: param})
        .then(products => {
            res.render('templates/admin/editproduct', { 
                products: mutipleMongooseToObject(products),
                categories: category,
                layout: 'admin' 
            });
        })
    }
}



module.exports = new ProductController;