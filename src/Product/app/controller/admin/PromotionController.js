const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Promotion = require("../../models/Promotion")
const Category = require("../../models/ChildCategory")
const { mongooseToObject } = require('../../../util/mongoose')
const Product = require("../../models/Product")

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

    //call this api ret %discount
    getProductCode(req, res) {
        
        if(req.params.code != null){
            Promotion.findOne({code: req.params.code}).
            then((promotion) =>{
                var discount = promotion.promotion_discount;
                var productId = promotion.product_id;
                res.json({product_id : productId, promotion_discount : discount, code : promotion.code});
            })   
        }

    }
    
    //when buy process in server. call desByCode to --available
    desByCode(stringCode){
        Promotion.findOne({code:stringCode}).
        then(promotion => {
            promotion.available -= 1;
            if(promotion.available == 0){
                //delete
                Promotion.deleteOne({_id: promotion._id})
                .then(() => res.json({available : 0}))
            }else{
                //update
                Promotion.updateOne({_id: req.params.Promotionid}, data)
                .then(() => res.json({available : promotion.available}))
            }
        })
    }

    save(req, res){
        var body = req.body;
        let stringcode = (Math.random() + 1).toString(36).substring(7);
        var codeP = {code : stringcode};
        var data = Object.assign(body,codeP);
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
            Promotion.updateOne({_id: req.params.Promotionid}, data)
            .then(() => res.redirect('/admin/promotion'))
        }
    }

    deletePromotion(req, res, next){
        var param = req.params.Promotionid;
        Promotion.deleteOne({_id: param})
        .then(() => res.redirect('/admin/promotion'))
        .catch(next);
    }

    async add(req, res){
        var product_name;
        await Product.find({_id: req.params.id}).
            then(product =>{
                product_name = product.product_name;
            })
        await Category.find({})
        .then(categories => {
            res.render('templates/admin/addpromotion', { 
                categories: mutipleMongooseToObject(categories),
                product_name:product_name,
                layout: 'admin' 
            });
        })   
    }

    async editPromotion(req, res, next){
        var param = req.params.Promotionid;
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