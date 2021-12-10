const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Category = require("../../models/Category")
const ChildCategory = require("../../models/ChildCategory")

class CategoryController {

    temp(res,req) {
        res.json('abc')
    }
    //Category
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
    update(req,res){
        var body = req.body;
        if(req.file != null){
            var file = {category_image: req.file.filename}
        }else{
            var file = {category_image: req.body.last_image}
        }
        var data = Object.assign(body, file);
        if(req.params.id != null){
            Category.updateOne({_id: req.params.id}, data)
            .then(() => res.redirect('/admin/category'))
        }
    }
    add(req, res){
        res.render('templates/admin/addcategory', { 
            layout: 'admin' 
        });
    
    }
    deleteCategory(req, res, next){
        var param = req.params.id;
        Category.deleteOne({_id: param})
        .then(() => res.redirect('/admin/category'))
        .catch(next);
    }

    async editCategory(req, res, next){
        var param = req.params.id;
        await Category.find({_id: param})
        .then(categories => {
            res.render('templates/admin/editcategory', { 
                categories: mutipleMongooseToObject(categories),
                layout: 'admin' 
            });
        })
    }



    // Child category
    childCategory(req, res){
        ChildCategory.find({parent: req.params.id})
        .then(childcategories => {
            res.render('templates/admin/childcategory', { 
                childcategories: mutipleMongooseToObject(childcategories),
                child: req.params.id,
                layout: 'admin' 
            });
        })
    }

    addchild(req, res){
        res.render('templates/admin/addchildcategory', { 
            parent: req.params.id,
            layout: 'admin' 
        });
    
    }
    saveChild(req, res){
        var body = req.body;
        try{
            var category = new ChildCategory(body);
            category.save();
            res.redirect('/admin/category')       
        } catch (error) {
            res.send('fail')
        }        
    }
    deleteChild(req, res, next){
        var param = req.params.id;
        ChildCategory.deleteOne({_id: param})
        .then(() => res.redirect('/admin/category'))
        .catch(next);
    }

}



module.exports = new CategoryController;