// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Customer = require("../../models/Blog")
class AdminBlogController {

    // [GET] /
    homepage(req,res)
    {
        res.render('templates/admin/adminblog');
    }
}



module.exports = new AdminBlogController;