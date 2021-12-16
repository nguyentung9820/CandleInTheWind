const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Customer = require("../../models/Customer")
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
    
}



module.exports = new AccountController;