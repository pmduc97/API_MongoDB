var users = require("./controller/UsersController");

var appRoutes = function(app){
  app.get("/", function (req, res) {
    res.status(200).send("Welcome to WebService By DucPham");
    console.log('Welcome to WebService By DucPham');
  });
  app.get("/SelectAll", function (req, res) {
    users.SelectAll(function(ret){
      console.log('SelectAll => ' + Object.keys(ret).length);
      res.status(200).send(ret);
    });
  });
  app.get("/SelectOne/:userName", function (req, res) {
    var data = {quyen: false,userName: req.params.userName};
    users.SelectOne(data,function(ret){
      console.log('Select => ' + Object.keys(ret).length);
        res.status(200).send(ret);
    });
  });

  app.post("/InsertUser", function (req, res) {
        var data = {
          userName: req.body.userName != null ? req.body.userName : '',
          passWord: req.body.passWord,
          fullName: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          birthDay: req.body.birthDay,
          homeTown: req.body.homeTown
        }
		      users.InsertUser(data, function(ret){
			         console.log('InsertUser => ' + ret);
               res.status(200).send('' + ret);
		      });
    });


    app.post("/DeleteOne", function (req, res) {
          var data = req.body.userName!=null?{quyen: false,userName: req.body.userName}:null;
  		      users.DeleteOne(data, function(ret){
  			         console.log('DeleteOne => ' + ret);
                 res.status(200).send('' + ret);
  		      });
      });

      app.post("/CheckLogin", function (req, res) {
            var data = {
              userName: req.body.userName != null ? req.body.userName : '',
              passWord: req.body.passWord,
              quyen : 1
            }
    		      users.CheckLogin(data, function(ret){
    			         console.log('CheckLogin => ' + Object.keys(ret).length); //Object.keys(myObject).length;
                   var code = Object.keys(ret).length==1?200:204;
                   res.status(code).send(ret);
    		      });
        });
}

module.exports = appRoutes;
