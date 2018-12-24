var mongoose = require('mongoose');

//----Kết nối Mongodb bằng mongoose
var mongodb_url = 'mongodb://localhost:27017/API_MongoDB';
mongoose.Promise = global.Promise;
var MongoOptions = {
    poolSize: 10,
    reconnectTries: 3600,
    reconnectInterval: 1000,
    autoReconnect: true,
    useNewUrlParser: true
};
mongoose.set('useCreateIndex', true);
mongoose.connect(mongodb_url, MongoOptions);
module.exports = mongoose.connection;
