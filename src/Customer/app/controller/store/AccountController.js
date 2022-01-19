const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Customer = require("../../models/Customer")
const Order = require("../../../../Checkout/app/models/Order")
const Blog = require("../../../../Blog/app/models/Blog")
const Rank = require("../../../../Promotion/app/models/Rank")

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
                customers.forEach(element=>{
                    Blog.find({idAuthor: element._id})
                    .then(
                        blogs => {
                            Order.find({customer_id: auth})
                            .then(orders =>{
                                Rank.find({})
                                .then(ranks =>{
                                    var arr = [];
                                    ranks.forEach(data2 => {
                                        if(element.point > data2.rank_point){
                                            arr.push({name: data2.rank_name, img: data2.rank_image, point: data2.rank_point})
                                        }
                                    })
                                    var maxObj = arr.reduce((max, obj) => (max.point > obj.point) ? max : obj);
                                    res.render('templates/store/viewcustomer', { 
                                        customers: mutipleMongooseToObject(customers),
                                        orders: mutipleMongooseToObject(orders.slice(Math.max(orders.length - 5, 0))),
                                        blogs: mutipleMongooseToObject(blogs),
                                        rank: maxObj,
                                        layout: 'main' 
                                    });
                                })
                            })  
                        }
                    )
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

    editProfile(req, res) {
        var param = req.params.id
        Customer.find({_id: param})
            .then(customers => {
                res.render('templates/store/editprofile',{
                    customer: mutipleMongooseToObject(customers),
                    layout: 'main'
                })

            }) 

    }
    updateProfile(req,res){
        var body = req.body;
        if(req.file != null){
            var file = {avatar: req.file.filename}
        }else{
            var file = {avatar: req.body.last_image}
        }
        console.log(file)
        var data = Object.assign(body, file);
        if(req.params.id != null){
            Customer.updateOne({_id: req.params.id}, data)
            .then(() => res.redirect('/profile'))
        }
    }
}



module.exports = new AccountController;