const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Customer = require("../../models/Customer")
class CustomerController {

    // [GET] /
    customer(req, res){
        Customer.find({})
        .then(customers => {
            res.render('templates/admin/customer', { 
                customers: mutipleMongooseToObject(customers),
                layout: 'customer' 
            });
        })    
    }
    addCustomer(req, res){
        Customer.find({})
        .then(customers => {
            res.render('templates/admin/addcustomer', { 
                customers: mutipleMongooseToObject(customers),
                layout: 'customer' 
            });
        })   
    }
    saveCustomer(req, res){
        var body = req.body;
        var file = {avatar: req.file.filename}
        var data = Object.assign(body, file);
            try{
                var customer = new Customer(data);
                customer.save();
                res.redirect('/management/customer')       
            } catch (error) {
                res.send('fail')
            }              
    }
    viewCustomer(req, res){
        Customer.find({_id: req.params.id})
        .then(customers => {
            res.render('templates/admin/viewcustomer', { 
                customers: mutipleMongooseToObject(customers),
                layout: 'customer' 
            });
        })    
    }
}



module.exports = new CustomerController;