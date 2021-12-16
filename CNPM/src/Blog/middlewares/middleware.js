class middlewares {
  checkAdmin(req, res, next) {
    const auth = req.cookies["oreo"];
    console.log(auth);
    if (auth == "admin") {
      next();
    } else {
      res.redirect("/customer/admin");
      return;
    }
  }
}

module.exports = new middlewares();
