var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    passWord: String,
    fullName: String,
    email: String,
    phone: String,
    birthDay: String,
    homeTown: String,
    quyen: Boolean
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('Users', userSchema);

// make this available to our users in our Node applications
module.exports = User;

User.InsertUser = function (data, callback) {
    if (!data) return callback(-1);
    if (!data.userName || data.userName.length < 6) return callback(-2);
    if (!data.passWord || data.passWord.length < 6) return callback(-3);
    if (!data.fullName || data.fullName.length < 1) return callback(-4);
    if (!data.email || data.email.length < 5) return callback(-5);
    if (!data.phone || data.phone.length < 1) return callback(-6);
    if (!data.birthDay || data.birthDay.length < 1) return callback(-7);
    if (!data.homeTown || data.homeTown.length < 1) return callback(-8);

    User.findOne({ userName: data.userName }, function (err, _doc) {
        if (err) return callback(-101);

        if (_doc) {
            return callback(-9);
        }
        var new_user = new User;
        new_user.userName = data.userName;
        new_user.passWord = data.passWord;
        new_user.fullName = data.fullName;
        new_user.email = data.email;
        new_user.phone = data.phone;
        new_user.birthDay = data.birthDay;
        new_user.homeTown = data.homeTown;
        new_user.quyen = 0;
        new_user.save(function (err) {
            if (err) return callback(-101);
            else {
                return callback(1);
            }
        });
    });
}

User.SelectAll = function (callback) {
    User.find({quyen: false},function (err, _doc) {
        if (err) return callback(-101);
        if (_doc) {
            return callback(_doc);
        }
    });
}

User.SelectOne = function (data,callback) {
    User.find(data,function (err, _doc) {
        if (err) return callback(-101);
        if (_doc) {
            return callback(_doc);
        }
    });
}

User.DeleteOne = function (data,callback) {
  if(data == null) return callback(-1);
    User.deleteOne(data).then(result => {
         return callback(result.n);
      });
}

User.CheckLogin = function (data,callback) {
  if (!data) return callback(-1);
  if (!data.userName || data.userName.length < 6) return callback(-2);
  if (!data.passWord || data.passWord.length < 6) return callback(-3);
    User.find({ userName: data.userName , passWord: data.passWord, quyen: data.quyen}, function (err, _doc) {
        if (err) return callback(-101);
        if (_doc) {
            return callback(_doc);
        }
    });
}
