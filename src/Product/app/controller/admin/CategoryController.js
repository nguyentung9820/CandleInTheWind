const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Category = require("../../models/Category")
const Product = require("../../models/Product")

class CategoryController {

    // [GET] /
    category(req, res){
        Category.find({})
        .then(categories => {
            res.render('templates/admin/category', { 
                categories: mutipleMongooseToObject(categories),
                layout: 'admin' 
            });
        })
    }
    save(req, res){
        var body = req.body;
        var file = {category_image: req.file.filename}
        var data = Object.assign(body, file);

        try{
            var category = new Category(data);
            category.save();
            res.redirect('/admin/category')       
        } catch (error) {
            res.send('fail')
        }        
    }

    add(req, res){
        res.render('templates/admin/addcategory', { 
            layout: 'admin' 
        });
    
    }

}



module.exports = new CategoryController;