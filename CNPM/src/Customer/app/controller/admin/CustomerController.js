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
    editCustomer(req, res){
        Customer.find({_id: req.params.id})
        .then(customers => {
            res.render('templates/admin/editcustomer', { 
                customers: mutipleMongooseToObject(customers),
                layout: 'customer' 
            });
        })    
    }
    updateCustomer(req,res){
        var body = req.body;
        if(req.file != null){
            var file = {avatar: req.file.filename}
        }else{
            var file = {avatar: req.body.last_image}
        }
        var data = Object.assign(body, file);
        if(req.params.id != null){
            Customer.updateOne({_id: req.params.id}, data)
            .then(() => res.redirect('/management/customer'))
        }
    }
}



module.exports = new CustomerController;