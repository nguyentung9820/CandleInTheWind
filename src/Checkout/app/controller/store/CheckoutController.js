const { json } = require("express");
const Order = require("../../models/Order")
class CheckoutController {

    // [GET] /
    payment(req, res){
        res.render('templates/store/payment', { 
            layout: 'store' 
        });    
    }
    placeOrder(req, res){
        var body = req.body;
            try{
                var order = new Order(body);
                order.save();
                res.redirect('/')       
            } catch (error) {
                res.send('fail')
            }  
    }
}



module.exports = new CheckoutController;