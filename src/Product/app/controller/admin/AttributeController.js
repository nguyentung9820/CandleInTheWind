const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const AttributeSet = require("../../models/AttributeSet")
const Attribute = require("../../models/Attribute")

class AttributeController {

    //Attribute Set
    attributeSet(req, res){
        AttributeSet.find({})
        .then(attributesets => {
            res.render('templates/admin/attributeset', { 
                attributesets: mutipleMongooseToObject(attributesets),
                layout: 'admin' 
            });
        })
    }
    saveAttributeSet(req, res){
        var body = req.body;
        var file = {attributeset_image: req.file.filename}
        var data = Object.assign(body, file);

        try{
            var attributeset = new AttributeSet(data);
            attributeset.save();
            res.redirect('/admin/attributeset')       
        } catch (error) {
            res.send('fail')
        }        
    }
    updateAttributeSet(req,res){
        var body = req.body;
        if(req.file != null){
            var file = {attributeset_image: req.file.filename}
        }else{
            var file = {attributeset_image: req.body.last_image}
        }
        var data = Object.assign(body, file);
        if(req.params.id != null){
            AttributeSet.updateOne({_id: req.params.id}, data)
            .then(() => res.redirect('/admin/attributeset'))
        }
    }
    addAttributeSet(req, res){
        res.render('templates/admin/addattributeset', { 
            layout: 'admin' 
        });
    
    }
    deleteAttributeSet(req, res, next){
        var param = req.params.id;
        AttributeSet.deleteOne({_id: param})
        .then(() => res.redirect('/admin/attributeset'))
        .catch(next);
    }

    editAttributeSet(req, res, next){
        var param = req.params.id;
        AttributeSet.find({_id: param})
        .then(attributeSets => {
            res.render('templates/admin/editattributeset', { 
                attributeSets: mutipleMongooseToObject(attributeSets),
                layout: 'admin' 
            });
        })
    }



    // Attribute
    attribute(req, res){
        Attribute.find({attributeset: req.params.id})
        .then(attributes => {
            res.render('templates/admin/attribute', { 
                attributes: mutipleMongooseToObject(attributes),
                attributeset: req.params.id,
                layout: 'admin' 
            });
        })
    }

    addAttribute(req, res){
        res.render('templates/admin/addattribute', { 
            attributeset: req.params.id,
            layout: 'admin' 
        });
    
    }
    saveAttribute(req, res){
        var body = req.body;
        var option = {options: [
            body.option1,
            body.option2,
            body.option3,
            body.option4,

        ]}
        var data = Object.assign(body, option);
        try{
            var attribute = new Attribute(data);
            attribute.save();
            res.redirect('/admin/attributeset')       
        } catch (error) {
            res.send('fail')
        }        
    }
    deleteAttribute(req, res, next){
        var param = req.params.id;
        Attribute.deleteOne({_id: param})
        .then(() => res.redirect('/admin/attributeset'))
        .catch(next);
    }

}



module.exports = new AttributeController;