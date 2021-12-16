const mongoose = require("mongoose");
module.exports = {
  multipleMongoObj: function (paramObj) {
    return (paramObj = paramObj.map((paramObj) => paramObj.toObject()));
  },
  mongoToObj: function (paramObj) {
    return paramObj ? paramObj.toObject() : paramObj;
  },
};
