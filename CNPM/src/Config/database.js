const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/candle', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          });
          console.log("Database connected!!");
    } catch (error) {
        console.log("Fail to connect!!");
    }
}


module.exports = { connect };