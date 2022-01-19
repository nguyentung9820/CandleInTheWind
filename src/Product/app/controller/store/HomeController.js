const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Product = require("../../models/Product")
const Category = require("../../models/Category")
const ChildCategory = require("../../models/ChildCategory")
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

    productPerCategory(req, res){
        var param = req.params.category;
        Category.find({product_category: param})
        .then(categories =>{
            categories.forEach(element => {
                ChildCategory.find({parent: element._id})
                .then(childCategories => {
                    childCategories.forEach(
                        child => {
                            Product.find({product_type: child.child_category})
                            .then(products => {
                                res.render('templates/store/home', { 
                                    products: mutipleMongooseToObject(products),
                                    layout: 'store.hbs' 
                                });
                            })
                        }
                    )

                })
            })
        })
    }

}



module.exports = new HomeController;