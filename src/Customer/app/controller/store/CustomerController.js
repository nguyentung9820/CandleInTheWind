const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const PendingRequest = require("../../models/PendingRequest")
const Customer = require("../../models/Customer")

class CustomerController {

    // [GET] /
    customer(req, res){
        res.render('templates/store/customer')
    }
    upgrade(req, res){
        var user_id = req.params.customer;
        Customer.findOne({_id: user_id})
        .then(customers => {
            try{
                var data = {
                    userid: customers._id,
                    username: customers.username,
                    customer_group: 'Normal (pending)'
                }
                
                var pending = new PendingRequest(data);
                pending.save();

                customers.customer_group = 'Normal (pending)'
                Customer.updateOne({_id: req.params.customer}, customers)
                .then(() => res.redirect('/profile'))
                
            } catch (e){
                res.send('faill')
            }
        
        })
    }
}



module.exports = new CustomerController;