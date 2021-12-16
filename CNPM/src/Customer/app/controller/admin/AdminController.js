// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Customer = require("../../models/Customer")
class AdminController {

    // [GET] /
    admin(req, res){
        res.render('templates/admin/admin',{layout: 'admin'})
    }
    // Post
    async login(req, res){
        var user = req.body.username;
        var pass = req.body.password;
        console.log(pass)
        if(user == 'admin' && pass == 1){
            await res.cookie('oreo', 'admin')
            res.redirect('/admin')
            return;
        }else{
            res.redirect('/customer/admin')    
            return;

        }       
    }
    logout(req, res){    
        res.clearCookie('oreo')
        res.redirect('/')
    }
}



module.exports = new AdminController;