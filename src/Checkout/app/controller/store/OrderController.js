const { json } = require("express");
const Order = require("../../models/Order");
const { mutipleMongooseToObject } = require('../../../util/mongoose')

class OrderController {

    // [GET] /
    order(req, res){
        Order.find({customer_id: req.cookies['customer']})
        .then(orders => {
            res.render('templates/store/order', { 
                orders: mutipleMongooseToObject(orders),
                layout: 'store' 
            });
        })      
    }
    viewOrder(req, res){
        Order.find({_id: req.params.id})
        .then(orders => {
            res.render('templates/store/vieworder', { 
                orders: mutipleMongooseToObject(orders),
                layout: 'store' 
            });
        })    
    }

}



module.exports = new OrderController;