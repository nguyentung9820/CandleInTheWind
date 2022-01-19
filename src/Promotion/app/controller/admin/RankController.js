const { mutipleMongooseToObject } = require('../../../util/mongoose')
const { json } = require("express");
const Rank = require("../../models/Rank")
const { mongooseToObject } = require('../../../util/mongoose')

class RankController {

    rank(req, res){
        
        Rank.find({})
        .then(ranks => {
            res.render('templates/admin/rank',{
                ranks: mutipleMongooseToObject(ranks.sort((a, b) => a.level - b.level)),
                layout: 'admin' 
            })
        })
    }

    addRank(req, res){
        res.render('templates/admin/addrank',{
            layout: 'admin' 
        }) 
    }
    saveRank(req,res){
        var body = req.body;
        var file = {rank_image: req.file.filename}
        var data = Object.assign(body, file);
            try{
                var rank = new Rank(data);
                rank.save();
                res.redirect('/rule/rank/view')       
            } catch (error) {
                res.send('fail')
            }  
    }
    edit(req, res){
        Rank.find({_id: req.params.id})
        .then(ranks => {
            res.render('templates/admin/editrank', { 
                ranks: mutipleMongooseToObject(ranks),
                layout: 'admin' 
            });
        })    
    }
    update(req,res){
        var body = req.body;
        if(req.file != null){
            var file = {rank_image: req.file.filename}
        }else{
            var file = {rank_image: req.body.last_image}
        }
        var data = Object.assign(body, file);
        if(req.params.id != null){
            Rank.updateOne({_id: req.params.id}, data)
            .then(() => res.redirect('/rule/rank/view'))
        }
    }
    delete(req,res, next){
        var param = req.params.id;
        Rank.deleteOne({_id: param})
        .then(() => res.redirect('/rule/rank/view'))
        .catch(next);
    }
}

module.exports = new RankController;