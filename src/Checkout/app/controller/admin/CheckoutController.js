const { json } = require("express");
const Order = require("../../models/Order");
const { mutipleMongooseToObject } = require('../../../util/mongoose')

class CheckoutController {

    // [GET] /
    order(req, res){
        Order.find({})
        .then(orders => {
            res.render('templates/admin/order', { 
                orders: mutipleMongooseToObject(orders),
                layout: 'admin' 
            });
        })      
    }
    viewOrder(req, res){
        Order.find({_id: req.params.id})
        .then(orders => {
            res.render('templates/admin/vieworder', { 
                orders: mutipleMongooseToObject(orders),
                layout: 'admin' 
            });
        })    
    }

}



module.exports = new CheckoutController;