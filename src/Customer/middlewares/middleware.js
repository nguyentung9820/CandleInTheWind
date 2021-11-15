class middlewares{
    checkAdmin(req, res ,next){
        const auth = req.cookies['oreo'];
        console.log(auth)
        if(auth == 'admin'){
            next();       
        }else {
            res.redirect('/customer/admin')
            return;
        }
    }
    checkLogin(req,res,next){
        const auth = req.cookies['oreo'];
        if(auth == 'admin'){
            res.redirect('/admin/product')
            return;
        }else {
            next();
        }
    }
}


module.exports = new middlewares;