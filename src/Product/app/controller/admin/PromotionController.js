const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Promotion = require("../../models/Promotion")
const Category = require("../../models/ChildCategory")
const { mongooseToObject } = require('../../../util/mongoose')

class PromotionController {
	// [GET] /
    promotion(req, res){
        Promotion.find({})
        .then(promotions => {
            res.render('templates/admin/promotion', { 
                promotions: mutipleMongooseToObject(promotions),
                layout: 'admin' 
            });
        })
    }

    getByProductId(req, res) {
        var data = Object.assign(body);
        if(req.params.id != null){
            Promotions.findOne({_id: req.params.id}, data)
            .then(() => res.redirect('/admin/promotion'))
        }
    }

    save(req, res){
        var body = req.body;
        var data = Object.assign(body);
            try{
                var promotion = new Promotion(data);
                promotion.save();
                res.redirect('/admin/promotion')       
            } catch (error) {
                res.send('fail')
            }              
    }
    
    update(req,res){
        var body = req.body;
        var data = Object.assign(body);
        if(req.params.id != null){
            Promotions.updateOne({_id: req.params.id}, data)
            .then(() => res.redirect('/admin/promotion'))
        }
    }
    deletePromotion(req, res, next){
        var param = req.params.id;
        Promotion.deleteOne({_id: param})
        .then(() => res.redirect('/admin/promotion'))
        .catch(next);
    }

    add(req, res){
        Category.find({})
        .then(categories => {
            res.render('templates/admin/addpromotion', { 
                categories: mutipleMongooseToObject(categories),
                layout: 'admin' 
            });
        })   
    }

    async editPromotion(req, res, next){
        var param = req.params.id;
        var category = [];
    
        await Category.find({})
            .then(categories => {
                    categories = mutipleMongooseToObject(categories)
                    category = categories
                }
            ).catch(next)
        await Promotion.find({_id: param})
        .then(promotions => {
            res.render('templates/admin/editpromotion', { 
                promotions: mutipleMongooseToObject(promotions),
                categories: category,
                layout: 'admin' 
            });
        })
    }
}

module.exports = new PromotionController;