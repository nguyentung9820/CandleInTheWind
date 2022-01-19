const customerRouter = require("./forum/forum");

function route(app) {
  app.use("/forum", customerRouter);
}

module.exports = route;
