module.exports = {
    multipleMongoObj: function(mongoose)
    {
        return  mongoose = mongoose.map(mongoose =>mongoose.toObject());
    },
    mongoToObj: function(mongoose)
    {
        return mongoose? mongoose.toObject() : mongoose;
    }
};