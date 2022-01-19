const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Customer = require("../../models/Customer")
const PendingRequest = require("../../models/PendingRequest")
const Rank = require("../../../../Promotion/app/models/Rank")

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
            customers.forEach(data =>{
                Rank.find({})
                .then(ranks =>{
                    var arr = [];
                    ranks.forEach(data2 => {
                        if(data.point > data2.rank_point){
                            arr.push({name: data2.rank_name, img: data2.rank_image, point: data2.rank_point})
                        }
                    })
                    var maxObj = arr.reduce((max, obj) => (max.point > obj.point) ? max : obj);
                    res.render('templates/admin/viewcustomer', { 
                        customers: mutipleMongooseToObject(customers),
                        rank: maxObj,
                        layout: 'customer' 
                    });
                })
            })
            
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
    deleteCustomer(req,res, next){
        var param = req.params.id;
        Customer.deleteOne({_id: param})
        .then(() => res.redirect('/management/customer'))
        .catch(next);
    }

    pendingRequest(req,res,next){
        PendingRequest.find({})
        .then(pendings => {
            res.render('templates/admin/pending', { 
                pendings: mutipleMongooseToObject(pendings),
                layout: 'customer' 
            })
        })
    }
    approveRequest(req, res, next){
        var param = req.params.id
        PendingRequest.findOne({_id: param})
        .then(pendings => {
            Customer.findOne({_id: pendings.userid})
            .then(customers => {
                customers.customer_group = "Favourite"
                Customer.updateOne({_id: customers._id}, customers)
                .then(() => {
                    PendingRequest.deleteOne({_id: param})
                    .then(() => res.redirect('/management/customer/pending'))
                    .catch(next);
                })
            })
            
        })
        
    }
    cancelRequest(req, res, next){
        var param = req.params.id
        PendingRequest.findOne({_id: param})
        .then(pendings => {
            Customer.findOne({_id: pendings.userid})
            .then(customers => {
                customers.customer_group = "Normal"
                Customer.updateOne({_id: customers._id}, customers)
                .then(() => {
                    PendingRequest.deleteOne({_id: param})
                    .then(() => res.redirect('/management/customer/pending'))
                    .catch(next);
                })
            })
            
        })
        
    }
}



module.exports = new CustomerController;