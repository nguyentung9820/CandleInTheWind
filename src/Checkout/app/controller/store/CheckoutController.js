const { json } = require("express");
const Order = require("../../models/Order");
const Promotion = require("../../../../Promotion/app/models/Promotion");
const Product = require("../../../../Product/app/models/Product");
const Customer = require("../../../../Customer/app/models/Customer");


class CheckoutController {

    // [GET] /
    payment(req, res){
        res.render('templates/store/payment', { 
            layout: 'store' 
        });    
    }
    async placeOrder(req, res){
        var body = req.body;
        var qty_per_product = body.qty_per_product
        var array = body.products.split(",")
        var product_array = [];
        var reward_points = 0;
        var i =0;
        var customer = {customer_id: req.cookies['customer']};
        for(i; i< array.length ; i++){
            product_array.push([array[i], array[i+1], array[i+2], array[i+3], array[i+4], array[i+5]])
            i += 5;
        }
        var coupon = req.body.coupon_code;
        var discount_number;
        try{
            await Promotion.findOne({code: coupon})
            .then((discounts) => {
                discount_number = discounts.promotion_discount;
            })
            
        } catch (error) {
            discount_number = 0;
        }  
        try{
            product_array.forEach(id => {
                Product.findOne({_id: id[0]})
                .then(products => {
                    console.log(qty_per_product)
                    qty_per_product.split(',').forEach(datas => {
                        if(products.point != null){
                            array = datas.split(".")
                            if(array[0] == id[0]){
                                reward_points += array[1]*products.point
                                console.log(reward_points)
                            }
                        }
                    })
                })
            })
            Customer.findOne({_id: req.cookies['customer']})
            .then(result => {
                if(result.point == null){
                    result.point = 0
                }
                var point_result = {point: (result.point + reward_points)};
                var data = Object.assign(result, point_result); 
                Customer.updateOne({_id: req.cookies['customer']}, data)
                .then(() => console.log('updated'))
            })

        } catch (error) {
            console.log('fail to save')
            reward_points = 0;
        }  
        var product = {product_list: product_array};
        var discount_amount = {discount: discount_number};
        var real_total = req.body.bill_total*(1-(discount_number/100))
        var last_total = {last_total: real_total.toFixed(2)}
        var money = req.body.bill_total - real_total.toFixed(2);
        var discount_money = {money_discount: money.toFixed(2)};
        var data = Object.assign(body, product, discount_amount, last_total, discount_money, customer); 
        try{
            var order = new Order(data);
            order.save();
            res.clearCookie("checkout");

            res.redirect('/')       
        } catch (error) {
            res.send('fail')
        }   
    }
}



module.exports = new CheckoutController;