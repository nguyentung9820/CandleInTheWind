const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Product = require("../../models/Product")
const Category = require("../../models/ChildCategory")
const AttributeSet = require("../../models/AttributeSet")
const Attribute = require("../../models/Attribute")

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
        console.log(req.body);

        if(req.file != null){
            var file = {product_image: req.file.filename}
        }else {
            file = {product_image: req.body.last_image}
        }
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
            AttributeSet.find({})
            .then(attributeSets =>{
                Attribute.find({})
                .then(attributes => {
                    res.render('templates/admin/addproduct', { 
                        categories: mutipleMongooseToObject(categories),
                        attributeSets: mutipleMongooseToObject(attributeSets),
                        attributes: mutipleMongooseToObject(attributes),
                        layout: 'admin' 
                    });  
                })              
            })
            
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
            AttributeSet.find({_id: products[0].attribute_set})
            .then(attributeSets => {
                Attribute.find({attributeset: products[0].attribute_set})
                .then(attributes => {
                    res.render('templates/admin/editproduct', { 
                        products: mutipleMongooseToObject(products),
                        categories: category,
                        attributesets: mutipleMongooseToObject(attributeSets),
                        attributes: mutipleMongooseToObject(attributes),
                        layout: 'admin' 
                    });
                }) 
            })
        })
    }
}



module.exports = new ProductController;