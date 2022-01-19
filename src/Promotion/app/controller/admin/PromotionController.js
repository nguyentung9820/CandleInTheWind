const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Promotion = require("../../models/Promotion")
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
    editPromotion(req, res){
        var param = req.params.id;
        Promotion.find({_id: param})
        .then(promotions => {
            res.render('templates/admin/editpromotion', { 
                promotions: mutipleMongooseToObject(promotions),
                layout: 'admin' 
            });
        })
    }
    //call this api ret %discount
    getDiscount(req, res) {
        
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
        data = req.body;
        Promotion.findOne({code:stringCode}).
        then(promotion => {
            promotion.qty -= 1;
            if(promotion.qty == 0){
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
        try{
            var promotion = new Promotion(body);
            promotion.save();
            res.redirect('/rule/promotion')       
        } catch (error) {
            res.send('fail')
        }              
    }
    
    update(req,res){
        var body = req.body;
        Promotion.updateOne({_id: req.params.id}, body)
            .then(() => res.redirect('/rule/promotion'))
        
    }

    deletePromotion(req, res, next){
        var param = req.params.id;
        Promotion.deleteOne({_id: param})
        .then(() => res.redirect('/rule/promotion'))
        .catch(next);
    }

    add(req, res){
        Promotion.find({})
        .then(promotions => {
            res.render('templates/admin/addpromotion', { 
                promotions: mutipleMongooseToObject(promotions),
                layout: 'admin' 
            });
        })   
    }

    rank(req, res){
        res.render('templates/admin/rank',{
            layout: 'admin' 
        })
    }

}

module.exports = new PromotionController;