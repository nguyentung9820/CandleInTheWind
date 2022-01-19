const { json } = require("express");
const Order = require("../../models/Order");
const { mutipleMongooseToObject } = require('../../../util/mongoose')

class CheckoutController {

    // [GET] /
    order(req, res){
        Order.find({invoice: "false"})
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
    deleteOrder(req,res, next){
        var param = req.params.id;
        Order.deleteOne({_id: param})
        .then(() => res.redirect('/payment/order'))
        .catch(next);
    }
    cancelOrder(req, res){
        Order.find({_id: req.params.id})
        .then(orders => {
            orders.forEach(data => {
                data.status = 'Canceled'
                Order.updateOne({_id: req.params.id}, data)
                .then(() => res.redirect('/payment/order'))
            })
        }) 
    }
    shipOrder(req, res){
        Order.find({_id: req.params.id})
        .then(orders => {
            orders.forEach(data => {
                data.status = 'Shipping'
                Order.updateOne({_id: req.params.id}, data)
                .then(() => res.redirect('/payment/order'))
            })
        }) 
    }
    invoice(req, res){
        Order.find({_id: req.params.id})
        .then(orders => {
            orders.forEach(data => {
                data.status = 'Done'
                data.invoice = "true"
                Order.updateOne({_id: req.params.id}, data)
                .then(() => res.redirect('/payment/order'))
            })
        }) 
    }
    viewInvoices(req, res){
        Order.find({status: "Done"})
        .then(orders => {
            res.render('templates/admin/invoice', { 
                orders: mutipleMongooseToObject(orders),
                layout: 'admin' 
            });
        })  
    }
}



module.exports = new CheckoutController;