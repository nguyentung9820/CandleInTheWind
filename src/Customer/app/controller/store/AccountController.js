const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Customer = require("../../models/Customer")
const Order = require("../../../../Checkout/app/models/Order")

class AccountController {

    // [GET] /
    signup(req, res){
        var body = req.body;
            try{
                var customer = new Customer(body);
                customer.save();
                res.redirect('/')       
            } catch (error) {
                res.send('fail')
            }      
        }
    async signin(req, res){
        var email = req.body.email;
        var pass = req.body.password;
        try{
            Customer.findOne({email: email, password: pass})
            .then(customers => {
                res.cookie('customer', customers._id)
                res.redirect('/')

            })  
        } catch (error){
            res.redirect('/')
        }     
    }
    profile(req,res){
        const auth = req.cookies['customer'];
        if(auth != ''){
            Customer.find({_id: auth})
            .then(customers => {
                Order.find({customer_id: auth})
                .then(orders =>{
                    res.render('templates/store/viewcustomer', { 
                        customers: mutipleMongooseToObject(customers),
                        orders: mutipleMongooseToObject(orders),
                        layout: 'main' 
                    });
                })  
            }) 
        }else{
            res.redirect('/')
        }
    }
    logout(req, res){    
        res.clearCookie('customer')
        res.redirect('/')
    }
}



module.exports = new AccountController;